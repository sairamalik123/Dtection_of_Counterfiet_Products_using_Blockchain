

//correct code but location not show manuf

// import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import Timeline from '@mui/lab/Timeline';
// import TimelineItem from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';
// import TimelineDot from '@mui/lab/TimelineDot';
// import TimelineOppositeContent, {
//     timelineOppositeContentClasses,
// } from '@mui/lab/TimelineOppositeContent';
// import dayjs from 'dayjs';
// import { useLocation, useNavigate } from 'react-router-dom';
// import abi from '../../utils/Truemark.json';
// import { useEffect, useState } from 'react';
// import useAuth from '../../hooks/useAuth';
// import { ethers } from "ethers";

// const getEthereumObject = () => window.ethereum;

// const findMetaMaskAccount = async () => {
//     try {
//         const ethereum = getEthereumObject();
//         if (!ethereum) {
//             console.error("Make sure you have Metamask!");
//             return null;
//         }

//         const accounts = await ethereum.request({ method: "eth_accounts" });

//         if (accounts.length !== 0) {
//             return accounts[0];
//         } else {
//             console.error("No authorized account found");
//             return null;
//         }
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

// const UpdateProduct = () => {
//     const [currentAccount, setCurrentAccount] = useState("");
//     const [serialNumber, setSerialNumber] = useState("");
//     const [name, setName] = useState("");
//     const [brand, setBrand] = useState("");
//     const [description, setDescription] = useState("");
//     const [imageName, setImageName] = useState("");
//     const [history, setHistory] = useState([]);
//     const [isSold, setIsSold] = useState(false);
//     const [image, setImage] = useState({ file: [], filepreview: null });
//     const [loading, setLoading] = useState(true); // boolean loading state

//     const CONTRACT_ADDRESS = '0x67333426207CaFD285E178163c43c600127BBEb7';
//     const CONTRACT_ABI = abi.abi;

//     const { auth } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const qrData = location.state?.qrData;

//     useEffect(() => {
//         findMetaMaskAccount().then((account) => {
//             if (account !== null) {
//                 setCurrentAccount(account);
//             }
//         });

//         if (qrData) {
//             handleScan(qrData);
//         }
//     }, [qrData]);

//     const getImage = async (imageName) => {
//         setImage(prevState => ({
//             ...prevState,
//             filepreview: `http://localhost:5000/file/product/${imageName}`
//         }));
//     };

//     const handleScan = async (qrData) => {
//         setLoading(true); // Start loading
//         const data = qrData.split(",");
//         const contractAddress = data[0];
//         setSerialNumber(data[1]);

//         if (contractAddress === CONTRACT_ADDRESS) {
//             try {
//                 const { ethereum } = window;

//                 if (ethereum) {
//                     const provider = new ethers.providers.Web3Provider(ethereum);
//                     const signer = provider.getSigner();
//                     const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//                     const product = await productContract.getProduct(data[1].toString());
//                     console.log("Retrieved product...", product);

//                     setData(product);
//                 } else {
//                     alert("Ethereum object doesn't exist! Please connect your wallet.");
//                 }
//             } catch (error) {
//                 console.error(error);
//             } finally {
//                 setLoading(false); // Done loading
//             }
//         } else {
//             setLoading(false); // Invalid contract
//         }
//     };

// const setData = (product) => {
//     console.log("product data: ", product);

//     // Make sure you see the structure of the product
//     const name = product[1];
//     const brand = product[2];
//     const description = product[3];
//     const imageName = product[4];
//     const historyData = product[6];

//     if (name && brand && description && imageName) {
//         setName(name.toString());
//         setBrand(brand.toString());
//         setDescription(description.toString().replace(/;/g, ","));
//         getImage(imageName.toString());
//     } else {
//         console.warn("Some product data fields are missing!");
//     }

//     // Handle history
//     const hist = historyData.map((entry) => {
//         const actor = entry[1] || "Unknown Actor";
//         let location = "Location not available";
//         if (entry[2]) {
//             const formattedLocation = entry[2].replace(/;/g, ",").trim();
//             if (
//                 formattedLocation &&
//                 !formattedLocation.toLowerCase().includes("undefined") &&
//                 formattedLocation !== ", ,"
//             ) {
//                 location = formattedLocation;
//             }
//         }

//         const timestamp = entry[3] ? parseInt(entry[3].toString()) : 0;
//         const sold = entry[4] === "true";

//         if (sold) setIsSold(true);

//         return { actor, location, timestamp, isSold: sold };
//     });

//     setHistory(hist);
// };

//     // const setData = (product) => {
//     //     console.log("product data: ", product);

//     //     setName(product[1]);
//     //     setBrand(product[2]);
//     //     setDescription(product[3].replace(/;/g, ","));
//     //     getImage(product[4]);

//     //     const historyData = product[5];

//     //     const hist = historyData.map((entry) => {
//     //         const actor = entry[1] || "Unknown Actor";
//     //         const location = entry[2] && entry[2] !== "undefined, undefined, undefined"
//     //             ? entry[2].replace(/;/g, ",")
//     //             : "Location not available";
//     //         const timestamp = entry[3] || 0;
//     //         const sold = entry[4] === "true";

//     //         if (sold) setIsSold(true);

//     //         return { actor, location, timestamp, isSold: sold };
//     //     });

//     //     setHistory(hist);
//     // };

//     const getHistory = () => {
//         return history.map((item, index) => {
//             const date = dayjs(item.timestamp * 1000).format('MM/DD/YYYY');
//             const time = dayjs(item.timestamp * 1000).format('HH:mm a');

//             return (
//                 <TimelineItem key={index}>
//                     <TimelineOppositeContent color="textSecondary">
//                         {time} {date}
//                     </TimelineOppositeContent>
//                     <TimelineSeparator>
//                         <TimelineDot />
//                         <TimelineConnector />
//                     </TimelineSeparator>
//                     <TimelineContent sx={{ py: '12px', px: 2 }}>
//                         <Typography>Location: {item.location}</Typography>
//                         <Typography>Actor: {item.actor}</Typography>
//                     </TimelineContent>
//                 </TimelineItem>
//             );
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         navigate('/update-product-details', { state: { qrData } });
//     };

//     const handleBack = () => {
//         navigate(-1);
//     };

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
//             {loading ? (
//                 <Typography align="center" sx={{ mt: 10 }} variant="h6">
//                     Loading product details...
//                 </Typography>
//             ) : (
//                 <Paper elevation={3} sx={{ width: "400px", margin: "auto", marginTop: "10%", marginBottom: "10%", padding: "3%", backgroundColor: "#e3eefc" }}>
//                     <Box sx={{ textAlign: "center", marginBottom: "5%" }}>
//                         <Typography variant="h2" sx={{ fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem" }}>
//                             Product Details
//                         </Typography>

//                         <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '5%', marginBottom: '5%' }}>
//                             <Box sx={{ flex: '0 0 35%' }}>
//                                 <Avatar
//                                     alt={name}
//                                     src={image.filepreview}
//                                     sx={{
//                                         width: 100,
//                                         height: 100,
//                                         margin: "auto",
//                                         marginBottom: "3%",
//                                         backgroundColor: "#3f51b5"
//                                     }}
//                                 >
//                                     {name[0] || "P"}
//                                 </Avatar>
//                             </Box>
//                             <Box sx={{ flex: '0 0 65%' }}>
//                                 <Typography variant="body1">Name: {name || "Not loaded"}</Typography>
// <Typography variant="body2">Brand: {brand || "Not loaded"}</Typography>
// <Typography variant="body2">Description: {description || "Not loaded"}</Typography>
//                                 <Typography variant="body2">Serial Number: {serialNumber || "Not loaded"}</Typography>
//                             </Box>
//                         </Box>

//                         <Timeline sx={{ [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.2 } }}>
//                             {getHistory()}
//                             <TimelineItem>
//                                 <TimelineOppositeContent color="textSecondary">
//                                     {dayjs().format('HH:mm a')} {dayjs().format('MM/DD/YYYY')}
//                                 </TimelineOppositeContent>
//                                 <TimelineSeparator>
//                                     <TimelineDot />
//                                 </TimelineSeparator>
//                                 <TimelineContent sx={{ py: '12px', px: 2 }}>
//                                     <Typography>IsSold: {isSold.toString()}</Typography>
//                                 </TimelineContent>
//                             </TimelineItem>
//                         </Timeline>

//                         <Button
//                             variant="contained"
//                             sx={{ width: "50%", marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
//                             onClick={handleSubmit}
//                         >
//                             Update Product
//                         </Button>

//                         <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//                             <Button onClick={handleBack} sx={{ marginTop: "5%" }}>
//                                 Back
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Paper>
//             )}
//         </Box>
//     );
// };

// export default UpdateProduct;


import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
import bgImg from '../../img/bg.png';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import dayjs from 'dayjs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import abi from '../../utils/Truemark.json';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { ethers } from "ethers";

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
    try {
        const ethereum = getEthereumObject();
        if (!ethereum) {
            console.error("Make sure you have Metamask!");
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

const UpdateProduct = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [imageName, setImageName] = useState("");
    const [history, setHistory] = useState([]);
    const [isSold, setIsSold] = useState(false);
    const [image, setImage] = useState({ file: [], filepreview: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const CONTRACT_ADDRESS = '0xff640E131188aAf6E898a53E7969054327c7A5aA';
    const CONTRACT_ABI = abi.abi;

    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    
    const qrData = location.state?.qrData;
    const urlSerialNumber = params.serialNumber;

    useEffect(() => {
        findMetaMaskAccount().then((account) => {
            if (account !== null) {
                setCurrentAccount(account);
            }
        });

        // Handle both QR scan and direct URL access
        if (qrData) {
            handleScan(qrData);
        } else if (urlSerialNumber) {
            handleDirectAccess(urlSerialNumber);
        }
    }, [qrData, urlSerialNumber]);

    const getImage = async (imageName) => {
        if (imageName && imageName !== '') {
            setImage(prevState => ({
                ...prevState,
                filepreview: `http://localhost:5000/file/product/${imageName}`
            }));
        }
    };

    // Helper function to clean serial number
    const cleanSerialNumber = (serial) => {
        if (!serial) return '';
        
        let cleaned = serial.toString();
        
        // Remove quotes
        cleaned = cleaned.replace(/['"]/g, '');
        
        // Remove "serialNumber:" prefix if present
        cleaned = cleaned.replace(/serialNumber:/gi, '');
        
        // Remove contract address if accidentally included
        if (cleaned.includes('0xff640E131188aAf6E898a53E7969054327c7A5aA')) {
            cleaned = cleaned.replace('0xff640E131188aAf6E898a53E7969054327c7A5aA', '').replace(/[,\-_]/g, '');
        }
        
        // Trim whitespace
        cleaned = cleaned.trim();
        
        return cleaned;
    };

    const handleDirectAccess = async (serial) => {
        setLoading(true);
        setError('');
        
        const cleanSerial = cleanSerialNumber(serial);
        setSerialNumber(cleanSerial);
        
        try {
            const { ethereum } = window;
            if (!ethereum) {
                throw new Error("MetaMask not found. Please install MetaMask.");
            }

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            console.log("Fetching product with serial:", cleanSerial);
            const product = await productContract.getProduct(cleanSerial);
            console.log("Retrieved product:", product);

            setData(product);
        } catch (error) {
            console.error("Direct access error:", error);
            setError(`Failed to load product: ${error.message}`);
            setLoading(false);
        }
    };

    const handleScan = async (qrData) => {
        setLoading(true);
        setError('');
        
        try {
            let serial = null;
            let contractAddress = null;

            console.log("QR Data received:", qrData);

            // Handle QR data with digital verification
            if (typeof qrData === 'string') {
                try {
                    // Try to parse as JSON first (for digital verification format)
                    const parsed = JSON.parse(qrData);
                    console.log('Parsed QR JSON:', parsed);
                    
                    if (parsed.contract && parsed.serialNumber && parsed.signature) {
                        // Digital verification format
                        contractAddress = parsed.contract;
                        serial = parsed.serialNumber;
                        console.log('Digital verification QR detected');
                    } else if (parsed.serialNumber) {
                        serial = parsed.serialNumber;
                        contractAddress = CONTRACT_ADDRESS; // Assume correct contract
                    } else {
                        throw new Error("Invalid QR JSON format");
                    }
                } catch (parseError) {
                    // Try comma-separated format
                    if (qrData.includes(',')) {
                        const data = qrData.split(',');
                        if (data.length >= 2) {
                            contractAddress = data[0];
                            serial = data[1];
                        } else {
                            throw new Error("Invalid comma-separated format");
                        }
                    } else {
                        // Use as direct serial
                        serial = qrData;
                        contractAddress = CONTRACT_ADDRESS;
                    }
                }
            } else if (typeof qrData === 'object') {
                if (qrData.serialNumber) {
                    serial = qrData.serialNumber;
                    contractAddress = qrData.contract || CONTRACT_ADDRESS;
                }
            }

            if (!serial) {
                throw new Error("Serial number not found in QR code");
            }

            // Clean serial number
            const cleanSerial = cleanSerialNumber(serial);
            console.log("Clean serial:", cleanSerial);
            setSerialNumber(cleanSerial);

            // Verify contract address
            if (contractAddress && contractAddress.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) {
                throw new Error("Invalid contract address in QR code");
            }

            const { ethereum } = window;
            if (!ethereum) {
                throw new Error("MetaMask not found. Please install MetaMask.");
            }

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            console.log("Fetching product with serial:", cleanSerial);
            const product = await productContract.getProduct(cleanSerial);
            console.log("Retrieved product:", product);

            setData(product);
        } catch (error) {
            console.error("QR scan error:", error);
            setError(`Failed to scan QR: ${error.message}`);
            setLoading(false);
        }
    };

    const setData = (product) => {
        try {
            console.log("Setting product data:", product);

            // Check if product exists
            if (!product || product.length === 0) {
                throw new Error("Product not found or empty");
            }

            // Based on your smart contract return order:
            // 0: serialRet, 1: nameRet, 2: brandRet, 3: descriptionRet, 
            // 4: imageRet, 5: manufacturerRet, 6: historyRet
            
            const serialRet = product[0] || '';
            const nameRet = product[1] || '';
            const brandRet = product[2] || '';
            const descriptionRet = product[3] || '';
            const imageRet = product[4] || '';
            const manufacturerRet = product[5] || '';
            const historyRet = product[6] || [];

            console.log("Extracted data:", {
                serial: serialRet,
                name: nameRet,
                brand: brandRet,
                description: descriptionRet,
                image: imageRet,
                manufacturer: manufacturerRet,
                historyLength: historyRet.length
            });

            // Set basic data
            if (nameRet) setName(nameRet.toString());
            if (brandRet) setBrand(brandRet.toString());
            if (descriptionRet) {
                setDescription(descriptionRet.toString().replace(/;/g, ","));
            }
            if (imageRet) {
                setImageName(imageRet.toString());
                getImage(imageRet.toString());
            }

            // Handle history
            if (historyRet && Array.isArray(historyRet) && historyRet.length > 0) {
                console.log("Processing history:", historyRet);
                
                const hist = historyRet.map((entry, index) => {
                    console.log(`History entry ${index}:`, entry);
                    
                    // Handle different possible structures
                    let actor, location, timestamp, sold;
                    
                    if (entry.actor !== undefined) {
                        // Struct with named properties
                        actor = entry.actor || "Unknown Actor";
                        location = entry.location || "Location not available";
                        timestamp = entry.timestamp || 0;
                        sold = entry.isSold || false;
                    } else if (Array.isArray(entry)) {
                        // Array format
                        actor = entry[1] || "Unknown Actor";
                        location = entry[2] || "Location not available";
                        timestamp = entry[3] || 0;
                        sold = entry[4] === true || entry[4] === "true";
                    } else {
                        // Fallback
                        actor = "Unknown Actor";
                        location = "Location not available";
                        timestamp = 0;
                        sold = false;
                    }

                    // Clean location
                    if (location && typeof location === 'string') {
                        location = location.replace(/;/g, ",").trim();
                        if (location.toLowerCase().includes("undefined") || location === ", ,") {
                            location = "Location not available";
                        }
                    }

                    // Convert timestamp
                    const numTimestamp = parseInt(timestamp.toString()) || 0;

                    if (sold) setIsSold(true);

                    return { 
                        actor: actor.toString(), 
                        location: location.toString(), 
                        timestamp: numTimestamp, 
                        isSold: sold 
                    };
                });

                console.log("Processed history:", hist);
                setHistory(hist);
            } else {
                console.log("No history data available");
                setHistory([]);
            }

            setLoading(false);
            setError('');
        } catch (error) {
            console.error("Error setting data:", error);
            setError(`Error processing product data: ${error.message}`);
            setLoading(false);
        }
    };

    const getHistory = () => {
        return history.map((item, index) => {
            const date = item.timestamp > 0 ? dayjs(item.timestamp * 1000).format('MM/DD/YYYY') : 'Unknown Date';
            const time = item.timestamp > 0 ? dayjs(item.timestamp * 1000).format('HH:mm a') : 'Unknown Time';

            return (
                <TimelineItem key={index}>
                    <TimelineOppositeContent color="textSecondary">
                        {time} {date}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        {index !== history.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography>Location: {item.location}</Typography>
                        <Typography>Actor: {item.actor}</Typography>
                    </TimelineContent>
                </TimelineItem>
            );
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Pass clean serial number to update details page
    //     navigate('/update-product-details', { 
    //         state: { 
    //             serialNumber: serialNumber,
    //             productData: {
    //                 name,
    //                 brand,
    //                 description,
    //                 imageName,
    //                 history,
    //                 isSold
    //             }
    //         }
    //     });
    // };


    // Fix for UpdateProduct.jsx - Update the handleSubmit function

const handleSubmit = (e) => {
    e.preventDefault();
    
    // Debug logs
    console.log("Navigating with data:", {
        serialNumber: serialNumber,
        productData: {
            name,
            brand,
            description,
            imageName,
            history,
            isSold
        }
    });
    
    // Ensure we have required data
    if (!serialNumber) {
        setError("Serial number is required to update product");
        return;
    }
    
    // Pass clean serial number and all product data to update details page
    navigate('/update-product-details', { 
        state: { 
            serialNumber: serialNumber.toString().trim(),
            productData: {
                name: name || '',
                brand: brand || '',
                description: description || '',
                imageName: imageName || '',
                history: history || [],
                isSold: isSold || false
            },
            // Also pass QR data if available for debugging
            originalQrData: qrData || urlSerialNumber
        }
    });
};
    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <Box sx={{
                backgroundImage: `url(${bgImg})`,
                minHeight: "100vh",
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
                    Loading product details...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{
                backgroundImage: `url(${bgImg})`,
                minHeight: "100vh",
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, textAlign: 'center' }}>
                    <Typography variant="h6" color="error" gutterBottom>
                        Error Loading Product
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                    <Button variant="contained" onClick={handleBack}>
                        Go Back
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "100vh",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            paddingTop: "5%",
            paddingBottom: "5%"
        }}>
            <Paper elevation={3} sx={{ 
                width: "400px", 
                margin: "auto", 
                padding: "3%", 
                backgroundColor: "#e3eefc" 
            }}>
                <Box sx={{ textAlign: "center", marginBottom: "5%" }}>
                    <Typography variant="h2" sx={{ 
                        fontFamily: 'Gambetta', 
                        fontWeight: "bold", 
                        fontSize: "2.5rem" 
                    }}>
                        Product Details
                    </Typography>

                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        marginTop: '5%', 
                        marginBottom: '5%' 
                    }}>
                        <Box sx={{ flex: '0 0 35%' }}>
                            <Avatar
                                alt={name}
                                src={image.filepreview}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    margin: "auto",
                                    marginBottom: "3%",
                                    backgroundColor: "#3f51b5"
                                }}
                            >
                                {name ? name[0].toUpperCase() : "P"}
                            </Avatar>
                        </Box>
                        <Box sx={{ flex: '0 0 65%' }}>
                            <Typography variant="body1">
                                Name: {name || "Not loaded"}
                            </Typography>
                            <Typography variant="body2">
                                Brand: {brand || "Not loaded"}
                            </Typography>
                            <Typography variant="body2">
                                Description: {description || "Not loaded"}
                            </Typography>
                            <Typography variant="body2">
                                Serial Number: {serialNumber || "Not loaded"}
                            </Typography>
                        </Box>
                    </Box>

                    <Timeline sx={{ 
                        [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.2 } 
                    }}>
                        {getHistory()}
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                {dayjs().format('HH:mm a')} {dayjs().format('MM/DD/YYYY')}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography>IsSold: {isSold.toString()}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>

                    <Button
                        variant="contained"
                        sx={{ 
                            width: "50%", 
                            marginTop: "3%", 
                            backgroundColor: '#98b5d5', 
                            '&:hover': { backgroundColor: '#618dbd' } 
                        }}
                        onClick={handleSubmit}
                    >
                        Update Product
                    </Button>

                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleBack} sx={{ marginTop: "5%" }}>
                            Back
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default UpdateProduct;