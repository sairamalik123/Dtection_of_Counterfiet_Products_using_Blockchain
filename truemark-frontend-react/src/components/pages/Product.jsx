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
// import { ethers } from "ethers";


// const getEthereumObject = () => window.ethereum;

// /*
//  * This function returns the first linked account found.
//  * If there is no account linked, it will return null.
//  */
// const findMetaMaskAccount = async () => {
//     try {
//         const ethereum = getEthereumObject();

//         /*
//         * First make sure we have access to the Ethereum object.
//         */
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



// const Product = () => {
//     const [currentAccount, setCurrentAccount] = useState("");

//     const [serialNumber, setSerialNumber] = useState("");
//     const [productData, setProductData] = useState("");

//     const [name, setName] = useState("P");
//     const [brand, setBrand] = useState("");
//     const [description, setDescription] = useState("");
//     const [history, setHistory] = useState([]);
//     const [isSold, setIsSold] = useState(false);
//     const [toUpdate, setToUpdate] = useState(false);
//     const [image, setImage] = useState({
//         file: [],
//         filepreview: null
//     });



//     const CONTRACT_ADDRESS = '0x3d4c9606DC06741181D7c37207C4c11020931FcA';
//     const CONTRACT_ABI = abi.abi;

//     const navigate = useNavigate();
//     const location = useLocation();
//     const qrData = location.state?.qrData;

//     useEffect(() => {
//         console.log("useEffect 1");
//         findMetaMaskAccount().then((account) => {
//             if (account !== null) {
//                 setCurrentAccount(account);
//             }
//         });

//         if (qrData) {
//             handleScan(qrData)
//         }

//     }, [qrData]);


//     const getImage = async (imageName) => {
//         setImage(prevState => ({
//             ...prevState,
//             filepreview: `http://localhost:5000/file/product/${imageName}`
//             })
//         )
//     }

//     const handleScan = async (qrData) => {
//         const data = qrData.split(",");
//         const contractAddress = data[0];
//         setSerialNumber(data[1]);

//         console.log("contract address", contractAddress)
//         console.log("serial number", data[1])

//         if (contractAddress === CONTRACT_ADDRESS) {

//             try {
//                 const { ethereum } = window;

//                 if (ethereum) {
//                     const provider = new ethers.providers.Web3Provider(ethereum);
//                     const signer = provider.getSigner();
//                     const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//                     console.log("here")

//                     const product = await productContract.getProduct(data[1].toString());
                    

//                     // setProductData(product.toString())
//                     // setToUpdate(true);

//                     console.log("Retrieved product...", product);
//                     setData(product.toString())

//                 } else {
//                     console.log("Ethereum object doesn't exist!");
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     };

    

//     const setData = (d) => {
//         console.log("product data: ", d);

//         const arr = d.split(",");
//         console.log("arr", arr)

//         setName(arr[1]);
//         setBrand(arr[2]);
//         setDescription(arr[3].replace(/;/g, ","));
//         // setImage(arr[4]);
//         getImage(arr[4]);

//         const hist = [];
//         let start = 5;

//         for (let i = 5; i < arr.length; i += 5) {
//             const actor = arr[start + 1];
//             const location = arr[start + 2].replace(/;/g, ",");
//             const timestamp = arr[start + 3];
//             const isSold = arr[start + 4] === "true" ? setIsSold(true) : false;

//             hist.push({
//                 actor, location, timestamp, isSold
//             });

//             start += 5;
//         }
//         console.log("hist", hist)
//         setHistory(hist);

//     }

//     const handleBack = () => {
//         navigate(-2)
//     }


//     const getHistory = () => {
//         return history.map((item, index) => {
//             const date = dayjs(item.timestamp * 1000).format('MM/DD/YYYY');
//             const time = dayjs(item.timestamp * 1000).format('HH:mm a');
//             console.log("getting history")

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
//     }


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
//                     variant="body2"
//                     sx={{
//                         textAlign: "center", marginTop: "3%"
//                     }}
//                 >

//                     Your Product is Authentic!</Typography>
//                 <Box
//                     sx={{
//                         textAlign: "center", marginBottom: "5%",
//                     }}
//                 >

//                     <Typography
//                         variant="h2"
//                         sx={{
//                             textAlign: "center", marginBottom: "3%",
//                             fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
//                         }}
//                     >
//                         Product Details</Typography>

//                     <Box
//                         sx={{
//                             display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, width: '100%',
//                             marginTop: '5%', marginBottom: '5%'
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 marginRight: '1.5%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', flex: '0 0 35%', width: '35%'
//                             }}
//                         >
//                             <Avatar
//                                 alt={name}
//                                 src={image.filepreview}
//                                 sx={{
//                                     width: 100,
//                                     height: 100,
//                                     margin: "auto",
//                                     marginBottom: "3%",
//                                     backgroundColor: "#3f51b5"
//                                 }}
//                             >
//                                 {name}


//                             </Avatar>

//                         </Box>
//                         <Box
//                             sx={{
//                                 marginLeft: '1.5%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'left', flex: '0 0 65%', width: '65%'
//                             }}
//                         >
//                             <Typography
//                                 variant="body1"
//                                 sx={{
//                                     textAlign: "left", marginBottom: "5%",
//                                 }}
//                             >
//                                 {name}

//                             </Typography>

//                             <Typography
//                                 variant="body2"
//                                 sx={{
//                                     textAlign: "left", marginBottom: "3%",
//                                 }}
//                             >
//                                 Serial Number: {serialNumber}
//                             </Typography>


//                             <Typography
//                                 variant="body2"
//                                 sx={{
//                                     textAlign: "left", marginBottom: "3%",
//                                 }}
//                             >
//                                 Description: {description}
//                             </Typography>

//                             <Typography
//                                 variant="body2"
//                                 sx={{
//                                     textAlign: "left", marginBottom: "3%",
//                                 }}
//                             >
//                                 Brand: {brand}
//                             </Typography>

//                         </Box>

//                     </Box>

//                     <Timeline
//                         sx={{
//                             [`& .${timelineOppositeContentClasses.root}`]: {
//                                 flex: 0.2,
//                             },
//                         }}
//                     >
//                         {getHistory()}
//                         <TimelineItem>
//                             <TimelineOppositeContent color="textSecondary">
//                                 {dayjs().format('HH:mm a')} {dayjs().format('MM/DD/YYYY')}
//                             </TimelineOppositeContent>
//                             <TimelineSeparator>
//                                 <TimelineDot />
//                             </TimelineSeparator>
//                             <TimelineContent sx={{ py: '12px', px: 2 }}>
//                                 <Typography>IsSold: {isSold.toString()}</Typography>
//                             </TimelineContent>
//                         </TimelineItem>
//                     </Timeline>





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
//                                 marginTop: "5%",
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

// export default Product;





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
// import { ethers } from "ethers";


// const getEthereumObject = () => window.ethereum;

// /*
//  * This function returns the first linked account found.
//  * If there is no account linked, it will return null.
//  */
// const findMetaMaskAccount = async () => {
//     try {
//         const ethereum = getEthereumObject();

//         /*
//         * First make sure we have access to the Ethereum object.
//         */
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



// const Product = () => {
//     const [currentAccount, setCurrentAccount] = useState("");

//     const [serialNumber, setSerialNumber] = useState("");
//     const [productData, setProductData] = useState("");

//     const [name, setName] = useState("P");
//     const [brand, setBrand] = useState("");
//     const [description, setDescription] = useState("");
//     const [history, setHistory] = useState([]);
//     const [isSold, setIsSold] = useState(false);
//     const [toUpdate, setToUpdate] = useState(false);
//     const [image, setImage] = useState({
//         file: [],
//         filepreview: null
//     });



//     const CONTRACT_ADDRESS = '0x210e88E9eACAA2B7C55341EF1f28AA6659bD7a8C';
//     const CONTRACT_ABI = abi.abi;

//     const navigate = useNavigate();
//     const location = useLocation();
//     const qrData = location.state?.qrData;

//     useEffect(() => {
//         console.log("useEffect 1");
//         findMetaMaskAccount().then((account) => {
//             if (account !== null) {
//                 setCurrentAccount(account);
//             }
//         });

//         if (qrData) {
//             handleScan(qrData)
//         }

//     }, [qrData]);


//     const getImage = async (imageName) => {
//         setImage(prevState => ({
//             ...prevState,
//             filepreview: `http://localhost:5000/file/product/${imageName}`
//             })
//         )
//     }

//     const handleScan = async (qrData) => {
//         const data = qrData.split(",");
//         const contractAddress = data[0];
//         setSerialNumber(data[1]);

//         console.log("contract address", contractAddress)
//         console.log("serial number", data[1])

//         if (contractAddress === CONTRACT_ADDRESS) {

//             try {
//                 const { ethereum } = window;

//                 if (ethereum) {
//                     const provider = new ethers.providers.Web3Provider(ethereum);
//                     const signer = provider.getSigner();
//                     const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//                     console.log("here")

//                     const product = await productContract.getProduct(data[1].toString());
                    

//                     // setProductData(product.toString())
//                     // setToUpdate(true);

//                     console.log("Retrieved product...", product);
//                     setData(product.toString())

//                 } else {
//                     console.log("Ethereum object doesn't exist!");
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     };

    

//     const setData = (d) => {
//         console.log("product data: ", d);

//         const arr = d.split(",");
//         console.log("arr", arr)

//         setName(arr[1]);
//         setBrand(arr[2]);
//         setDescription(arr[3].replace(/;/g, ","));
//         // setImage(arr[4]);
//         getImage(arr[4]);

//         const hist = [];
//         let start = 5;

//         for (let i = 5; i < arr.length; i += 5) {
//             const actor = arr[start + 1];
//             const location = arr[start + 2].replace(/;/g, ",");
//             const timestamp = arr[start + 3];
//             const isSold = arr[start + 4] === "true" ? setIsSold(true) : false;

//             hist.push({
//                 actor, location, timestamp, isSold
//             });

//             start += 5;
//         }
//         console.log("hist", hist)
//         setHistory(hist);

//     }

//     const handleBack = () => {
//         navigate(-2)
//     }


//     const getHistory = () => {
//         return history.map((item, index) => {
//             const date = dayjs(item.timestamp * 1000).format('MM/DD/YYYY');
//             const time = dayjs(item.timestamp * 1000).format('HH:mm a');
//             console.log("getting history")

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
//     }


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
//                     variant="body2"
//                     sx={{
//                         textAlign: "center", marginTop: "3%"
//                     }}
//                 >

//                     Your Product is Authentic!</Typography>
//                 <Box
//                     sx={{
//                         textAlign: "center", marginBottom: "5%",
//                     }}
//                 >

//                     <Typography
//                         variant="h2"
//                         sx={{
//                             textAlign: "center", marginBottom: "3%",
//                             fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
//                         }}
//                     >
//                         Product Details</Typography>

//                     <Box
//                         sx={{
//                             display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, width: '100%',
//                             marginTop: '5%', marginBottom: '5%'
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 marginRight: '1.5%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', flex: '0 0 35%', width: '35%'
//                             }}
//                         >
//                             <Avatar
//                                 alt={name}
//                                 src={image.filepreview}
//                                 sx={{
//                                     width: 100,
//                                     height: 100,
//                                     margin: "auto",
//                                     marginBottom: "3%",
//                                     backgroundColor: "#3f51b5"
//                                 }}
//                             >
//                                 {name}


//                             </Avatar>

//                         </Box>
//                         <Box
//                             sx={{
//                                 marginLeft: '1.5%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'left', flex: '0 0 65%', width: '65%'
//                             }}
//                         >
//                             <Typography
//                                 variant="body1"
//                                 sx={{
//                                     textAlign: "left", marginBottom: "5%",
//                                 }}
//                             >
//                                 {name}

//                             </Typography>

//                             <Typography
//                                 variant="body2"
//                                 sx={{
//                                     textAlign: "left", marginBottom: "3%",
//                                 }}
//                             >
//                                 Serial Number: {serialNumber}
//                             </Typography>


//                             <Typography
//                                 variant="body2"
//                                 sx={{
//                                     textAlign: "left", marginBottom: "3%",
//                                 }}
//                             >
//                                 Description: {description}
//                             </Typography>

//                             <Typography
//                                 variant="body2"
//                                 sx={{
//                                     textAlign: "left", marginBottom: "3%",
//                                 }}
//                             >
//                                 Brand: {brand}
//                             </Typography>

//                         </Box>

//                     </Box>

//                     <Timeline
//                         sx={{
//                             [`& .${timelineOppositeContentClasses.root}`]: {
//                                 flex: 0.2,
//                             },
//                         }}
//                     >
//                         {getHistory()}
//                         <TimelineItem>
//                             <TimelineOppositeContent color="textSecondary">
//                                 {dayjs().format('HH:mm a')} {dayjs().format('MM/DD/YYYY')}
//                             </TimelineOppositeContent>
//                             <TimelineSeparator>
//                                 <TimelineDot />
//                             </TimelineSeparator>
//                             <TimelineContent sx={{ py: '12px', px: 2 }}>
//                                 <Typography>IsSold: {isSold.toString()}</Typography>
//                             </TimelineContent>
//                         </TimelineItem>
//                     </Timeline>





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
//                                 marginTop: "5%",
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

// export default Product;





// Product.jsx
// import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
// import Timeline from '@mui/lab/Timeline';
// import TimelineItem from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';
// import TimelineDot from '@mui/lab/TimelineDot';
// import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
// import dayjs from 'dayjs';
// import { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers';
// import abi from '../../utils/Truemark.json';
// import bgImg from '../../img/bg.png';

// const CONTRACT_ADDRESS = '0x210e88E9eACAA2B7C55341EF1f28AA6659bD7a8C';
// const CONTRACT_ABI = abi.abi;

// const Product = () => {
//   const [currentAccount, setCurrentAccount] = useState('');
//   const [serialNumber, setSerialNumber] = useState('');
//   const [name, setName] = useState('P');
//   const [brand, setBrand] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState({ filepreview: null });
//   const [history, setHistory] = useState([]);
//   const [isSold, setIsSold] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const qrData = location.state?.qrData;

//   useEffect(() => {
//     if (qrData) {
//       handleScan(qrData);
//     }
//   }, [qrData]);

//   const getImage = async (imageName) => {
//     setImage({
//       filepreview: `http://localhost:5000/file/product/${imageName}`
//     });
//   };

//   const handleScan = async (qrData) => {
//     const [contractAddress, serial] = qrData.split(',');
//     setSerialNumber(serial);

//     if (contractAddress === CONTRACT_ADDRESS) {
//       try {
//         const { ethereum } = window;
//         if (ethereum) {
//           const provider = new ethers.providers.Web3Provider(ethereum);
//           const signer = provider.getSigner();
//           const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
//           const product = await contract.getProduct(serial);
//           populateProductData(product);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const populateProductData = (product) => {
//     setName(product[0]);
//     setBrand(product[1]);
//     setDescription(product[2]?.replace(/;/g, ','));
//     getImage(product[4]);

//     const hist = product[5].map((entry) => {
//       const actor = entry[1];
//       const location = entry[2]?.replace(/;/g, ',');
//       const timestamp = Number(entry[3]);
//       const isSoldFlag = entry[4];

//       if (isSoldFlag) setIsSold(true);

//       return { actor, location, timestamp };
//     });

//     setHistory(hist);
//   };

//   const handleBack = () => navigate(-2);

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
//         <Typography variant="h4" align="center" gutterBottom>Product Details</Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
//           <Avatar alt={name} src={image.filepreview} sx={{ width: 100, height: 100, marginRight: 2 }} />
//           <Box>
//             <Typography variant="h6">{name}</Typography>
//             <Typography>Serial Number: {serialNumber}</Typography>
//             <Typography>Description: {description}</Typography>
//             <Typography>Brand: {brand}</Typography>
//           </Box>
//         </Box>

//         <Typography variant="h5" align="center" gutterBottom>Product History</Typography>
//         <Timeline position="alternate">
//           {history.map((item, index) => (
//             <TimelineItem key={index}>
//               <TimelineOppositeContent color="textSecondary">
//                 {dayjs(item.timestamp * 1000).format('DD MMM YYYY - hh:mm A')}
//               </TimelineOppositeContent>
//               <TimelineSeparator>
//                 <TimelineDot />
//                 {index !== history.length - 1 && <TimelineConnector />}
//               </TimelineSeparator>
//               <TimelineContent>
//                 <Typography>Actor: {item.actor}</Typography>
//                 <Typography>Location: {item.location}</Typography>
//               </TimelineContent>
//             </TimelineItem>
//           ))}
//         </Timeline>

//         <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//           Product Sold: <strong>{isSold ? 'Yes' : 'No'}</strong>
//         </Typography>

//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//           <Button variant="contained" onClick={handleBack}>Back</Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Product;



import { Box, Paper, Avatar, Typography, Button } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import abi from '../../utils/Truemark.json';
import bgImg from '../../img/bg.png';

const CONTRACT_ADDRESS = '0xF89Dd0FF002179340542D03FfFd7CcBaa4972Ae6';
const CONTRACT_ABI = abi.abi;

const Product = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({ filepreview: null });
  const [history, setHistory] = useState([]);
  const [isSold, setIsSold] = useState(false);
  const [loading, setLoading] = useState(true); // <-- Added loading state

  const location = useLocation();
  const navigate = useNavigate();
  const qrData = location.state?.qrData;

  useEffect(() => {
    if (qrData) {
      handleScan(qrData);
    }
  }, [qrData]);

  const getImage = async (imageName) => {
    setImage({
      filepreview: `http://localhost:5000/file/product/${imageName}`
    });
  };

  const handleScan = async (qrData) => {
    setLoading(true); // Start loading
    const [contractAddress, serial] = qrData.split(',');
    setSerialNumber(serial);

    if (contractAddress === CONTRACT_ADDRESS) {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          const product = await contract.getProduct(serial);
          populateProductData(product);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const populateProductData = (product) => {
    setName(product[0]);
    setBrand(product[1]);
    setDescription(product[2]?.replace(/;/g, ','));
    getImage(product[4]);

    const hist = product[5].map((entry) => {
      const actor = entry[1];
      const location = entry[2]?.replace(/;/g, ',');
      const timestamp = Number(entry[3]);
      const isSoldFlag = entry[4];

      if (isSoldFlag) setIsSold(true);

      return { actor, location, timestamp };
    });

    setHistory(hist);
    setLoading(false); // End loading
  };

  const handleBack = () => navigate(-2);

  return (
    <Box sx={{
      backgroundImage: `url(${bgImg})`,
      minHeight: "100vh",
      backgroundSize: 'cover',
      paddingTop: "5%",
      paddingBottom: "5%",
    }}>
      <Paper elevation={3} sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 4,
        backgroundColor: "#f0f4fa"
      }}>
        <Typography variant="h4" align="center" gutterBottom>Product Details</Typography>

        {loading ? (
          <Typography align="center" sx={{ mt: 5, mb: 5 }}>Loading product details...</Typography>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <Avatar alt={name} src={image.filepreview} sx={{ width: 100, height: 100, marginRight: 2 }} />
              <Box>
                <Typography variant="h6">{name}</Typography>
                <Typography>Serial Number: {serialNumber}</Typography>
                <Typography>Description: {description}</Typography>
                <Typography>Brand: {brand}</Typography>
              </Box>
            </Box>

            <Typography variant="h5" align="center" gutterBottom>Product History</Typography>
            <Timeline position="alternate">
              {history.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent color="textSecondary">
                    {dayjs(item.timestamp * 1000).format('DD MMM YYYY - hh:mm A')}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index !== history.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>Actor: {item.actor}</Typography>
                    <Typography>Location: {item.location}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Product Sold: <strong>{isSold ? 'Yes' : 'No'}</strong>
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button variant="contained" onClick={handleBack}>Back</Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Product;
