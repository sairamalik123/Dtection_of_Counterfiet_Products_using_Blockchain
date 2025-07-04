import { Box, Paper, Typography, Button, Alert, CircularProgress, Chip } from "@mui/material";
import bgImg from "../../img/bg.png";
import QrScanner from "../QrScanner";
import { useEffect, useState, useCallback } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import abi from "../../utils/Truemark.json";
import axios from "axios";

const ScannerPage = () => {
  const [qrData, setQrData] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [networkStatus, setNetworkStatus] = useState("checking");
  const { auth } = useAuth();
  const navigate = useNavigate();

  const SEPOLIA_CHAIN_ID = 11155111;
  const CONTRACT_ADDRESS = "0xff640E131188aAf6E898a53E7969054327c7A5aA";

  // Memoized callback to prevent unnecessary re-renders
  const passData = useCallback((data) => {
    console.log("📨 QR data received:", data);
    setQrData(data);
    setError(null);
  }, []);

  // Function to ensure we're on Sepolia network
  const ensureSepoliaNetwork = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not found. Please install MetaMask.");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      
      console.log("🌐 Current network:", { name: network.name, chainId: network.chainId });
      
      if (network.chainId !== SEPOLIA_CHAIN_ID) {
        console.log("🔄 Switching to Sepolia testnet...");
        
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}` }],
          });
          
          console.log("✅ Switched to Sepolia testnet");
          setNetworkStatus("connected");
          return true;
        } catch (switchError) {
          if (switchError.code === 4902) {
            // Network not added, add it
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}`,
                chainName: 'Sepolia Testnet',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                blockExplorerUrls: ['https://sepolia.etherscan.io/']
              }]
            });
            
            console.log("✅ Sepolia network added");
            setNetworkStatus("connected");
            return true;
          } else {
            throw switchError;
          }
        }
      } else {
        setNetworkStatus("connected");
      }
      
      return true;
    } catch (error) {
      console.error("❌ Network setup failed:", error);
      setNetworkStatus("error");
      return false;
    }
  };

  // Check network status on component mount
  useEffect(() => {
    ensureSepoliaNetwork();
  }, []);

  // Helper function to show user-friendly error
  const showError = (message, shouldReset = false) => {
    console.error("❌", message);
    setError(message);
    setIsProcessing(false);
    
    if (shouldReset) {
      setTimeout(() => {
        setError(null);
        setQrData(""); // Reset to allow new scan
      }, 5000);
    }
  };

  // Main QR verification effect
  useEffect(() => {
    const verifyQR = async () => {
      if (!qrData || qrData.trim() === "") return;

      setIsProcessing(true);
      setError(null);

      try {
        // First ensure we're on the correct network
        const isCorrectNetwork = await ensureSepoliaNetwork();
        if (!isCorrectNetwork) {
          showError("Please connect to Sepolia testnet in MetaMask", true);
          return;
        }

        console.log("🔍 Processing QR Data:", qrData);

        let serialNumber = null;
        let isValidSignature = false;
        let qrFormat = "unknown";
        let hasSignature = false;

        // Method 1: Check if it's JSON format with digital signature
        try {
          const parsed = JSON.parse(qrData);
          const { contract, serialNumber: sn, signature } = parsed;

          if (contract && sn && signature) {
            serialNumber = sn;
            qrFormat = "signed_json";
            hasSignature = true;
            
            console.log("📝 Signed JSON QR detected");

            isValidSignature = await verifyDigitalSignature(serialNumber, signature);
            if (!isValidSignature) {
              showError("Invalid digital signature. This might be a counterfeit product.", true);
              return;
            }
          }
        } catch (jsonError) {
          console.log("Not JSON format, trying other formats...");
        }

        // Method 2: Check if it's colon-separated format (serial:signature)
        if (!serialNumber && qrData.includes(":")) {
          const parts = qrData.split(":");
          if (parts.length === 2) {
            serialNumber = parts[0];
            qrFormat = "signed_colon";
            hasSignature = true;
            console.log("📝 Colon-separated signed format detected");
            
            // Verify signature
            isValidSignature = await verifyDigitalSignature(parts[0], parts[1]);
            if (!isValidSignature) {
              showError("Invalid digital signature. This might be a counterfeit product.", true);
              return;
            }
          }
        }

        // Method 3: Check if it's URL format
        if (!serialNumber) {
          const urlPattern = /\/product\/(\d+)$/;
          const urlMatch = qrData.match(urlPattern);

          if (urlMatch) {
            serialNumber = urlMatch[1];
            qrFormat = "url";
            console.log("🌐 URL format QR detected");
          }
        }

        // Method 4: Check CSV format
        if (!serialNumber) {
          const csvParts = qrData.split(",");
          if (csvParts.length === 2) {
            const [contractAddress, sn] = csvParts;

            if (contractAddress && sn && contractAddress.includes("0x")) {
              serialNumber = sn;
              qrFormat = "csv";
              console.log("📊 CSV format QR detected");
            }
          }
        }

        // Method 5: Check if it's just a serial number
        if (!serialNumber && /^\d+$/.test(qrData.trim())) {
          serialNumber = qrData.trim();
          qrFormat = "serial_only";
          console.log("🔢 Serial number only format detected");
        }

        if (!serialNumber) {
          showError("QR Code format not recognized. Please scan a valid product QR code.", true);
          return;
        }

        console.log(`✅ Processing ${qrFormat} format with serial: ${serialNumber}`);

        // Verify the product exists in blockchain (only if no signature or signature is valid)
        if (!hasSignature || isValidSignature) {
          const isValidProduct = await verifyProductInBlockchain(serialNumber);

          if (!isValidProduct) {
            // Try database as fallback
            console.log("⚠️ Product not found in blockchain, checking database...");
            const isInDatabase = await verifyProductInDatabase(serialNumber);
            if (!isInDatabase) {
              showError("Product not found. This might be a counterfeit or unregistered product.", true);
              return;
            }
          }
        }

        // Product is valid, prepare route data
        let routeData;
        if (qrFormat === "signed_json" || qrFormat === "signed_colon") {
          routeData = qrData; // Pass original signed data
        } else {
          routeData = `${CONTRACT_ADDRESS},${serialNumber}`;
        }
        
        console.log("🎯 Product verified! Routing user...", {
          serialNumber,
          format: qrFormat,
          userRole: auth.role,
          routeData
        });
        
        setIsProcessing(false);
        
        if (auth.role === "supplier" || auth.role === "retailer") {
          navigate("/update-product", { 
            state: { 
              qrData: routeData,
              serialNumber: serialNumber,
              format: qrFormat 
            } 
          });
        } else {
          navigate("/authentic-product", { 
            state: { 
              qrData: routeData,
              serialNumber: serialNumber,
              format: qrFormat 
            } 
          });
        }

      } catch (error) {
        console.error("💥 QR verification failed:", error);
        
        // Provide more specific error messages
        if (error.message.includes("MetaMask")) {
          showError("MetaMask connection required. Please install and connect MetaMask.", true);
        } else if (error.message.includes("network")) {
          showError("Network error. Please check your connection and try again.", true);
        } else {
          showError("Error verifying product. Please try again.", true);
        }
      }
    };

    verifyQR();
  }, [qrData, auth.role, navigate]);

  // Blockchain verification with improved error handling
  const verifyProductInBlockchain = async (serialNumber) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi.abi,
        provider
      );

      console.log(`🔗 Querying blockchain for product ${serialNumber}...`);

      // Add timeout to prevent hanging
      const product = await Promise.race([
        contractInstance.getProduct(serialNumber),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Blockchain query timeout")), 10000)
        )
      ]);

      console.log("📦 Blockchain response:", product);
      
      // Handle array response
      if (Array.isArray(product) && product.length >= 6) {
        const productData = {
          serialNumber: product[0]?.toString() || "",
          name: product[1]?.toString() || "",
          brand: product[2]?.toString() || "",
          description: product[3]?.toString() || "",
          image: product[4]?.toString() || "",
          owner: product[5]?.toString() || ""
        };
        
        console.log("📋 Processed product:", productData);
        
        // Check if product has valid data
        const isValid = productData.name && 
                       productData.name.trim() !== "" && 
                       productData.name !== "empty" &&
                       productData.serialNumber === serialNumber.toString();
        
        if (isValid) {
          console.log("✅ Product found in blockchain");
          return true;
        }
      }
      
      console.log("⚠️ Product not found or invalid in blockchain");
      return false;
      
    } catch (error) {
      console.error("❌ Blockchain query failed:", error);
      
      // If it's a "Product not found" error, return false instead of throwing
      if (error.message.includes("Product not found")) {
        return false;
      }
      
      // For other errors, still return false but log them
      return false;
    }
  };

  // Database verification with improved error handling
  const verifyProductInDatabase = async (serialNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/product/serialNumber/${serialNumber}`,
        { timeout: 5000 } // 5 second timeout
      );
      
      if (response.data && response.data.serialnumber) {
        console.log("✅ Product found in database");
        return true;
      }
      
      console.log("⚠️ Product not found in database");
      return false;
    } catch (error) {
      console.error("❌ Database query failed:", error);
      return false;
    }
  };

  // Digital signature verification with timeout
  const verifyDigitalSignature = async (serialNumber, signature) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/product/verify",
        {
          serialNumber: serialNumber.toString(),
          signature: signature,
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 5000 // 5 second timeout
        }
      );

      return response.data.isValid === true;
    } catch (error) {
      console.error("❌ Signature verification failed:", error);
      return false;
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    setError(null);
    setQrData("");
    setIsProcessing(false);
  };

  const getNetworkStatusColor = () => {
    switch (networkStatus) {
      case "connected": return "success";
      case "error": return "error";
      default: return "info";
    }
  };

  const getNetworkStatusText = () => {
    switch (networkStatus) {
      case "connected": return "Sepolia Connected";
      case "error": return "Network Error";
      default: return "Checking Network";
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImg})`,
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflowY: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#e3eefc",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: "10px",
            fontFamily: "Gambetta",
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          Scan QR Code
        </Typography>

        {/* Network Status Indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Chip 
            label={getNetworkStatusText()}
            color={getNetworkStatusColor()}
            size="small"
            variant="outlined"
          />
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              <Button color="inherit" size="small" onClick={handleRetry}>
                Try Again
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {isProcessing && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="body2">Verifying product...</Typography>
          </Box>
        )}

        {!isProcessing && !error && networkStatus === "connected" && (
          <QrScanner passData={passData} />
        )}

        {networkStatus === "error" && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Please connect to Sepolia testnet to continue scanning.
          </Alert>
        )}

        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Button 
            variant="outlined" 
            onClick={handleBack}
            sx={{ 
              minWidth: "120px",
              fontWeight: "bold"
            }}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ScannerPage;