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
import { Box, Paper, Typography, Button } from '@mui/material';
import bgImg from '../../img/bg.png';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import abi from '../../utils/Truemark.json';
const CONTRACT_ADDRESS = '0xF89Dd0FF002179340542D03FfFd7CcBaa4972Ae6'; // ✅ Replace with your actual deployed address

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

    const navigate = useNavigate();
    const location = useLocation();
    const qrData = location.state?.qrData;

    // useEffect(() => {
    //     const checkProductAuthenticity = async () => {
    //         try {
    //             const provider = new ethers.providers.Web3Provider(window.ethereum);
    //             const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);

    //             const product = await contract.getProduct(qrData);
    //             if (product[0] !== '') {
    //                 setIsAuthentic(true);
    //             } else {
    //                 setIsAuthentic(false);
    //             }
    //         } catch (err) {
    //             console.error("Error checking product:", err);
    //             setIsAuthentic(false);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (qrData) {
    //         checkProductAuthenticity();
    //     } else {
    //         setLoading(false);
    //         setIsAuthentic(false);
    //     }
    // }, [qrData]);

    useEffect(() => {
        const checkProductAuthenticity = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, provider);
        
                // Split qrData (e.g., "address,serialNumber")
                const serialNumber = qrData.split(',')[1].trim();  // This will give "stylo1"
                console.log("✅ Serial Number extracted:", serialNumber);
        
                const product = await contract.getProduct(serialNumber);
                console.log("📦 Product returned:", product);
        
                if (product[0] !== '') {
                    setIsAuthentic(true);
                } else {
                    setIsAuthentic(false);
                }
            } catch (err) {
                console.error("❌ Error checking product:", err);
                setIsAuthentic(false);
            } finally {
                setLoading(false);
            }
        };
        
    
        if (qrData) {
            checkProductAuthenticity();
        } else {
            setLoading(false);
            setIsAuthentic(false);
        }
    }, [qrData]);
    
    const connectWallet = async () => {
        try {
            const ethereum = getEthereumObject();
            if (!ethereum) return alert("Please install MetaMask");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (currentAccount && isAuthentic) {
            navigate('/product', { state: { qrData } });
        }
    }, [currentAccount, isAuthentic]);

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", mt: 10 }}>
                <Typography variant="h6">Checking product authenticity...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "80vh",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -2,
            overflowY: "scroll",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Paper elevation={3} sx={{ width: "400px", p: 4, backgroundColor: "#e3eefc" }}>
                {isAuthentic ? (
                    <>
                        <Typography variant="h4" textAlign="center">Congrats!</Typography>
                        <Typography variant="h5" textAlign="center" mt={2}>Your Product is Authentic</Typography>
                        <Typography variant="body2" textAlign="center" mt={4}>
                            Connect Your Wallet to View Product Details
                        </Typography>
                        <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={connectWallet}>
                            Connect Wallet
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h4" textAlign="center" color="error">Warning</Typography>
                        <Typography variant="h6" textAlign="center" mt={2}>This Product is NOT Authentic</Typography>
                        <Typography variant="body2" textAlign="center" mt={2}>
                            The scanned serial number was not found on blockchain.
                        </Typography>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default AuthenticProduct;


// import { Box, Paper, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ethers } from 'ethers';
// import abi from '../../utils/Truemark.json';
// import forge from 'node-forge';

// const CONTRACT_ADDRESS = '0x711b5d39B9054acD73677c90980754db004adAbD';

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
//             if (!ethereum) return alert("Please install MetaMask");

//             const accounts = await ethereum.request({ method: "eth_requestAccounts" });
//             setCurrentAccount(accounts[0]);
//         } catch (error) {
//             console.error(error);
//         }
//     };

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
//                 <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={connectWallet}>
//                     Connect Wallet
//                 </Button>
//             </Paper>
//         </Box>
//     );
// };

// export default AuthenticProduct;

