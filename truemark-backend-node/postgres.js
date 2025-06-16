const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg')
const path = require('path');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 5000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "sairamalik1019",
    database: "postgres"
})

const { generateKeyPairSync, createSign, createVerify, createCipheriv, createDecipheriv, randomBytes } = require('crypto');

// Read your encryption key from .env (make sure to use dotenv at the top)
require('dotenv').config();

// ✅ FIX: Generate a proper 32-byte key if not exists
let ENCRYPTION_KEY = process.env.PRIVATE_KEY_ENCRYPTION_KEY; 

// If key doesn't exist or has wrong length, generate a new one
if (!ENCRYPTION_KEY || Buffer.from(ENCRYPTION_KEY, 'hex').length !== 32) {
    console.warn('Generating new encryption key. Add this to your .env file:');
    ENCRYPTION_KEY = randomBytes(32).toString('hex');
    console.log(`PRIVATE_KEY_ENCRYPTION_KEY=${ENCRYPTION_KEY}`);
}

const IV_LENGTH = 16;

function encrypt(text) {
    let iv = randomBytes(IV_LENGTH);
    let cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = textParts.join(':');
    let decipher = createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

client.connect()

// auth
function createAccount(username , password, role){
    const res =  client.query('INSERT INTO auth (username, password, role) VALUES ($1, $2, $3)', [username, password, role], (err, res)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('Data insert successful');
        }
    })
}

function changePassword(username, password){
    const res =  client.query('UPDATE auth SET password = $1 WHERE username = $2', [password, username], (err, res)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('Data update successful');
        }
    })
}

// profile
function createProfile(username, name , description, website, location, image, role){
    client.query('INSERT INTO profile (username, name, description, website, location, image, role) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [username, name, description, website, location, image, role], (err, res)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log('Data insert successful');
            }
        })
}

// product
const storageProduct = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads/product'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const storageProfile = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads/profile'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

async function addProduct(name, brand) {
    try{
        // 1. Generate RSA keypair
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
        });
        const encryptedPrivateKey = encrypt(privateKey);

        // 2. Insert product (get serialnumber via RETURNING)
        const insertRes = await client.query(
            'INSERT INTO product (name, brand, public_key, encrypted_private_key) VALUES ($1, $2, $3, $4) RETURNING serialnumber',
            [name, brand, publicKey, encryptedPrivateKey]
        );
        const serialNumber = insertRes.rows[0].serialnumber;

        // 3. Sign the product data (now you have serialNumber)
        const sign = createSign('SHA256');
        sign.update(serialNumber + name + brand);
        sign.end();
        const signature = sign.sign(privateKey, 'base64');

        // 4. Update the row with the signature
        await client.query(
            'UPDATE product SET signature=$1 WHERE serialnumber=$2',
            [signature, serialNumber]
        );

        console.log('Product inserted and signed successfully!');
        return serialNumber;
    }
    catch (error) {
        console.error('Error inserting product:', error);
        throw error;
    }
}

app.post('/product/verify', async (req, res) => {
    const { serialNumber, signature } = req.body;
    const result = await client.query(
        'SELECT serialNumber, name, brand, public_key FROM product WHERE serialNumber=$1',
        [serialNumber]
    );
    if (result.rows.length === 0) {
        return res.status(404).send('Product not found');
    }
    const product = result.rows[0];

    const { createVerify } = require('crypto');
    const verify = createVerify('SHA256');
    verify.update(product.serialnumber + product.name + product.brand);
    verify.end();

    const isValid = verify.verify(product.public_key, signature, 'base64');

    res.json({
        serialNumber,
        name: product.name,
        brand: product.brand,
        isValid
    });
});

async function getDecryptedPrivateKey(serialNumber) {
    const res = await client.query('SELECT encrypted_private_key FROM product WHERE serialnumber = $1', [serialNumber]);
    if (!res.rows.length) return null;
    return decrypt(res.rows[0].encrypted_private_key);
}

// auth
app.get('/authAll', async (req, res)=>{
    const data =  await client.query('Select * from auth');
    res.header('Access-Control-Allow-Credentials', true);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.post('/auth/:username/:password', async (req, res)=>{
    const {username, password} = req.params;
    const data =  await client.query(`SELECT * FROM auth WHERE username = '${username}' AND password = '${password}'`);
    res.send(data.rows);
    console.log("Data sent successfully");
});

// ✅ ADD: Get all serial numbers for uniqueness check
app.get('/product/serialNumber', async (req, res) => {
    try {
        const data = await client.query('SELECT serialnumber FROM product');
        res.send(data.rows);
        console.log("Serial numbers sent successfully");
    } catch (err) {
        console.error('Error fetching serial numbers:', err);
        res.status(500).json({ error: "Failed to fetch serial numbers." });
    }
});

app.get('/product/serialNumber/:serialNumber', async (req, res) => {
    const { serialNumber } = req.params;
    const data = await client.query(
        `SELECT serialnumber, name, brand, signature FROM product WHERE serialnumber = $1`,
        [serialNumber]
    );
    if (!data.rows.length) {
        return res.status(404).send('Product not found');
    }
    res.send(data.rows[0]); // Send the single product, not an array
});

app.post('/addaccount', (req, res)=>{
    const {username, password, role} = req.body;
    createAccount(username, password, role);
    res.send('Data inserted');
});

app.post('/changepsw', (req, res)=>{
    const {username, password} = req.body;
    changePassword(username, password);
    res.send('Data updated');
});

// profile 
app.get('/profileAll', async (req, res)=>{
    const data =  await client.query('Select * from profile');
    res.header('Access-Control-Allow-Credentials', true);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.get('/profile/:username', async (req, res)=>{
    const {username} = req.params;
    const data =  await client.query(`SELECT * FROM profile WHERE username = '${username}'`);
    res.send(data.rows);
    console.log("Data sent successfully");
});

app.post('/addprofile', (req, res)=>{
    const {username, name, description, website, location, image, role} = req.body;
    createProfile(username, name, description, website, location, image, role);
    res.send('Data inserted');
});

// image uploads
app.post('/upload/profile', (req, res)=>{
    let upload = multer({ storage: storageProfile}).single('image');
    
    upload(req, res, (err)=>{
        if(!req.file){
            return res.send('Please select an image to upload')
        }else if (err instanceof multer.MulterError){
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }
        res.json({ success: 1, message: 'Image uploaded successfully' });
    })
})

app.post('/upload/product', (req, res)=>{
    let upload = multer({ storage: storageProduct}).single('image');
    
    upload(req, res, (err)=>{
        if(!req.file){
            return res.send('Please select an image to upload')
        }else if (err instanceof multer.MulterError){
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }
        res.json({ success: 1, message: 'Image uploaded successfully' });
    })
})

app.get('/file/profile/:fileName', function (req, res) {
    const {fileName} = req.params;
    const filePath = path.join(__dirname, 'public/uploads/profile', fileName);
    res.sendFile(filePath);
});

app.get('/file/product/:fileName', function (req, res) {
    const {fileName} = req.params;
    const filePath = path.join(__dirname, 'public/uploads/product', fileName);
    res.sendFile(filePath);
});

// ✅ MAIN FIX: addproduct endpoint
app.post('/addproduct', async (req, res) => {
    const { name, brand } = req.body;
    try {
        const serialNumber = await addProduct(name, brand);
        res.json({
            serialnumber: serialNumber,
            message: "Product inserted and signed successfully!"
        });
    } catch (err) {
        console.error('Error inserting product:', err);
        res.status(500).json({ error: "Failed to add product." });
    }
});

app.listen(port, ()=>{
    console.log('Server is running on port 5000');
});