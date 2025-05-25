import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import bgImg from '../../img/bg.png';
import { TextField, Button } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { ethers } from "ethers";
import axios from 'axios';
import abi from '../../utils/Truemark.json';
import QRCode, { QRCodeCanvas } from 'qrcode.react';
import dayjs from 'dayjs';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
    try {
        const ethereum = getEthereumObject();
        if (!ethereum) {
            console.error("Make sure you have Metamask!");
            alert("Make sure you have Metamask!");
            return null;
        }
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
            return accounts[0];
        } else {
            console.error("No authorized account found");
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

const AddProduct = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState({ file: [], filepreview: null });
    const [qrData, setQrData] = useState('');
    const [manuDate, setManuDate] = useState('');
    const [manuLatitude, setManuLatitude] = useState("");
    const [manuLongitude, setManuLongitude] = useState("");
    const [manuName, setManuName] = useState("");
    const [loading, setLoading] = useState("");
    const [manuLocation, setManuLocation] = useState("");
    const [isUnique, setIsUnique] = useState(true);

    const CONTRACT_ADDRESS = '0xF89Dd0FF002179340542D03FfFd7CcBaa4972Ae6';
    const contractABI = abi.abi;
    const { auth } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(); // ⬅️ Added useRef for file input

    useEffect(() => {
        findMetaMaskAccount().then((account) => {
            if (account !== null) {
                setCurrentAccount(account);
            }
        });
        getUsername();
        getCurrentTimeLocation();
    }, []);

    useEffect(() => {
        const getLocationDetails = async () => {
            if (manuLatitude && manuLongitude) {
                try {
                    const response = await axios.get(`https://api.ipapi.com/${manuLatitude},${manuLongitude}?access_key=2c0f29da-08b1-497a-9f94-15987b07b114`);
                    const location = response.data.city + ', ' + response.data.region_name + ', ' + response.data.country_name;
                    setManuLocation(location);
                    console.log("Location: ", location);
                } catch (error) {
                    console.error("Error fetching location: ", error);
                }
            }
        };

        getLocationDetails();
    }, [manuLatitude, manuLongitude]);

    const generateQRCode = async (serialNumber) => {
        const data = CONTRACT_ADDRESS + ',' + serialNumber;
        setQrData(data);
    };

    const downloadQR = () => {
        const canvas = document.getElementById("QRCode");
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${serialNumber}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        setImage({
            file: file,
            filepreview: URL.createObjectURL(file),
        });
    };

    const getUsername = async () => {
        const res = await axios.get(`http://localhost:5000/profile/${auth.user}`);
        setManuName(res?.data[0].name);
    };

    const uploadImage = async (image) => {
        const data = new FormData();
        data.append("image", image.file);

        axios.post("http://localhost:5000/upload/product", data, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
            if (res.data.success === 1) {
                console.log("Image uploaded");
            }
        });
    };

    // const registerProduct = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const { ethereum } = window;
    //         if (ethereum) {
    //             const provider = new ethers.providers.Web3Provider(ethereum);
    //             const signer = provider.getSigner();
    //             const productContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

    //             const registerTxn = await productContract.registerProduct(
    //                 name,
    //                 brand,
    //                 serialNumber,
    //                 description.replace(/,/g, ';'),
    //                 image.file.name,
    //                 manuName,
    //                 manuLocation,
    //                 manuDate.toString()
    //             );
    //             setLoading("Mining (Register Product)...");
    //             await registerTxn.wait();
    //             setLoading("Mined (Register Product)...");
    //             generateQRCode(serialNumber);
    //             await productContract.getProduct(serialNumber);
    //             setLoading("");
    //         } else {
    //             console.log("Ethereum object doesn't exist!");
    //         }
    //     } catch (error) {
    //         setLoading("Error: Failed to register product.");
    //     }
    // };

    const registerProduct = async (e) => {
    e.preventDefault();
    try {
        const { ethereum } = window;
        if (!ethereum) {
            console.log("Ethereum object doesn't exist!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const productContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

        const userAddress = await signer.getAddress();

        // ✅ Check user's role from the smart contract
        const userRole = await productContract.getRole(userAddress);
        console.log("User Role:", userRole);

        if (userRole !== "Manufacturer") {
            alert("You are not authorized to register products. Only a Manufacturer can do this.");
            return;
        }

        // ✅ Continue with registration
        const registerTxn = await productContract.registerProduct(
            name,
            brand,
            serialNumber,
            description.replace(/,/g, ';'),
            image.file.name,
            manuName,
            manuLocation,
            manuDate.toString()
        );

        setLoading("Mining (Register Product)...");
        await registerTxn.wait();
        setLoading("Mined (Register Product)...");
        generateQRCode(serialNumber);
        await productContract.getProduct(serialNumber);
        setLoading("");
    } catch (error) {
        console.error("Register error:", error);
        setLoading("Error: Failed to register product.");
    }
};

    const getCurrentTimeLocation = () => {
        setManuDate(dayjs().unix());
        navigator.geolocation.getCurrentPosition(function (position) {
            setManuLatitude(position.coords.latitude);
            setManuLongitude(position.coords.longitude);
        });
    };

    const addProductDB = async (e) => {
        try {
            const profileData = JSON.stringify({
                "serialNumber": serialNumber,
                "name": name,
                "brand": brand,
            });

            await axios.post('http://localhost:5000/addproduct', profileData, {
                headers: { 'Content-Type': 'application/json' },
            });

        } catch (err) {
            console.log(err);
        }
    };

    const checkUnique = async () => {
        const res = await axios.get("http://localhost:5000/product/serialNumber");
        const existingSerialNumbers = res.data.map((product) => product.serialnumber);
        const isDuplicate = existingSerialNumbers.includes(serialNumber);
        setIsUnique(!isDuplicate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await checkUnique();

        if (isUnique) {
            await uploadImage(image);
            await addProductDB(e);
            setLoading("Please pay the transaction fee to update the product details...");
            await registerProduct(e);
        }

        setIsUnique(true);
    };

    return (
        <Box sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "80vh",
            backgroundRepeat: "no-repeat",
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            zIndex: -2,
            overflowY: "scroll"
        }}>
            <Paper elevation={3} sx={{ width: "400px", margin: "auto", marginTop: "3%", marginBottom: "10%", padding: "3%", backgroundColor: "#e3eefc" }}>
                <Typography
                    variant="h2"
                    sx={{
                        textAlign: "center", marginBottom: "3%",
                        fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
                    }}
                >
                    Add Product</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        error={!isUnique}
                        helperText={!isUnique ? "Serial Number already exists" : ""}
                        label="Serial Number"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setSerialNumber(e.target.value)}
                        value={serialNumber}
                    />

                    <TextField fullWidth label="Name" margin="normal" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField fullWidth label="Brand" margin="normal" variant="outlined" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <TextField fullWidth label="Description" margin="normal" variant="outlined" multiline minRows={2} value={description} onChange={(e) => setDescription(e.target.value)} />

                    <Button variant="outlined" component="label" fullWidth sx={{ marginTop: "3%", marginBottom: "3%" }}>
                        Upload Image
                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onClick={() => fileInputRef.current.value = null} // 💥 Reset input
                            onChange={handleImage}
                        />
                    </Button>

                    {image.filepreview !== null && (
                        <img src={image.filepreview} alt="preview" style={{ width: "100%", height: "100%", marginTop: '1rem' }} />
                    )}

                    {qrData && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
                                <QRCodeCanvas value={qrData} id="QRCode" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
                                <Button variant="outlined" fullWidth sx={{ marginTop: "3%", marginBottom: "3%" }} onClick={downloadQR}>Download</Button>
                            </div>
                        </>
                    )}

                    {loading && <Typography variant="body2" sx={{ textAlign: "center", marginTop: "3%" }}>{loading}</Typography>}

                    <Button variant="contained" type="submit" fullWidth sx={{ marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }} onClick={getCurrentTimeLocation}>Add Product</Button>

                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleBack} sx={{ marginTop: "5%" }}>Back</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default AddProduct;
