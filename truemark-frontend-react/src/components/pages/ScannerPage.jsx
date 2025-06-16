// import { Box, Paper, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import QrScanner from '../QrScanner';
// import { useEffect, useState } from 'react';
// import useAuth from '../../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers';
// import abi from '../../utils/Truemark.json';
// import forge from 'node-forge';

// const ScannerPage = () => {
//   const [qrData, setQrData] = useState('');
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   const passData = (data) => {
//     setQrData(data);
//   };

//   useEffect(() => {
//     const verifyQR = async () => {
//       try {
//         if (!qrData) return;

//         // Parse QR code data (must be a valid JSON string)
//         const parsed = JSON.parse(qrData);
//         const { contract, serialNumber, signature } = parsed;

//         if (!contract || !serialNumber || !signature) {
//           throw new Error("Invalid QR data format.");
//         }

//         // Connect to smart contract
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const contractInstance = new ethers.Contract(contract, abi.abi, provider);

//         // Fetch product details from contract
//         const product = await contractInstance.getProduct(serialNumber);
//         const publicKeyPem = product.publicKey;

//         if (!publicKeyPem || publicKeyPem === "") {
//           throw new Error("Public key not found in product data.");
//         }

//         // Verify signature using node-forge
//         const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
//         const md = forge.md.sha256.create();
//         md.update(serialNumber, 'utf8');
//         const signatureBytes = forge.util.hexToBytes(signature);

//         const verified = publicKey.verify(md.digest().bytes(), signatureBytes);

//         if (verified) {
//           // Redirect based on user role
//           if (auth.role === 'supplier' || auth.role === 'retailer') {
//             navigate('/update-product', { state: { qrData } });
//           } else {
//             navigate('/authentic-product', { state: { qrData } });
//           }
//         } else {
//           // Signature is not valid
//           navigate('/fake-product');
//         }
//       } catch (error) {
//         console.error('QR Code verification failed:', error);
//         navigate('/fake-product');
//       }
//     };

//     verifyQR();
//   }, [qrData]);

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(${bgImg})`,
//         minHeight: '80vh',
//         backgroundRepeat: 'no-repeat',
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         backgroundSize: 'cover',
//         zIndex: -2,
//         overflowY: 'scroll',
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: '400px',
//           margin: 'auto',
//           marginTop: '10%',
//           marginBottom: '10%',
//           padding: '3%',
//           backgroundColor: '#e3eefc',
//         }}
//       >
//         <Box sx={{ textAlign: 'center', marginBottom: '5%' }}>
//           <Typography
//             variant="h2"
//             sx={{
//               textAlign: 'center',
//               marginBottom: '3%',
//               fontFamily: 'Gambetta',
//               fontWeight: 'bold',
//               fontSize: '2.5rem',
//             }}
//           >
//             Scan QR Code
//           </Typography>

//           <QrScanner passData={passData} />

//           <Box
//             sx={{
//               width: '100%',
//               display: 'flex',
//               justifyContent: 'center',
//             }}
//           >
//             <Button onClick={handleBack} sx={{ marginTop: '5%' }}>
//               Back
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ScannerPage;

//before 1 time key enter
// import { Box, Paper, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import QrScanner from '../QrScanner';
// import { useEffect, useState } from 'react';
// import useAuth from '../../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers';
// import abi from '../../utils/Truemark.json';
// import forge from 'node-forge';

// const ScannerPage = () => {
//   const [qrData, setQrData] = useState('');
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   const passData = (data) => {
//     setQrData(data);
//   };

//   useEffect(() => {
//     const verifyQR = async () => {
//       if (!qrData) return;

//       try {
//         // Try parsing as JSON for signed QR format
//         const parsed = JSON.parse(qrData);
//         const { contract, serialNumber, signature } = parsed;

//         if (!contract || !serialNumber || !signature) {
//           throw new Error("Missing fields in signed QR data.");
//         }

//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const contractInstance = new ethers.Contract(contract, abi.abi, provider);
//         const product = await contractInstance.getProduct(serialNumber);
//         const publicKeyPem = product.publicKey;

//         if (!publicKeyPem) throw new Error("Public key not found");

//         const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
//         const md = forge.md.sha256.create();
//         md.update(serialNumber, 'utf8');
//         const signatureBytes = forge.util.hexToBytes(signature);
//         const verified = publicKey.verify(md.digest().bytes(), signatureBytes);

//         if (verified) {
//           if (auth.role === 'supplier' || auth.role === 'retailer') {
//             navigate('/update-product', { state: { qrData } });
//           } else {
//             navigate('/authentic-product', { state: { qrData } });
//           }
//         } else {
//           navigate('/fake-product');
//         }

//       } catch (jsonError) {
//         // If QR is not valid JSON, try old CSV-style format
//         try {
//           const arr = qrData.split(',');
//           const contractAddress = arr[0];
//           const serialNumber = arr[1];

//           if (!contractAddress || !serialNumber) throw new Error("Invalid old QR format");

//           // Optional: Validate if product exists
//           const provider = new ethers.providers.Web3Provider(window.ethereum);
//           const contractInstance = new ethers.Contract(contractAddress, abi.abi, provider);

//           try {
//             await contractInstance.getProduct(serialNumber);
//             // Product exists — accept for now
//             if (auth.role === 'supplier' || auth.role === 'retailer') {
//               navigate('/update-product', { state: { qrData } });
//             } else {
//               navigate('/authentic-product', { state: { qrData } });
//             }
//           } catch {
//             // Serial doesn't exist in blockchain
//             navigate('/fake-product');
//           }
//         } catch (fallbackError) {
//           console.error("QR Code fallback parsing failed:", fallbackError);
//           navigate('/fake-product');
//         }
//       }
//     };

//     verifyQR();
//   }, [qrData]);

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(${bgImg})`,
//         minHeight: '80vh',
//         backgroundRepeat: 'no-repeat',
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         backgroundSize: 'cover',
//         zIndex: -2,
//         overflowY: 'scroll',
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: '400px',
//           margin: 'auto',
//           marginTop: '10%',
//           marginBottom: '10%',
//           padding: '3%',
//           backgroundColor: '#e3eefc',
//         }}
//       >
//         <Box sx={{ textAlign: 'center', marginBottom: '5%' }}>
//           <Typography
//             variant="h2"
//             sx={{
//               textAlign: 'center',
//               marginBottom: '3%',
//               fontFamily: 'Gambetta',
//               fontWeight: 'bold',
//               fontSize: '2.5rem',
//             }}
//           >
//             Scan QR Code
//           </Typography>

//           <QrScanner passData={passData} />

//           <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
//             <Button onClick={handleBack} sx={{ marginTop: '5%' }}>
//               Back
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ScannerPage;




// import { Box, Paper, Typography, Button } from "@mui/material";
// import bgImg from "../../img/bg.png";
// import QrScanner from "../QrScanner";
// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import { ethers } from "ethers";
// import abi from "../../utils/Truemark.json";
// import axios from "axios";

// const ScannerPage = () => {
//   const [qrData, setQrData] = useState("");
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   const CONTRACT_ADDRESS = "0x67333426207CaFD285E178163c43c600127BBEb7";

//   const passData = (data) => {
//     setQrData(data);
//   };

//   useEffect(() => {
//     const verifyQR = async () => {
//       if (!qrData) return;

//       console.log("QR Data received:", qrData);

//       try {
//         let serialNumber = null;
//         let isValidSignature = false;
//         let qrFormat = "unknown";

//         // Method 1: Check if it's a JSON format with digital signature (preferred method)
//         try {
//           const parsed = JSON.parse(qrData);
//           const { contract, serialNumber: sn, signature } = parsed;

//           if (contract && sn && signature) {
//             serialNumber = sn;
//             qrFormat = "signed_json";
            
//             console.log("Signed JSON QR detected:", { contract, serialNumber, signature: "present" });

//             // Verify digital signature with backend
//             isValidSignature = await verifyDigitalSignature(serialNumber, signature);
//             console.log("Digital signature verification:", isValidSignature);

//             if (!isValidSignature) {
//               console.error("Digital signature verification failed");
//               navigate("/fake-product");
//               return;
//             }
//           }
//         } catch (jsonError) {
//           console.log("Not JSON format, trying other formats...");
//         }

//         // Method 2: Check if it's a URL format (http://localhost:3000/product/serialNumber)
//         if (!serialNumber) {
//           const urlPattern = /\/product\/(\d+)$/;
//           const urlMatch = qrData.match(urlPattern);

//           if (urlMatch) {
//             serialNumber = urlMatch[1];
//             qrFormat = "url";
//             console.log("URL format QR detected, serial number:", serialNumber);
//           }
//         }

//         // Method 3: Try CSV-style format (contract,serialNumber)
//         if (!serialNumber) {
//           const csvParts = qrData.split(",");
//           if (csvParts.length === 2) {
//             const [contractAddress, sn] = csvParts;

//             if (contractAddress && sn && contractAddress.includes("0x")) {
//               serialNumber = sn;
//               qrFormat = "csv";
//               console.log("CSV format QR detected:", { contractAddress, serialNumber });
//             }
//           }
//         }

//         // If no valid format found
//         if (!serialNumber) {
//           console.error("QR Code format not recognized:", qrData);
//           navigate("/fake-product");
//           return;
//         }

//         console.log(`Processing ${qrFormat} format QR with serial number: ${serialNumber}`);

//         // Verify the product exists in blockchain
//         const isValidProduct = await verifyProductInBlockchain(serialNumber);

//         if (!isValidProduct) {
//           console.error("Product not found in blockchain:", serialNumber);
//           navigate("/fake-product");
//           return;
//         }

//         // For signed JSON format, we already verified the signature
//         // For other formats, we need additional verification but make it more lenient
//         if (qrFormat !== "signed_json") {
//           console.log("🔍 Performing additional verification for non-signed QR...");
          
//           // Additional verification: Check if product exists in database
//           try {
//             const isValidInDB = await verifyProductInDatabase(serialNumber);
//             if (!isValidInDB) {
//               console.error("❌ Product not found in database:", serialNumber);
//               navigate("/fake-product");
//               return;
//             }
//             console.log("✅ Database verification passed");
//           } catch (dbError) {
//             console.error("⚠️ Database verification failed, but continuing:", dbError.message);
//             // Don't fail here, just log the warning
//           }
//         }

//         // Product is authentic, route based on user role
//         const routeData = qrFormat === "signed_json" ? qrData : `${CONTRACT_ADDRESS},${serialNumber}`;
        
//         console.log("🎯 Product verified successfully. Routing user...", {
//           serialNumber,
//           format: qrFormat,
//           userRole: auth.role,
//           routeData: routeData.substring(0, 50) + "..." // Truncate for logging
//         });
        
//         if (auth.role === "supplier" || auth.role === "retailer") {
//           navigate("/update-product", { 
//             state: { 
//               qrData: routeData,
//               serialNumber: serialNumber,
//               format: qrFormat 
//             } 
//           });
//         } else {
//           navigate("/authentic-product", { 
//             state: { 
//               qrData: routeData,
//               serialNumber: serialNumber,
//               format: qrFormat 
//             } 
//           });
//         }

//       } catch (error) {
//         console.error("QR Code verification failed:", error);
//         navigate("/fake-product");
//       }
//     };

//     verifyQR();
//   }, [qrData, auth.role, navigate]);

//   // Helper function to verify product exists in blockchain
//   const verifyProductInBlockchain = async (serialNumber) => {
//     try {
//       if (!window.ethereum) {
//         console.error("MetaMask not found");
//         return false;
//       }

//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const contractInstance = new ethers.Contract(
//         CONTRACT_ADDRESS,
//         abi.abi,
//         provider
//       );

//       // Try to get the product from blockchain
//       const product = await contractInstance.getProduct(serialNumber);
      
//       console.log("Blockchain product data:", {
//         serialNumber,
//         name: product.name || "empty",
//         brand: product.brand || "empty",
//         description: product.description || "empty",
//         isRegistered: product.name && product.name.trim() !== ""
//       });
      
//       // Check if product exists and has valid data
//       if (product && product.name && product.name.trim() !== "") {
//         console.log("✅ Product found and valid in blockchain:", {
//           serialNumber,
//           name: product.name,
//           brand: product.brand
//         });
//         return true;
//       } else if (product && (!product.name || product.name.trim() === "")) {
//         console.log("⚠️ Product exists in blockchain but not properly registered (empty name)");
//         // Product exists but might not be fully registered yet
//         // Let's check if it at least exists in database
//         const dbExists = await verifyProductInDatabase(serialNumber);
//         if (dbExists) {
//           console.log("✅ Product found in database, allowing access despite blockchain registration issue");
//           return true;
//         }
//         return false;
//       } else {
//         console.log("❌ Product does not exist in blockchain");
//         return false;
//       }
//     } catch (error) {
//       console.error("❌ Blockchain verification error:", error.message);
      
//       // If blockchain call fails, check if product exists in database as fallback
//       console.log("🔄 Falling back to database verification...");
//       try {
//         const dbExists = await verifyProductInDatabase(serialNumber);
//         if (dbExists) {
//           console.log("✅ Product found in database (blockchain verification failed)");
//           return true;
//         }
//       } catch (dbError) {
//         console.error("Database fallback also failed:", dbError.message);
//       }
      
//       return false;
//     }
//   };

//   // Helper function to verify product exists in database
//   const verifyProductInDatabase = async (serialNumber) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/product/serialNumber/${serialNumber}`);
      
//       if (response.data && response.data.serialnumber) {
//         console.log("Product found in database:", response.data.serialnumber);
//         return true;
//       } else {
//         console.log("Product not found in database");
//         return false;
//       }
//     } catch (error) {
//       console.error("Database verification failed:", error.message);
//       return false;
//     }
//   };

//   // Helper function to verify digital signature
//   const verifyDigitalSignature = async (serialNumber, signature) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/product/verify",
//         {
//           serialNumber: serialNumber.toString(),
//           signature: signature,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       console.log("Signature verification response:", response.data);
//       return response.data.isValid === true;
//     } catch (error) {
//       console.error("Signature verification request failed:", error.message);
//       return false;
//     }
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(${bgImg})`,
//         minHeight: "80vh",
//         backgroundRepeat: "no-repeat",
//         position: "absolute",
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         backgroundSize: "cover",
//         zIndex: -2,
//         overflowY: "scroll",
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: "400px",
//           margin: "auto",
//           marginTop: "10%",
//           marginBottom: "10%",
//           padding: "3%",
//           backgroundColor: "#e3eefc",
//         }}
//       >
//         <Box sx={{ textAlign: "center", marginBottom: "5%" }}>
//           <Typography
//             variant="h2"
//             sx={{
//               textAlign: "center",
//               marginBottom: "3%",
//               fontFamily: "Gambetta",
//               fontWeight: "bold",
//               fontSize: "2.5rem",
//             }}
//           >
//             Scan QR Code
//           </Typography>

//           <QrScanner passData={passData} />

//           <Box
//             sx={{ width: "100%", display: "flex", justifyContent: "center" }}
//           >
//             <Button onClick={handleBack} sx={{ marginTop: "5%" }}>
//               Back
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ScannerPage;



// import { Box, Paper, Typography, Button, Alert, CircularProgress, Chip } from "@mui/material";
// import bgImg from "../../img/bg.png";
// import QrScanner from "../QrScanner";
// import { useEffect, useState, useCallback } from "react";
// import useAuth from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import { ethers } from "ethers";
// import abi from "../../utils/Truemark.json";
// import axios from "axios";

// const ScannerPage = () => {
//   const [qrData, setQrData] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [networkStatus, setNetworkStatus] = useState("checking");
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   const SEPOLIA_CHAIN_ID = 11155111;
//   const CONTRACT_ADDRESS = "0x67333426207CaFD285E178163c43c600127BBEb7";

//   // Memoized callback to prevent unnecessary re-renders
//   const passData = useCallback((data) => {
//     console.log("📨 QR data received:", data);
//     setQrData(data);
//     setError(null);
//   }, []);

//   // Function to ensure we're on Sepolia network
//   const ensureSepoliaNetwork = async () => {
//     try {
//       if (!window.ethereum) {
//         throw new Error("MetaMask not found. Please install MetaMask.");
//       }

//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const network = await provider.getNetwork();
      
//       console.log("🌐 Current network:", { name: network.name, chainId: network.chainId });
      
//       if (network.chainId !== SEPOLIA_CHAIN_ID) {
//         console.log("🔄 Switching to Sepolia testnet...");
        
//         try {
//           await window.ethereum.request({
//             method: 'wallet_switchEthereumChain',
//             params: [{ chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}` }],
//           });
          
//           console.log("✅ Switched to Sepolia testnet");
//           setNetworkStatus("connected");
//           return true;
//         } catch (switchError) {
//           if (switchError.code === 4902) {
//             // Network not added, add it
//             await window.ethereum.request({
//               method: 'wallet_addEthereumChain',
//               params: [{
//                 chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}`,
//                 chainName: 'Sepolia Testnet',
//                 nativeCurrency: {
//                   name: 'ETH',
//                   symbol: 'ETH',
//                   decimals: 18
//                 },
//                 rpcUrls: ['https://sepolia.infura.io/v3/'],
//                 blockExplorerUrls: ['https://sepolia.etherscan.io/']
//               }]
//             });
            
//             console.log("✅ Sepolia network added");
//             setNetworkStatus("connected");
//             return true;
//           } else {
//             throw switchError;
//           }
//         }
//       } else {
//         setNetworkStatus("connected");
//       }
      
//       return true;
//     } catch (error) {
//       console.error("❌ Network setup failed:", error);
//       setNetworkStatus("error");
//       return false;
//     }
//   };

//   // Check network status on component mount
//   useEffect(() => {
//     ensureSepoliaNetwork();
//   }, []);

//   // Helper function to show user-friendly error
//   const showError = (message, shouldReset = false) => {
//     console.error("❌", message);
//     setError(message);
//     setIsProcessing(false);
    
//     if (shouldReset) {
//       setTimeout(() => {
//         setError(null);
//         setQrData(""); // Reset to allow new scan
//       }, 5000);
//     }
//   };

//   // Main QR verification effect
//   useEffect(() => {
//     const verifyQR = async () => {
//       if (!qrData || qrData.trim() === "") return;

//       setIsProcessing(true);
//       setError(null);

//       try {
//         // First ensure we're on the correct network
//         const isCorrectNetwork = await ensureSepoliaNetwork();
//         if (!isCorrectNetwork) {
//           showError("Please connect to Sepolia testnet in MetaMask", true);
//           return;
//         }

//         console.log("🔍 Processing QR Data:", qrData);

//         let serialNumber = null;
//         let isValidSignature = false;
//         let qrFormat = "unknown";

//         // Method 1: Check if it's JSON format with digital signature
//         try {
//           const parsed = JSON.parse(qrData);
//           const { contract, serialNumber: sn, signature } = parsed;

//           if (contract && sn && signature) {
//             serialNumber = sn;
//             qrFormat = "signed_json";
            
//             console.log("📝 Signed JSON QR detected");

//             isValidSignature = await verifyDigitalSignature(serialNumber, signature);
//             if (!isValidSignature) {
//               showError("Invalid digital signature. This might be a counterfeit product.", true);
//               return;
//             }
//           }
//         } catch (jsonError) {
//           console.log("Not JSON format, trying other formats...");
//         }

//         // Method 2: Check if it's URL format
//         if (!serialNumber) {
//           const urlPattern = /\/product\/(\d+)$/;
//           const urlMatch = qrData.match(urlPattern);

//           if (urlMatch) {
//             serialNumber = urlMatch[1];
//             qrFormat = "url";
//             console.log("🌐 URL format QR detected");
//           }
//         }

//         // Method 3: Check CSV format
//         if (!serialNumber) {
//           const csvParts = qrData.split(",");
//           if (csvParts.length === 2) {
//             const [contractAddress, sn] = csvParts;

//             if (contractAddress && sn && contractAddress.includes("0x")) {
//               serialNumber = sn;
//               qrFormat = "csv";
//               console.log("📊 CSV format QR detected");
//             }
//           }
//         }

//         // Method 4: Check if it's just a serial number
//         if (!serialNumber && /^\d+$/.test(qrData.trim())) {
//           serialNumber = qrData.trim();
//           qrFormat = "serial_only";
//           console.log("🔢 Serial number only format detected");
//         }

//         if (!serialNumber) {
//           showError("QR Code format not recognized. Please scan a valid product QR code.", true);
//           return;
//         }

//         console.log(`✅ Processing ${qrFormat} format with serial: ${serialNumber}`);

//         // Verify the product exists in blockchain
//         const isValidProduct = await verifyProductInBlockchain(serialNumber);

//         if (!isValidProduct) {
//           // Try database as fallback
//           console.log("⚠️ Product not found in blockchain, checking database...");
//           const isInDatabase = await verifyProductInDatabase(serialNumber);
//           if (!isInDatabase) {
//             showError("Product not found. This might be a counterfeit or unregistered product.", true);
//             return;
//           }
//         }

//         // Product is valid, navigate based on user role
//         const routeData = qrFormat === "signed_json" ? qrData : `${CONTRACT_ADDRESS},${serialNumber}`;
        
//         console.log("🎯 Product verified! Routing user...", {
//           serialNumber,
//           format: qrFormat,
//           userRole: auth.role
//         });
        
//         setIsProcessing(false);
        
//         if (auth.role === "supplier" || auth.role === "retailer") {
//           navigate("/update-product", { 
//             state: { 
//               qrData: routeData,
//               serialNumber: serialNumber,
//               format: qrFormat 
//             } 
//           });
//         } else {
//           navigate("/authentic-product", { 
//             state: { 
//               qrData: routeData,
//               serialNumber: serialNumber,
//               format: qrFormat 
//             } 
//           });
//         }

//       } catch (error) {
//         console.error("💥 QR verification failed:", error);
        
//         // Provide more specific error messages
//         if (error.message.includes("MetaMask")) {
//           showError("MetaMask connection required. Please install and connect MetaMask.", true);
//         } else if (error.message.includes("network")) {
//           showError("Network error. Please check your connection and try again.", true);
//         } else {
//           showError("Error verifying product. Please try again.", true);
//         }
//       }
//     };

//     verifyQR();
//   }, [qrData, auth.role, navigate]);

//   // Blockchain verification with improved error handling
//   const verifyProductInBlockchain = async (serialNumber) => {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const contractInstance = new ethers.Contract(
//         CONTRACT_ADDRESS,
//         abi.abi,
//         provider
//       );

//       console.log(`🔗 Querying blockchain for product ${serialNumber}...`);

//       // Add timeout to prevent hanging
//       const product = await Promise.race([
//         contractInstance.getProduct(serialNumber),
//         new Promise((_, reject) => 
//           setTimeout(() => reject(new Error("Blockchain query timeout")), 10000)
//         )
//       ]);

//       console.log("📦 Blockchain response:", product);
      
//       // Handle array response
//       if (Array.isArray(product) && product.length >= 6) {
//         const productData = {
//           serialNumber: product[0]?.toString() || "",
//           name: product[1]?.toString() || "",
//           brand: product[2]?.toString() || "",
//           description: product[3]?.toString() || "",
//           image: product[4]?.toString() || "",
//           owner: product[5]?.toString() || ""
//         };
        
//         console.log("📋 Processed product:", productData);
        
//         // Check if product has valid data
//         const isValid = productData.name && 
//                        productData.name.trim() !== "" && 
//                        productData.name !== "empty" &&
//                        productData.serialNumber === serialNumber.toString();
        
//         if (isValid) {
//           console.log("✅ Product found in blockchain");
//           return true;
//         }
//       }
      
//       console.log("⚠️ Product not found or invalid in blockchain");
//       return false;
      
//     } catch (error) {
//       console.error("❌ Blockchain query failed:", error);
//       return false;
//     }
//   };

//   // Database verification with improved error handling
//   const verifyProductInDatabase = async (serialNumber) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/product/serialNumber/${serialNumber}`,
//         { timeout: 5000 } // 5 second timeout
//       );
      
//       if (response.data && response.data.serialnumber) {
//         console.log("✅ Product found in database");
//         return true;
//       }
      
//       console.log("⚠️ Product not found in database");
//       return false;
//     } catch (error) {
//       console.error("❌ Database query failed:", error);
//       return false;
//     }
//   };

//   // Digital signature verification with timeout
//   const verifyDigitalSignature = async (serialNumber, signature) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/product/verify",
//         {
//           serialNumber: serialNumber.toString(),
//           signature: signature,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//           timeout: 5000 // 5 second timeout
//         }
//       );

//       return response.data.isValid === true;
//     } catch (error) {
//       console.error("❌ Signature verification failed:", error);
//       return false;
//     }
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handleRetry = () => {
//     setError(null);
//     setQrData("");
//     setIsProcessing(false);
//   };

//   const getNetworkStatusColor = () => {
//     switch (networkStatus) {
//       case "connected": return "success";
//       case "error": return "error";
//       default: return "info";
//     }
//   };

//   const getNetworkStatusText = () => {
//     switch (networkStatus) {
//       case "connected": return "Sepolia Connected";
//       case "error": return "Network Error";
//       default: return "Checking Network";
//     }
//   };

//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(${bgImg})`,
//         minHeight: "100vh",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         position: "fixed",
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         overflowY: "auto",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: "90%",
//           maxWidth: "400px",
//           padding: "20px",
//           backgroundColor: "#e3eefc",
//           borderRadius: "12px",
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             textAlign: "center",
//             marginBottom: "10px",
//             fontFamily: "Gambetta",
//             fontWeight: "bold",
//             color: "#1976d2",
//           }}
//         >
//           Scan QR Code
//         </Typography>

//         {/* Network Status Indicator */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//           <Chip 
//             label={getNetworkStatusText()}
//             color={getNetworkStatusColor()}
//             size="small"
//             variant="outlined"
//           />
//         </Box>

//         {error && (
//           <Alert 
//             severity="error" 
//             sx={{ mb: 2 }}
//             action={
//               <Button color="inherit" size="small" onClick={handleRetry}>
//                 Try Again
//               </Button>
//             }
//           >
//             {error}
//           </Alert>
//         )}

//         {isProcessing && (
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
//             <CircularProgress size={20} sx={{ mr: 1 }} />
//             <Typography variant="body2">Verifying product...</Typography>
//           </Box>
//         )}

//         {!isProcessing && !error && networkStatus === "connected" && (
//           <QrScanner passData={passData} />
//         )}

//         {networkStatus === "error" && (
//           <Alert severity="warning" sx={{ mb: 2 }}>
//             Please connect to Sepolia testnet to continue scanning.
//           </Alert>
//         )}

//         <Box sx={{ textAlign: "center", marginTop: "20px" }}>
//           <Button 
//             variant="outlined" 
//             onClick={handleBack}
//             sx={{ 
//               minWidth: "120px",
//               fontWeight: "bold"
//             }}
//           >
//             Back
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ScannerPage;



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