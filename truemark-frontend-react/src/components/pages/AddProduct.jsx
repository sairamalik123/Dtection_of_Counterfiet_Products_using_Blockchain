import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import bgImg from "../../img/bg.png";
import { TextField, Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import axios from "axios";
import abi from "../../utils/Truemark.json";
import QRCode, { QRCodeCanvas } from "qrcode.react";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
  const [qrData, setQrData] = useState("");
  const [manuDate, setManuDate] = useState("");
  const [manuLatitude, setManuLatitude] = useState("");
  const [manuLongitude, setManuLongitude] = useState("");
  const [manuName, setManuName] = useState("");
  const [loading, setLoading] = useState("");
  const [manuLocation, setManuLocation] = useState("");
  const [isUnique, setIsUnique] = useState(true);
  const [signature, setSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");
    const [oneTimeKey, setOneTimeKey] = useState("");

  const CONTRACT_ADDRESS = "0xff640E131188aAf6E898a53E7969054327c7A5aA";
  const contractABI = abi.abi;
  const { auth } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef();

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
          const response = await axios.get(
            `https://api.ipapi.com/${manuLatitude},${manuLongitude}?access_key=2c0f29da-08b1-497a-9f94-15987b07b114`
          );
          const location =
            response.data.city +
            ", " +
            response.data.region_name +
            ", " +
            response.data.country_name;
          setManuLocation(location);
          console.log("Location: ", location);
        } catch (error) {
          console.error("Error fetching location: ", error);
        }
      }
    };

    getLocationDetails();
  }, [manuLatitude, manuLongitude]);

  // Generate QR Code with digital signature for enhanced security
  const generateQRCode = async (serialNumber) => {
    try {
      console.log("Generating QR code for serial number:", serialNumber);

      // Try to get the signature from database
      const response = await axios.get(
        `http://localhost:5000/product/serialNumber/${serialNumber}`
      );
      const { signature } = response.data;

      if (signature) {
        // Create signed QR code with JSON format
        const signedQRData = JSON.stringify({
          contract: CONTRACT_ADDRESS,
          serialNumber: serialNumber.toString(),
          signature: signature,
        });

        console.log("Generated signed QR data:", signedQRData);
        setQrData(signedQRData);
      } else {
        // Fallback to simple CSV format
        const csvData = `${CONTRACT_ADDRESS},${serialNumber}`;
        console.log("Generated CSV QR data:", csvData);
        setQrData(csvData);
      }
    } catch (error) {
      console.error("Error creating signed QR:", error);
      // Fallback to simple CSV format
      const csvData = `${CONTRACT_ADDRESS},${serialNumber}`;
      console.log("Fallback to CSV QR data:", csvData);
      setQrData(csvData);
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById("QRCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
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

    axios
      .post("http://localhost:5000/upload/product", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.success === 1) {
          console.log("Image uploaded");
        }
      });
  };

  const registerProduct = async (e, dbSerialNumber) => {
    e.preventDefault();
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const productContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        signer
      );

      const userAddress = await signer.getAddress();

      // Check user's role from the smart contract
      const userRole = await productContract.getRole(userAddress);
      console.log("User Role:", userRole);

      if (userRole !== "Manufacturer") {
        alert(
          "You are not authorized to register products. Only a Manufacturer can do this."
        );
        return;
      }

      const hash = ethers.utils.solidityKeccak256(
        ["string", "string", "string"],
        [dbSerialNumber.toString(), name, brand]
      );

      // Sign the hash with the private key from MetaMask
      const blockchainSignature = await signer.signMessage(
        ethers.utils.arrayify(hash)
      );

      // Register on blockchain with the database serial number
      const registerTxn = await productContract.registerProduct(
        dbSerialNumber.toString(), // 1. serialNumber
        name, // 2. name
        brand, // 3. brand
        description.replace(/,/g, ";"), // 4. description
        image.file.name, // 5. image
        manuName, // 6. actor (initial history)
        manuLocation, // 7. location
        manuDate.toString(), // 8. timestamp
        false, // 9. isSold (initially false)
        blockchainSignature //10. signature
      );

      setLoading("Mining (Register Product)...");
      await registerTxn.wait();
      setLoading("Mined (Register Product)...");

      // Generate QR code after successful blockchain registration
      await generateQRCode(dbSerialNumber);

      await productContract.getProduct(dbSerialNumber);
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

  // Add product to database and get generated serial number with signature
//   const addProductDB = async (e) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/addproduct",
//         {
//           name: name,
//           brand: brand,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       const { serialnumber, signature, publicKey } = response.data;

//       setSignature(signature);
//       setPublicKey(publicKey);

//       console.log("Product added to DB:", {
//         serialnumber,
//         signature: signature ? "Present" : "Missing",
//         publicKey: publicKey ? "Present" : "Missing",
//       });

//       // Return the generated serial number from backend
//       return serialnumber;
//     } catch (err) {
//       console.error("Error adding product to DB:", err);
//       throw err;
//     }
//   };

const generateOneTimeKey = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const addProductDB = async (e) => {
  try {
    const key = generateOneTimeKey();
    setOneTimeKey(key); // ✅ store in UI

    const response = await axios.post(
      "http://localhost:5000/addproduct",
      {
        name,
        brand,
        one_time_key: key,
        key_used: false,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { serialnumber, signature, publicKey } = response.data;
    setSignature(signature);
    setPublicKey(publicKey);

    return serialnumber;
  } catch (err) {
    console.error("DB add error:", err);
    throw err;
  }
};

  const checkUnique = async () => {
    try {
      const res = await axios.get("http://localhost:5000/product/serialNumber");
      const existingSerialNumbers = res.data.map(
        (product) => product.serialnumber
      );
      const isDuplicate = existingSerialNumbers.includes(serialNumber);
      setIsUnique(!isDuplicate);
      return !isDuplicate;
    } catch (error) {
      console.error("Error checking uniqueness:", error);
      return true; // If can't check, assume it's unique
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading("Adding product to database...");

      // Upload image first
      if (image.file) {
        await uploadImage(image);
      }

      // Add product to database and get the generated serial number with signature
      const dbSerialNumber = await addProductDB(e);

      // Update the serialNumber state with the generated one
      setSerialNumber(dbSerialNumber);

      setLoading(
        "Please pay the transaction fee to update the product details..."
      );

      // Register on blockchain with the database serial number
      await registerProduct(e, dbSerialNumber);

      setLoading("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setLoading("Error: Failed to add product.");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImg})`,
        minHeight: "80vh",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: "cover",
        zIndex: -2,
        overflowY: "scroll",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "400px",
          margin: "auto",
          marginTop: "3%",
          marginBottom: "10%",
          padding: "3%",
          backgroundColor: "#e3eefc",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            marginBottom: "3%",
            fontFamily: "Gambetta",
            fontWeight: "bold",
            fontSize: "2.5rem",
          }}
        >
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          {serialNumber && (
            <TextField
              fullWidth
              label="Generated Serial Number"
              margin="normal"
              variant="outlined"
              value={serialNumber}
              InputProps={{ readOnly: true }}
            />
          )}
          {oneTimeKey && (
            <TextField
              fullWidth
              label="One-Time Key"
              margin="normal"
              variant="outlined"
              value={oneTimeKey}
              InputProps={{ readOnly: true }}
            />
          )}

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Brand"
            margin="normal"
            variant="outlined"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            variant="outlined"
            multiline
            minRows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ marginTop: "3%", marginBottom: "3%" }}
          >
            Upload Image
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onClick={() => (fileInputRef.current.value = null)}
              onChange={handleImage}
            />
          </Button>

          {image.filepreview && (
            <img
              src={image.filepreview}
              alt="preview"
              style={{ width: "100%", height: "100%", marginTop: "1rem" }}
            />
          )}

          {qrData && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "3%",
                }}
              >
                <QRCodeCanvas value={qrData} id="QRCode" />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "3%",
                }}
              >
                <Button variant="outlined" fullWidth onClick={downloadQR}>
                  Download QR Code
                </Button>
              </div>
            </>
          )}

          {loading && (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginTop: "3%" }}
            >
              {loading}
            </Typography>
          )}

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              marginTop: "3%",
              backgroundColor: "#98b5d5",
              "&:hover": { backgroundColor: "#618dbd" },
            }}
            disabled={!name || !brand || loading}
          >
            Add Product
          </Button>

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button onClick={handleBack} sx={{ marginTop: "5%" }}>
              Back
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProduct;
