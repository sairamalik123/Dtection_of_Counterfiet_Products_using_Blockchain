// import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import QrScanner from '../QrScanner';
// import { useEffect, useState } from 'react';
// import useAuth from '../../hooks/useAuth';
// import { useLocation, useNavigate } from 'react-router-dom';

// const ScannerPage = () => {
//     const CONTRACT_ADDRESS  = '0x3d4c9606DC06741181D7c37207C4c11020931FcA';
//     const [qrData, setQrData] = useState('');

//     const { auth } = useAuth();
//     const navigate = useNavigate();
    
//     const passData = (data) => {
//         setQrData(data);
//         console.log("qrdata 1: ", qrData);
//       };

//     useEffect(() => {
//         console.log("auth: ", auth);
//         console.log("qrdata 2: ", qrData);

//         const arr = qrData.split(",");
//         const contractAddress = arr[0];

//         if(contractAddress){
//             if (contractAddress == CONTRACT_ADDRESS) {
//                 if (auth.role === "supplier" || auth.role === "retailer") {
//                     navRole();
//                 } else {
//                     navUser();
//                 }
//             } 
            
//             else {
//                 navFakeProduct();
//             }

//         }


//     }, [qrData]);

//     const navRole = () => {
//         navigate('/update-product', { state: { qrData }});

//     }

//     const navUser = () => {
//         navigate('/authentic-product', { state: { qrData }});
//     }

//     const navFakeProduct = () => {
//         navigate('/fake-product');
//     }

//     const handleBack = () => {
//         navigate(-1)
//     }

//     return (

//         <Box sx={{
//             backgroundImage: `url(${bgImg})`,
//             maxHeight: "100vh",
//             backgroundRepeat: "no-repeat",
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
//             <Paper elevation={3} sx={{ width: "350px", margin: "auto", marginTop: "3%", padding: "3%", backgroundColor: "#e3eefc" }}>

//                 <Box
//                     sx={{
//                         textAlign: "center", marginBottom: "0%",
//                     }}
//                 >

//                     <Typography
//                         variant="h2"
//                         sx={{
//                             textAlign: "center", marginBottom: "3%",
//                             fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
//                         }}
//                     >
//                         Scan QR Code</Typography>

//                     <QrScanner passData={passData}/>

//                     <Box
//                         sx={{
//                             width: "100%",
//                             display: "flex",
//                             justifyContent: "center",
//                         }}
//                     >


//                         <Button
//                             onClick={handleBack}
//                             sx={{
//                                 marginTop: "2%",
//                                 fontWeight: "bold",

//                             }}
//                         >
//                             Back
//                         </Button>

//                     </Box>    


//                 </Box>
//             </Paper>
//         </Box>
//     )
// }

// export default ScannerPage;

//before encryption stage
import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
import bgImg from '../../img/bg.png';
import QrScanner from '../QrScanner';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const ScannerPage = () => {
    const CONTRACT_ADDRESS  = '0xF89Dd0FF002179340542D03FfFd7CcBaa4972Ae6';
    const [qrData, setQrData] = useState('');

    const { auth } = useAuth();
    const navigate = useNavigate();
    
    const passData = (data) => {
        setQrData(data);
        console.log("qrdata 1: ", qrData);
      };

    useEffect(() => {
        console.log("auth: ", auth);
        console.log("qrdata 2: ", qrData);

        const arr = qrData.split(",");
        const contractAddress = arr[0];

        if(contractAddress){
            if (contractAddress == CONTRACT_ADDRESS) {
                if (auth.role === "supplier" || auth.role === "retailer") {
                    navRole();
                } else {
                    navUser();
                }
            } 
            
            else {
                navFakeProduct();
            }

        }


    }, [qrData]);

    const navRole = () => {
        navigate('/update-product', { state: { qrData }});

    }

    const navUser = () => {
        navigate('/authentic-product', { state: { qrData }});
    }

    const navFakeProduct = () => {
        navigate('/fake-product');
    }

    const handleBack = () => {
        navigate(-1)
    }

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
            backgroundRepeat: 'no-repeat',
            zIndex: -2,
            overflowY: "scroll"
        }}>
            <Paper elevation={3} sx={{ width: "400px", margin: "auto", marginTop: "10%", marginBottom: "10%", padding: "3%", backgroundColor: "#e3eefc" }}>

                <Box
                    sx={{
                        textAlign: "center", marginBottom: "5%",
                    }}
                >

                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: "center", marginBottom: "3%",
                            fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
                        }}
                    >
                        Scan QR Code</Typography>

                    <QrScanner passData={passData}/>

                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >


                        <Button
                            onClick={handleBack}
                            sx={{
                                marginTop: "5%",
                            }}
                        >
                            Back
                        </Button>

                    </Box>    


                </Box>
            </Paper>
        </Box>
    )
}

export default ScannerPage;


//after encryption stage
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
//   const [isAuthentic, setIsAuthentic] = useState(null);
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   const passData = (data) => {
//     setQrData(data);
//   };

//   useEffect(() => {
//     const verifyQR = async () => {
//       try {
//         if (!qrData) return;

//         const parsed = JSON.parse(qrData);
//         const { contract, serialNumber, signature } = parsed;

//         // Connect to smart contract
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const contractInstance = new ethers.Contract(contract, abi.abi, provider);

//         const product = await contractInstance.getProduct(serialNumber);
//         const publicKeyPem = product.publicKey;

//         // Verify signature
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
//       } catch (error) {
//         console.error('Verification failed:', error);
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
