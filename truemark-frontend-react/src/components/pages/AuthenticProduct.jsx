// Note: The below code is a React component for verifying product authenticity using blockchain and QR codes.
// It includes functionality for OTP verification, wallet connection, and displaying product details.
// Ensure you have the necessary backend endpoints and blockchain contract deployed for this to work correctly.
import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import bgImg from "../../img/bg.png";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ethers } from "ethers";
import abi from "../../utils/Truemark.json";
import axios from "axios";

const CONTRACT_ADDRESS = "0xff640E131188aAf6E898a53E7969054327c7A5aA";

const getEthereumObject = () => window.ethereum;

const AuthenticProduct = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isAuthentic, setIsAuthentic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpMatched, setOtpMatched] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [productData, setProductData] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const qrData = location.state?.qrData;

  useEffect(() => {
    const checkProductAuthenticity = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);

        if (!qrData) {
          setErrorMessage("No QR data found.");
          setIsAuthentic(false);
          setLoading(false);
          return;
        }

        const qrParsed = JSON.parse(qrData);
        const extractedSerial = qrParsed.serialNumber;
        const signature = qrParsed.signature;

        if (!extractedSerial || !signature) {
          setErrorMessage("Invalid QR data.");
          setIsAuthentic(false);
          setLoading(false);
          return;
        }

        setSerialNumber(extractedSerial);

        // Step 1: Verify Signature
        const sigRes = await axios.post("http://localhost:5000/product/verify", {
          serialNumber: extractedSerial,
          signature,
        });

        if (!sigRes.data.isValid) {
          setErrorMessage("Signature verification failed.");
          setIsAuthentic(false);
          setLoading(false);
          return;
        }

        // Step 2: Get Product from Smart Contract
        const product = await contract.getProduct(extractedSerial);
        if (product[0] !== "") {
          setIsAuthentic(true);
          setProductData({
            name: product[1],
            brand: product[2],
            description: product[3],
            image: product[4],
          });
        } else {
          setErrorMessage("Product not found on blockchain.");
          setIsAuthentic(false);
        }
      } catch (err) {
        console.error("Error verifying product:", err);
        setErrorMessage("Blockchain or backend verification failed.");
        setIsAuthentic(false);
      } finally {
        setLoading(false);
      }
    };

    checkProductAuthenticity();
  }, [qrData]);

  const handleOtpSubmit = async () => {
    if (!otp.trim()) return;

    setVerifyingOtp(true);
    try {
      const res = await axios.post("http://localhost:5000/product/verifyOneTimeKey", {
        serialNumber,
        oneTimeKey: otp.trim(),
      });

      if (res.data.valid) {
        setOtpMatched(true); // ✅ Show "View Product Details" button
      } else {
        if (res.data.reason === "already_used") {
          navigate("/", {
            state: { message: "This key has already been used." },
          });
        } else {
          navigate("/fake-product", {
            state: { qrData, errorMessage: "Invalid or already used key." },
          });
        }
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      navigate("/fake-product", {
        state: { qrData, errorMessage: "OTP verification error." },
      });
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleViewProduct = async () => {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      navigate("/product", { state: { qrData } });
    } catch (error) {
      alert("MetaMask connection required to view product details.");
    }
  };

  const handleBack = () => navigate(-2);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6">Checking product authenticity...</Typography>
      </Box>
    );
  }

  if (!loading && isAuthentic === false) {
    navigate("/fake-product", { state: { qrData, errorMessage } });
    return null;
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImg})`,
        minHeight: "80vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "400px", p: 4, backgroundColor: "#e3eefc" }}
      >
        <Typography variant="h4" textAlign="center">
          ✅ Verified!
        </Typography>
        <Typography variant="h6" textAlign="center" mt={2}>
          Product is Authentic on Blockchain
        </Typography>

        <Box mt={3}>
          <Typography>
            <strong>Serial Number:</strong> {serialNumber}
          </Typography>
          <Typography>
            <strong>Name:</strong> {productData.name}
          </Typography>
          <Typography>
            <strong>Brand:</strong> {productData.brand}
          </Typography>
        </Box>

        {productData.image && (
          <Box mt={2} textAlign="center">
            <img
              src={`http://localhost:5000/file/product/${productData.image}`}
              alt="Product"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </Box>
        )}

        {!otpMatched ? (
          <>
            <Typography variant="body2" textAlign="center" mt={3}>
              Enter the 1-time key printed on the product:
            </Typography>

            <TextField
              fullWidth
              label="One-Time Key"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mt: 2 }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleOtpSubmit}
              disabled={verifyingOtp}
            >
              {verifyingOtp ? <CircularProgress size={24} /> : "Verify Key"}
            </Button>
          </>
        ) : (
          <>
            <Typography textAlign="center" mt={3} color="green">
              ✅ Product is authentic!
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleViewProduct}
            >
              View Product Details
            </Button>
          </>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button variant="contained" onClick={handleBack}>
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthenticProduct;
