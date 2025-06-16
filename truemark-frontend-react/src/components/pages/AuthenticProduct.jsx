// import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const getEthereumObject = () => window.ethereum;

// const findMetaMaskAccount = async () => {
//     try {
//         const ethereum = getEthereumObject();

//         /*
//          * First make sure we have access to the Ethereum object.
//          */
//         if (!ethereum) {
//             console.error("Make sure you have Metamask!");
//             return null;
//         }

//         console.log("We have the Ethereum object", ethereum);
//         const accounts = await ethereum.request({ method: "eth_accounts" });

//         if (accounts.length !== 0) {
//             const account = accounts[0];
//             console.log("Found an authorized account:", account);
//             return account;
//         } else {
//             console.error("No authorized account found");
//             return null;
//         }
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

// const AuthenticProduct = () => {
//     const [currentAccount, setCurrentAccount] = useState("");
//     const navigate = useNavigate();
//     const location = useLocation();
//     const qrData = location.state?.qrData;

//     useEffect(() => {
//         findMetaMaskAccount().then((account) => {
//             if (account !== null) {
//                 setCurrentAccount(account);
//             }
//         });
//     }, []);

//     const connectWallet = async () => {
//         try {
//             const ethereum = getEthereumObject();
//             if (!ethereum) {
//                 alert("Get MetaMask!");
//                 return;
//             }

//             const accounts = await ethereum.request({
//                 method: "eth_requestAccounts",
//             });

//             console.log("Connected", accounts[0]);
//             setCurrentAccount(accounts[0]);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleClick = () => {
//         connectWallet();

//     }

//     useEffect(() => {
//         if(currentAccount){
//             navigate('/product', { state: { qrData }});
//         }
//     }, [currentAccount]);

//     console.log("qrdata: ", qrData);

//     return (
//         <Box sx={{
//             backgroundImage: `url(${bgImg})`,
//             minHeight: "80vh",
//             position: 'absolute',
//             left: 0,
//             right: 0,
//             top: 0,
//             bottom: 0,
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             zIndex: -2,
//             overflowY: "scroll"
//         }}>

//             <Paper elevation={3} sx={{ width: "400px", margin: "auto", marginTop: "10%", marginBottom: "10%", padding: "3%", backgroundColor: "#e3eefc" }}>
//                 <Typography
//                     variant="h4"
//                     sx={{
//                         fontFamily: "Montserrat",
//                         textAlign: "center", marginBottom: "5%", marginTop: "5%",
//                     }}
//                 >
//                     Congrats!
//                 </Typography>
//                 <Typography
//                 variant="h5"
//                 sx={{
//                     fontFamily: "Montserrat",
//                     textAlign: "center", marginBottom: "5%", marginTop: "5%",
//                 }}   >
//                     Your Product is Authentic
//                 </Typography>
//                 <Typography
//                 variant="body2"
//                 sx={{
//                     textAlign: "center", marginTop: "10%", marginBottom: "5%",
//                 }}
//                 >
//                     Connect Your Wallet to View Product Details
//                 </Typography>

//                 <Button variant="contained" sx={{ width: "100%", marginTop: "5%" }} onClick={handleClick}>
//                     Connect Wallet
//                 </Button>
//             </Paper>
//         </Box>

//     )

// }

// export default AuthenticProduct;

//before verification
// import { Box, Paper, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ethers } from 'ethers';
// import abi from '../../utils/Truemark.json';
// const CONTRACT_ADDRESS = '0x67333426207CaFD285E178163c43c600127BBEb7'; // ✅ Replace with your actual deployed address

// const getEthereumObject = () => window.ethereum;

// const findMetaMaskAccount = async () => {
//     try {
//         const ethereum = getEthereumObject();
//         if (!ethereum) return null;
//         const accounts = await ethereum.request({ method: "eth_accounts" });
//         return accounts.length > 0 ? accounts[0] : null;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

// const AuthenticProduct = () => {
//     const [currentAccount, setCurrentAccount] = useState("");
//     const [isAuthentic, setIsAuthentic] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();
//     const location = useLocation();
//     const qrData = location.state?.qrData;

//     // useEffect(() => {
//     //     const checkProductAuthenticity = async () => {
//     //         try {
//     //             const provider = new ethers.providers.Web3Provider(window.ethereum);
//     //             const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);

//     //             const product = await contract.getProduct(qrData);
//     //             if (product[0] !== '') {
//     //                 setIsAuthentic(true);
//     //             } else {
//     //                 setIsAuthentic(false);
//     //             }
//     //         } catch (err) {
//     //             console.error("Error checking product:", err);
//     //             setIsAuthentic(false);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     if (qrData) {
//     //         checkProductAuthenticity();
//     //     } else {
//     //         setLoading(false);
//     //         setIsAuthentic(false);
//     //     }
//     // }, [qrData]);

//     useEffect(() => {
//         const checkProductAuthenticity = async () => {
//             try {
//                 const provider = new ethers.providers.Web3Provider(window.ethereum);
//                 const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);

//                 // Split qrData (e.g., "address,serialNumber")
//                 const serialNumber = qrData.split(',')[1].trim();  // This will give "stylo1"
//                 console.log("✅ Serial Number extracted:", serialNumber);

//                 const product = await contract.getProduct(serialNumber);
//                 console.log("📦 Product returned:", product);

//                 if (product[0] !== '') {
//                     setIsAuthentic(true);
//                 } else {
//                     setIsAuthentic(false);
//                 }
//             } catch (err) {
//                 console.error("❌ Error checking product:", err);
//                 setIsAuthentic(false);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (qrData) {
//             checkProductAuthenticity();
//         } else {
//             setLoading(false);
//             setIsAuthentic(false);
//         }
//     }, [qrData]);

//     const connectWallet = async () => {
//         try {
//             const ethereum = getEthereumObject();
//             if (!ethereum) return alert("Please install MetaMask");

//             const accounts = await ethereum.request({ method: "eth_requestAccounts" });
//             setCurrentAccount(accounts[0]);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         if (currentAccount && isAuthentic) {
//             navigate('/product', { state: { qrData } });
//         }
//     }, [currentAccount, isAuthentic]);

//     if (loading) {
//         return (
//             <Box sx={{ textAlign: "center", mt: 10 }}>
//                 <Typography variant="h6">Checking product authenticity...</Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{
//             backgroundImage: `url(${bgImg})`,
//             minHeight: "80vh",
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             zIndex: -2,
//             overflowY: "scroll",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center"
//         }}>
//             <Paper elevation={3} sx={{ width: "400px", p: 4, backgroundColor: "#e3eefc" }}>
//                 {isAuthentic ? (
//                     <>
//                         <Typography variant="h4" textAlign="center">Congrats!</Typography>
//                         <Typography variant="h5" textAlign="center" mt={2}>Your Product is Authentic</Typography>
//                         <Typography variant="body2" textAlign="center" mt={4}>
//                             Connect Your Wallet to View Product Details
//                         </Typography>
//                         <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={connectWallet}>
//                             Connect Wallet
//                         </Button>
//                     </>
//                 ) : (
//                     <>
//                         <Typography variant="h4" textAlign="center" color="error">Warning</Typography>
//                         <Typography variant="h6" textAlign="center" mt={2}>This Product is NOT Authentic</Typography>
//                         <Typography variant="body2" textAlign="center" mt={2}>
//                             The scanned serial number was not found on blockchain.
//                         </Typography>
//                     </>
//                 )}
//             </Paper>
//         </Box>
//     );
// };

// export default AuthenticProduct;

// import { Box, Paper, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ethers } from 'ethers';
// import abi from '../../utils/Truemark.json';
// import forge from 'node-forge';

// const CONTRACT_ADDRESS = '0x67333426207CaFD285E178163c43c600127BBEb7';

// const getEthereumObject = () => window.ethereum;

// const AuthenticProduct = () => {
//     const [currentAccount, setCurrentAccount] = useState("");
//     const [isAuthentic, setIsAuthentic] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();
//     const location = useLocation();
//     const qrData = location.state?.qrData; // e.g., "stylo1:BASE64_SIGNATURE"

//     const connectWallet = async () => {
//         try {
//             const ethereum = getEthereumObject();
//             if (!ethereum) {
//                 alert("Get MetaMask!");
//                 return;
//             }

//             const accounts = await ethereum.request({
//                 method: "eth_requestAccounts",
//             });

//             console.log("Connected", accounts[0]);
//             setCurrentAccount(accounts[0]);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleClick = () => {
//         connectWallet();

//     }

//     useEffect(() => {
//         const verifySignature = async () => {
//             try {
//                 const provider = new ethers.providers.Web3Provider(window.ethereum);
//                 const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);

//                 // Step 1: Split QR Data
//                 const [serialNumber, base64Signature] = qrData.split(':');
//                 console.log("🔍 Serial Number:", serialNumber);
//                 console.log("🔏 Signature (Base64):", base64Signature);

//                 // Step 2: Fetch product from blockchain
//                 const product = await contract.getProduct(serialNumber);
//                 const publicKeyPem = product[6]; // publicKey is at index 6 in smart contract

//                 if (!publicKeyPem || publicKeyPem === "") {
//                     console.error("No public key found on blockchain for this product.");
//                     navigate('/fakeproduct', { state: { qrData } });
//                     return;
//                 }

//                 // Step 3: Verify digital signature
//                 const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
//                 const signatureBytes = forge.util.decode64(base64Signature);
//                 const md = forge.md.sha256.create();
//                 md.update(serialNumber, 'utf8');
//                 const isValid = publicKey.verify(md.digest().bytes(), signatureBytes);

//                 if (isValid) {
//                     console.log("✅ Product is Authentic!");
//                     setIsAuthentic(true);
//                 } else {
//                     console.warn("❌ Invalid Signature: Product is likely FAKE.");
//                     navigate('/fakeproduct', { state: { qrData } });
//                 }
//             } catch (error) {
//                 console.error("🚨 Error verifying authenticity:", error);
//                 navigate('/fakeproduct', { state: { qrData } });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (qrData) {
//             verifySignature();
//         } else {
//             setLoading(false);
//             setIsAuthentic(false);
//         }
//     }, [qrData, navigate]);

//     useEffect(() => {
//         if (currentAccount && isAuthentic) {
//             navigate('/product', { state: { qrData } });
//         }
//     }, [currentAccount, isAuthentic, navigate, qrData]);

//     if (loading) {
//         return (
//             <Box sx={{ textAlign: "center", mt: 10 }}>
//                 <Typography variant="h6">Checking product authenticity...</Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{
//             backgroundImage: `url(${bgImg})`,
//             minHeight: "80vh",
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             zIndex: -2,
//             overflowY: "scroll",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center"
//         }}>
//             <Paper elevation={3} sx={{ width: "400px", p: 4, backgroundColor: "#e3eefc" }}>
//                 <Typography variant="h4" textAlign="center">Congrats!</Typography>
//                 <Typography variant="h5" textAlign="center" mt={2}>Your Product is Authentic</Typography>
//                 <Typography variant="body2" textAlign="center" mt={4}>
//                     Connect Your Wallet to View Product Details
//                 </Typography>
//                 <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleClick}>
//                     Connect Wallet
//                 </Button>
//             </Paper>
//         </Box>
//     );
// };

// export default AuthenticProduct;

//fine
// import { Box, Paper, Typography, Button } from "@mui/material";
// import bgImg from "../../img/bg.png";
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ethers } from "ethers";
// import abi from "../../utils/Truemark.json";
// import forge from "node-forge";

// const CONTRACT_ADDRESS = "0x67333426207CaFD285E178163c43c600127BBEb7";

// const getEthereumObject = () => window.ethereum;

// const AuthenticProduct = () => {
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [isAuthentic, setIsAuthentic] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [serialNumber, setSerialNumber] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const qrData = location.state?.qrData; // e.g., "stylo1:BASE64_SIGNATURE"

//   const tryNavigate = (account, authentic) => {
//   if (account && authentic && qrData) {
//     const [serial] = qrData.split(":");
//     const formattedQrData = `${CONTRACT_ADDRESS},${serial}`;
//     navigate("/product", { state: { qrData: formattedQrData } });
//   }
// };

//  const connectWallet = async () => {
//   try {
//     const ethereum = getEthereumObject();
//     if (!ethereum) {
//       alert("Get MetaMask!");
//       return;
//     }

//     const accounts = await ethereum.request({
//       method: "eth_requestAccounts",
//     });

//     console.log("Connected", accounts[0]);
//     setCurrentAccount(accounts[0]);
//     tryNavigate(accounts[0], isAuthentic); // <- Try to navigate if authentic already
//   } catch (error) {
//     console.error(error);
//   }
// };

//   const handleClick = () => {
//     connectWallet();
//   };

//   useEffect(() => {
//     const verifySignature = async () => {
//       try {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const contract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           abi.abi,
//           provider
//         );

//         // Step 1: Split QR Data
//         const [serial, base64Signature] = qrData.split(":");
//         setSerialNumber(serial);
//         console.log("🔍 Serial Number:", serial);
//         console.log("🔏 Signature (Base64):", base64Signature);

//         // Step 2: Fetch product from blockchain
//         const product = await contract.getProduct(serial);
//         const publicKeyPem = product[6]; // publicKey is at index 6 in smart contract

//         if (!publicKeyPem || publicKeyPem === "") {
//           console.error("No public key found on blockchain for this product.");
//           navigate("/fakeproduct", { state: { qrData } });
//           return;
//         }

//         // Step 3: Verify digital signature
//         const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
//         const signatureBytes = forge.util.decode64(base64Signature);
//         const md = forge.md.sha256.create();
//         md.update(serial, "utf8");
//         const isValid = publicKey.verify(md.digest().bytes(), signatureBytes);

//         if (isValid) {
//           console.log("✅ Product is Authentic!");
//           setIsAuthentic(true);
//           tryNavigate(currentAccount, true);
//         } else {
//           console.warn("❌ Invalid Signature: Product is likely FAKE.");
//           navigate("/fakeproduct", { state: { qrData } });
//         }
//       } catch (error) {
//         console.error("🚨 Error verifying authenticity:", error);
//         navigate("/fakeproduct", { state: { qrData } });
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (qrData) {
//       verifySignature();
//     } else {
//       setLoading(false);
//       setIsAuthentic(false);
//     }
//   }, [qrData, navigate]);

//   useEffect(() => {
//     if (currentAccount && isAuthentic && qrData) {
//       const [serialNumber] = qrData.split(":");
//       const formattedQrData = `${CONTRACT_ADDRESS},${serialNumber}`;
//       navigate("/product", { state: { qrData: formattedQrData } });
//     }
//   }, [currentAccount, isAuthentic, qrData, navigate]);

//   if (loading) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 10 }}>
//         <Typography variant="h6">Checking product authenticity...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(${bgImg})`,
//         minHeight: "80vh",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         zIndex: -2,
//         overflowY: "scroll",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{ width: "400px", p: 4, backgroundColor: "#e3eefc" }}
//       >
//         <Typography variant="h4" textAlign="center">
//           Congrats!
//         </Typography>
//         <Typography variant="h5" textAlign="center" mt={2}>
//           Your Product is Authentic
//         </Typography>
//         <Typography variant="body2" textAlign="center" mt={4}>
//           Connect Your Wallet to View Product Details
//         </Typography>
//         <Button
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3 }}
//           onClick={handleClick}
//         >
//           Connect Wallet
//         </Button>
//       </Paper>
//     </Box>
//   );
// };

// export default AuthenticProduct;

// import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
// import dayjs from 'dayjs';
// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers';
// import abi from '../../utils/Truemark.json';
// import bgImg from '../../img/bg.png';
// import forge from 'node-forge';

// const CONTRACT_ADDRESS = '0x67333426207CaFD285E178163c43c600127BBEb7';
// const CONTRACT_ABI = abi.abi;

// const AuthenticProduct = () => {
//   const [serialNumber, setSerialNumber] = useState('');
//   const [name, setName] = useState('');
//   const [brand, setBrand] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState({ filepreview: null });
//   const [history, setHistory] = useState([]);
//   const [isSold, setIsSold] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [authentic, setAuthentic] = useState(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const qrData = location.state?.qrData;

//   useEffect(() => {
//     if (qrData) {
//       handleQRScan(qrData);
//     }
//   }, [qrData]);

//   const handleQRScan = async (data) => {
//     setLoading(true);
//     try {
//       const parsed = JSON.parse(data);
//       console.log("🔍 Processing QR Data:", parsed);

//       if (parsed.contract !== CONTRACT_ADDRESS) throw new Error("Invalid contract address in QR");

//       const { serialNumber, signature } = parsed;
//       if (!serialNumber || !signature) throw new Error("Missing serialNumber or signature");

//       setSerialNumber(serialNumber);

//       // Interact with blockchain
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
//       const product = await contract.getProduct(serialNumber);
//       console.log("📦 Blockchain response:", product);

//       populateProductData(product);

//       // Get public key and verify
//       const publicKeyPem = await contract.getPublicKey(serialNumber);
//       console.log("🔑 Public Key PEM:", publicKeyPem);

//       const isValid = verifyAuthenticity(serialNumber, signature, publicKeyPem);
//       setAuthentic(isValid);

//     } catch (err) {
//       console.error("❌ Error handling QR scan:", err);
//       setAuthentic(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyAuthenticity = (message, base64Signature, pemKey) => {
//     try {
//       const publicKey = forge.pki.publicKeyFromPem(pemKey);
//       const md = forge.md.sha256.create();
//       md.update(message, 'utf8');

//       const decodedSignature = forge.util.decode64(base64Signature);
//       const verified = publicKey.verify(md.digest().bytes(), decodedSignature);
//       console.log("✅ Signature verified:", verified);
//       return verified;
//     } catch (err) {
//       console.error("❌ Signature verification failed:", err);
//       return false;
//     }
//   };

//   const getImage = async (imageName) => {
//     setImage({
//       filepreview: `http://localhost:5000/file/product/${imageName}`
//     });
//   };

//   const populateProductData = (product) => {
//     setName(product[0]);
//     setBrand(product[1]);
//     setDescription(product[2]?.replace(/;/g, ','));
//     getImage(product[4]);

//     const hist = product[6].map((entry) => {
//       const actor = entry[1];
//       const location = entry[2]?.replace(/;/g, ',');
//       const timestamp = Number(entry[3]);
//       const isSoldFlag = entry[4];
//       if (isSoldFlag) setIsSold(true);
//       return { actor, location, timestamp };
//     });

//     setHistory(hist);
//   };

//   const handleBack = () => navigate(-1);

//   return (
//     <Box sx={{
//       backgroundImage: `url(${bgImg})`,
//       minHeight: "100vh",
//       backgroundSize: 'cover',
//       paddingTop: "5%",
//       paddingBottom: "5%",
//     }}>
//       <Paper elevation={3} sx={{
//         maxWidth: 600,
//         margin: "auto",
//         padding: 4,
//         backgroundColor: "#f0f4fa"
//       }}>
//         <Typography variant="h4" align="center" gutterBottom>Authenticity Check</Typography>

//         {loading ? (
//           <Typography align="center" sx={{ mt: 5, mb: 5 }}>Verifying product...</Typography>
//         ) : (
//           <>
//             {authentic === true ? (
//               <Typography variant="h6" align="center" color="green">✅ Product is Authentic</Typography>
//             ) : (
//               <Typography variant="h6" align="center" color="red">❌ Product is Fake</Typography>
//             )}

//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4, mt: 3 }}>
//               <Avatar alt={name} src={image.filepreview} sx={{ width: 100, height: 100, marginRight: 2 }} />
//               <Box>
//                 <Typography variant="h6">{name}</Typography>
//                 <Typography>Serial Number: {serialNumber}</Typography>
//                 <Typography>Description: {description}</Typography>
//                 <Typography>Brand: {brand}</Typography>
//               </Box>
//             </Box>

//             <Typography variant="h5" align="center" gutterBottom>Product History</Typography>
//             {history.length === 0 ? (
//               <Typography align="center">No history found.</Typography>
//             ) : (
//               history.map((item, index) => (
//                 <Box key={index} sx={{ mb: 2 }}>
//                   <Typography><strong>Actor:</strong> {item.actor}</Typography>
//                   <Typography><strong>Location:</strong> {item.location}</Typography>
//                   <Typography><strong>Timestamp:</strong> {dayjs(item.timestamp * 1000).format('DD MMM YYYY - hh:mm A')}</Typography>
//                 </Box>
//               ))
//             )}

//             <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//               Product Sold: <strong>{isSold ? 'Yes' : 'No'}</strong>
//             </Typography>

//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//               <Button variant="contained" onClick={handleBack}>Back</Button>
//             </Box>
//           </>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default AuthenticProduct;

// import { Box, Paper, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ethers } from 'ethers';
// import abi from '../../utils/Truemark.json';
// const CONTRACT_ADDRESS = '0x67333426207CaFD285E178163c43c600127BBEb7';

// const getEthereumObject = () => window.ethereum;

// const findMetaMaskAccount = async () => {
//     try {
//         const ethereum = getEthereumObject();
//         if (!ethereum) return null;
//         const accounts = await ethereum.request({ method: "eth_accounts" });
//         return accounts.length > 0 ? accounts[0] : null;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

// const AuthenticProduct = () => {
//     const [currentAccount, setCurrentAccount] = useState("");
//     const [isAuthentic, setIsAuthentic] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [errorMessage, setErrorMessage] = useState("");

//     const navigate = useNavigate();
//     const location = useLocation();
//     const qrData = location.state?.qrData;

//     useEffect(() => {
//         const checkProductAuthenticity = async () => {
//             try {
//                 const provider = new ethers.providers.Web3Provider(window.ethereum);
//                 const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);

//                 // Split qrData (e.g., "address,serialNumber")
//                 const serialNumber = qrData.split(',')[1].trim();
//                 console.log("✅ Serial Number extracted:", serialNumber);

//                 const product = await contract.getProduct(serialNumber);
//                 console.log("📦 Product returned:", product);

//                 if (product[0] !== '') {
//                     setIsAuthentic(true);
//                     setErrorMessage("");
//                 } else {
//                     setIsAuthentic(false);
//                     setErrorMessage("Product not found in blockchain database.");
//                 }
//             } catch (err) {
//                 // Handle specific blockchain errors more gracefully
//                 if (err.reason === "Product not found" || err.message.includes("Product not found")) {
//                     console.log("ℹ️ Product not found in blockchain");
//                     setIsAuthentic(false);
//                     setErrorMessage("This product is not registered in our blockchain database.");
//                 } else if (err.code === "CALL_EXCEPTION") {
//                     console.log("ℹ️ Blockchain call failed - product likely not found");
//                     setIsAuthentic(false);
//                     setErrorMessage("Unable to verify product authenticity.");
//                 } else {
//                     // Only log unexpected errors in development
//                     if (process.env.NODE_ENV === 'development') {
//                         console.error("❌ Unexpected error checking product:", err);
//                     }
//                     setIsAuthentic(false);
//                     setErrorMessage("Verification failed. Please try again.");
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (qrData) {
//             checkProductAuthenticity();
//         } else {
//             setLoading(false);
//             setIsAuthentic(false);
//             setErrorMessage("No product data found to verify.");
//         }
//     }, [qrData]);

//     const connectWallet = async () => {
//         try {
//             const ethereum = getEthereumObject();
//             if (!ethereum) return alert("Please install MetaMask");

//             const accounts = await ethereum.request({ method: "eth_requestAccounts" });
//             setCurrentAccount(accounts[0]);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         if (currentAccount && isAuthentic) {
//             navigate('/product', { state: { qrData } });
//         }
//     }, [currentAccount, isAuthentic]);

//     if (loading) {
//         return (
//             <Box sx={{ textAlign: "center", mt: 10 }}>
//                 <Typography variant="h6">Checking product authenticity...</Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{
//             backgroundImage: `url(${bgImg})`,
//             minHeight: "80vh",
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             zIndex: -2,
//             overflowY: "scroll",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center"
//         }}>
//             <Paper elevation={3} sx={{ width: "400px", p: 4, backgroundColor: "#e3eefc" }}>
//                 {isAuthentic ? (
//                     <>
//                         <Typography variant="h4" textAlign="center">Congrats!</Typography>
//                         <Typography variant="h5" textAlign="center" mt={2}>Your Product is Authentic</Typography>
//                         <Typography variant="body2" textAlign="center" mt={4}>
//                             Connect Your Wallet to View Product Details
//                         </Typography>
//                         <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={connectWallet}>
//                             Connect Wallet
//                         </Button>
//                     </>
//                 ) : (
//                     <>
//                         <Typography variant="h4" textAlign="center" color="error">Warning</Typography>
//                         <Typography variant="h6" textAlign="center" mt={2}>This Product is NOT Authentic</Typography>
//                         <Typography variant="body2" textAlign="center" mt={2}>
//                             {errorMessage || "The scanned serial number was not found on blockchain."}
//                         </Typography>
//                     </>
//                 )}
//             </Paper>
//         </Box>
//     );
// };

// export default AuthenticProduct;

import { Box, Paper, Typography, Button } from "@mui/material";
import bgImg from "../../img/bg.png";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ethers } from "ethers";
import abi from "../../utils/Truemark.json";

const CONTRACT_ADDRESS = "0xff640E131188aAf6E898a53E7969054327c7A5aA";

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();
    if (!ethereum) return null;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const AuthenticProduct = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isAuthentic, setIsAuthentic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const qrData = location.state?.qrData;

  useEffect(() => {
    const checkProductAuthenticity = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          abi.abi,
          provider
        );

        // ✅ Extract just the serial number from QR data
        const match = qrData?.match(/"serialNumber"\s*:\s*"(\d+)"/);
        const serialNumber = match ? match[1] : null;

        if (!serialNumber) {
          console.error("❌ Could not extract serial number from QR code.");
          setErrorMessage("Invalid QR code format. Serial number missing.");
          setIsAuthentic(false);
          setLoading(false);
          return;
        }

        console.log("✅ Clean Serial Number extracted:", serialNumber);

        // ✅ Call smart contract
        const product = await contract.getProduct(serialNumber);
        console.log("📦 Product returned:", product);

        if (product[0] !== "") {
          setIsAuthentic(true);
          setErrorMessage("");
        } else {
          setIsAuthentic(false);
          setErrorMessage("Product not found in blockchain database.");
        }
      } catch (err) {
        if (
          err.reason === "Product not found" ||
          err.message.includes("Product not found")
        ) {
          console.log("ℹ️ Product not found in blockchain");
          setIsAuthentic(false);
          setErrorMessage(
            "This product is not registered in our blockchain database."
          );
        } else if (err.code === "CALL_EXCEPTION") {
          console.log("ℹ️ Blockchain call failed - product likely not found");
          setIsAuthentic(false);
          setErrorMessage("Unable to verify product authenticity.");
        } else {
          console.error("❌ Unexpected error checking product:", err);
          setIsAuthentic(false);
          setErrorMessage("Verification failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (qrData) {
      checkProductAuthenticity();
    } else {
      setLoading(false);
      setIsAuthentic(false);
      setErrorMessage("No product data found to verify.");
    }
  }, [qrData]);

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentAccount && isAuthentic) {
      // ✅ Navigate to product page with the same QR data
      navigate("/product", { state: { qrData } });
    }
  }, [currentAccount, isAuthentic]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6">Checking product authenticity...</Typography>
      </Box>
    );
  }
  const handleBack = () => {
    navigate(-1);
  };

// If not authentic, redirect to /fakeproduct instead of showing warning UI
if (!loading && isAuthentic === false) {
    navigate("/fake-product", { state: { qrData, errorMessage } });
    return null;
}
/*
    // Previous warning UI (now replaced by redirect above):
    // {isAuthentic === false && (
    //   <>
    //     <Typography variant="h4" textAlign="center" color="error">Warning</Typography>
    //     <Typography variant="h6" textAlign="center" mt={2}>This Product is NOT Authentic</Typography>
    //     <Typography variant="body2" textAlign="center" mt={2}>
    //       {errorMessage || "The scanned serial number was not found on blockchain."}
    //     </Typography>
    //   </>
    // )}
*/
return (
    <Box
        sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "80vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            zIndex: -2,
            overflowY: "scroll",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Paper
            elevation={3}
            sx={{ width: "400px", p: 4, backgroundColor: "#e3eefc" }}
        >
            {isAuthentic ? (
                <>
                    <Typography variant="h4" textAlign="center">
                        Congrats!
                    </Typography>
                    <Typography variant="h5" textAlign="center" mt={2}>
                        Your Product is Authentic
                    </Typography>
                    <Typography variant="body2" textAlign="center" mt={4}>
                        Connect Your Wallet to View Product Details
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={connectWallet}
                    >
                        Connect Wallet
                    </Button>
                </>
            ) : null}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 1 }}>
                <Button variant="contained" onClick={handleBack}>
                    Back
                </Button>
            </Box>
        </Paper>
    </Box>
);
};

export default AuthenticProduct;
