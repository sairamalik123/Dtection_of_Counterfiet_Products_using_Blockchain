// import { Box, Paper, Typography, Autocomplete } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import { TextField, Button } from '@mui/material';
// import { useEffect, useState } from 'react';
// import useAuth from '../../hooks/useAuth';
// import { ethers } from "ethers";
// import axios from 'axios';
// import Geocode from "react-geocode";
// import dayjs from 'dayjs';
// import { useLocation, useNavigate } from 'react-router-dom';
// import abi from '../../utils/Truemark.json';

// const options = ["true", "false"]

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

// const UpdateProductDetails = () => {

//     const [currentAccount, setCurrentAccount] = useState("");
//     const [currDate, setCurrDate] = useState('');
//     const [currLatitude, setCurrLatitude] = useState("");
//     const [currLongtitude, setCurrLongtitude] = useState("");
//     const [currName, setCurrName] = useState("");
//     const [currLocation, setCurrLocation] = useState("");
//     const [serialNumber, setSerialNumber] = useState("");
//     const [isSold, setIsSold] = useState(false);
//     const [loading, setLoading] = useState("");

//     const CONTRACT_ADDRESS = '0x3d4c9606DC06741181D7c37207C4c11020931FcA';
//     const CONTRACT_ABI = abi.abi;

//     const { auth } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const qrData = location.state?.qrData;

//     useEffect(() => {
//         console.log("qrdata", qrData)
//         const data = qrData.split(",");
//         const contractAddress = data[0];
//         setSerialNumber(data[1]);
//         console.log("serialNumber", serialNumber)

//         findMetaMaskAccount().then((account) => {
//             if (account !== null) {
//                 setCurrentAccount(account);
//             }
//         });
//     });

//     useEffect(() => {
//         console.log("useEffect 3")

//         getUsername();
//         getCurrentTimeLocation();
//     }, []);

//     useEffect(() => {
//         Geocode.setApiKey('AIzaSyDLaDcfGC_SZkRQWP4RC7ocMEaB9E-3kKs')

//         Geocode.fromLatLng(currLatitude, currLongtitude).then(
//             (response) => {
//                 const address = response.results[0].formatted_address;
//                 let city, state, country;
//                 for (let i = 0; i < response.results[0].address_components.length; i++) {
//                     for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
//                         switch (response.results[0].address_components[i].types[j]) {
//                             case "locality":
//                                 city = response.results[0].address_components[i].long_name;
//                                 break;
//                             case "administrative_area_level_1":
//                                 state = response.results[0].address_components[i].long_name;
//                                 break;
//                             case "country":
//                                 country = response.results[0].address_components[i].long_name;
//                                 break;
//                         }
//                     }
//                 }

//                 setCurrLocation(address.replace(/,/g, ';'));
//                 console.log("city, state, country: ", city, state, country);
//                 console.log("address:", address);
//             },
//             (error) => {
//                 console.error(error);
//             }
//         );

//     }, [currLatitude, currLongtitude]);

//     const getCurrentTimeLocation = () => {
//         setCurrDate(dayjs().unix())
//         navigator.geolocation.getCurrentPosition(function (position) {
//             setCurrLatitude(position.coords.latitude);
//             setCurrLongtitude(position.coords.longitude);
//         });
//     }

//     const getUsername = async (e) => {
//         const res = await axios.get(`http://localhost:5000/profile/${auth.user}`)
//             .then(res => {
//                 console.log(JSON.stringify(res?.data[0]));
//                 setCurrName(res?.data[0].name);

//             })
//     }

//     const updateProduct = async (e) => {
//         e.preventDefault();

//         try {
//             const { ethereum } = window;

//             if (ethereum) {
//                 const provider = new ethers.providers.Web3Provider(ethereum);
//                 const signer = provider.getSigner();
//                 const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//                 console.log("here")

//                 // write transactions
//                 const registerTxn = await productContract.addProductHistory(serialNumber, currName, currLocation, currDate.toString(), Boolean(isSold));
//                 console.log("Mining (Adding Product History) ...", registerTxn.hash);
//                 setLoading("Mining (Add Product History) ...", registerTxn.hash);

//                 await registerTxn.wait();
//                 console.log("Mined (Add Product History) --", registerTxn.hash);
//                 setLoading("Mined (Add Product History) --", registerTxn.hash);

//                 const product = await productContract.getProduct(serialNumber);

//                 console.log("Retrieved product...", product);
//                 setLoading("Done! Product details updated successfully!");

//             } else {
//                 console.log("Ethereum object doesn't exist!");
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("here")
//         setLoading("Please pay the transaction fee to update the product details...")
//         await updateProduct(e);

//     }

//     const handleBack = () => {
//         navigate(-1)
//     }

//     return (
//         <Box sx={{
//             backgroundImage: `url(${bgImg})`,
//             minHeight: "80vh",
//             backgroundRepeat: "no-repeat",
//             position: 'absolute',
//             left: 0,
//             right: 0,
//             top: 0,
//             bottom: 0,
//             backgroundSize: 'cover',
//             zIndex: -2,
//             overflowY: "scroll"
//         }}>

//             <Paper elevation={3} sx={{ width: "350px", margin: "auto", marginTop: "1%", marginBottom: "1%", padding: "1%", backgroundColor: "#e3eefc" }}>

//                 <Typography
//                     variant="h2"
//                     sx={{
//                         textAlign: "center", marginBottom: "1%",
//                         fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
//                     }}
//                 >
//                     Update Product Details</Typography>

//                     <TextField
//                         fullWidth
//                         id="outlined-disabled"
//                         margin="normal"
//                         label="Serial Number"
//                         disabled

//                         value={serialNumber}
//                     />

//                     <TextField
//                         fullWidth
//                         id="outlined-disabled"
//                         margin="normal"
//                         label="Name"
//                         disabled
//                         value={currName}
//                     />
//                     <TextField
//                         fullWidth
//                         id="outlined-disabled"
//                         margin="normal"
//                         label="Location"
//                         disabled
//                         multiline
//                         minRows={2}
//                         value={currLocation.replace(/;/g, ",")}
//                     />
//                     <TextField
//                         fullWidth
//                         id="outlined-disabled"
//                         margin="normal"
//                         label="Date"
//                         disabled

//                         value={dayjs(currDate * 1000).format("MMMM D, YYYY h:mm A")}
//                     />

//                     {auth.role === "supplier" ? null
//                         : <Autocomplete
//                             disablePortal
//                             id="combo-box-demo"
//                             options={options}
//                             fullWidth
//                             // value={isSold}
//                             // onChange={(event, newVal) => {
//                             //     setIsSold(newVal);
//                             // }}
//                             renderInput={(params) =>
//                                 <TextField {...params}
//                                     fullWidth
//                                     id="outlined-basic"
//                                     margin="normal"
//                                     label="Is Sold?"
//                                     variant="outlined"
//                                     inherit="False"

//                                 />}
//                         />
//                     }
//                 {loading === "" ? null
//                         : <Typography
//                             variant="body2"
//                             sx={{
//                                 textAlign: "center", marginTop: "3%"
//                             }}
//                         >
//                             {loading}
//                         </Typography>
//                     }

//                 <Box
//                     sx={{
//                         width: "100%",
//                         display: "flex",
//                         justifyContent: "center",
//                     }}
//                 >

//                         <Button
//                             variant="contained"
//                             type="submit"
//                             // onClick={handleSubmit}
//                             sx={{ textAlign: "center", width: "50%", marginTop: "2%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
//                             >
//                             Update Product
//                         </Button>
//                     </Box>

//                 <Box
//                     sx={{
//                         width: "100%",
//                         display: "flex",
//                         justifyContent: "center",
//                     }}
//                 >

//                     <Button
//                         onClick={handleBack}
//                         sx={{
//                             marginTop: "2%",
//                         }}
//                     >
//                         Back
//                     </Button>

//                 </Box>
//             </Paper>
//         </Box>
//     )
// }

// export default UpdateProductDetails;

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
// import axios from 'axios';

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

// const UpdateProduct = () => {
//     const [currentAccount, setCurrentAccount] = useState("");
//     const [suppDate, setSuppDate] = useState('');
//     const [suppLatitude, setSuppLatitude] = useState("");
//     const [suppLongtitude, setSuppLongtitude] = useState("");
//     const [suppName, setSuppName] = useState("");
//     const [suppLocation, setSuppLocation] = useState("");
//     const [loading, setLoading] = useState("");
//     const [serialNumber, setSerialNumber] = useState("");
//     const [productData, setProductData] = useState("");

//     const [name, setName] = useState("P");
//     const [brand, setBrand] = useState("");
//     const [description, setDescription] = useState("");
//     const [imageName, setImageName] = useState("");
//     const [history, setHistory] = useState([]);
//     const [isSold, setIsSold] = useState(false);

//     const [image, setImage] = useState({
//         file: [],
//         filepreview: null
//     });

//     const CONTRACT_ADDRESS = '0x210e88E9eACAA2B7C55341EF1f28AA6659bD7a8C';
//     const CONTRACT_ABI = abi.abi;

//     const { auth } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const qrData = location.state?.qrData;

//     console.log("qrData", qrData);

//     useEffect(() => {
//         console.log("useEffect 1")

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

//                     const product = await productContract.getProduct(data[1].toString());

//                     // setProductData(product.toString())

//                     console.log("Retrieved product...", product);
//                     setData(product.toString())

//                 } else {
//                     console.log("Ethereum object doesn't exist!");
//                     alert("Ethereum object doesn't exist! Please connect your wallet first!")
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
//         // setImageName(arr[4]);
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
//         navigate(-1)
//     }

//     const getHistory = () => {
//         return history.map((item, index) => {
//             const date = dayjs(item.timestamp * 1000).format('MM/DD/YYYY');
//             const time = dayjs(item.timestamp * 1000).format('HH:mm a');

//             // if (item.isSold) {
//             //     setIsSold(true);
//             // }

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

//     const handleSubmit = async (e) => {
//         e.preventDefault();;

//         navigate('/update-product-details', { state: { qrData }});
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
//                                 {/* Product Name */}

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
//                             {dayjs().format('HH:mm a')} {dayjs().format('MM/DD/YYYY')}
//                             </TimelineOppositeContent>
//                             <TimelineSeparator>
//                                 <TimelineDot />
//                             </TimelineSeparator>
//                             <TimelineContent sx={{ py: '12px', px: 2 }}>
//                                 <Typography>IsSold: {isSold.toString()}</Typography>
//                             </TimelineContent>
//                         </TimelineItem>
//                     </Timeline>

//                     {loading === "" ? null
//                         : <Typography
//                             variant="body2"
//                             sx={{
//                                 textAlign: "center", marginTop: "3%"
//                             }}
//                         >
//                             {loading}
//                         </Typography>
//                     }

//                     <Button
//                         variant="contained"
//                         type="submit"
//                         sx={{ width: "50%", marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
//                         onClick={handleSubmit}
//                     >
//                         Update Product
//                     </Button>

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

// export default UpdateProduct;

// import { Box, Paper, Typography, Autocomplete } from '@mui/material';
// import bgImg from '../../img/bg.png';
// import { TextField, Button } from '@mui/material';
// import { useEffect, useState } from 'react';
// import useAuth from '../../hooks/useAuth';
// import { ethers } from "ethers";
// import axios from 'axios';
// import Geocode from "react-geocode";
// import dayjs from 'dayjs';
// import { useLocation, useNavigate } from 'react-router-dom';
// import abi from '../../utils/Truemark.json';

// const options = ["true", "false"]

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

// const UpdateProductDetails = () => {

//     const [currentAccount, setCurrentAccount] = useState("");
//     const [currDate, setCurrDate] = useState('');
//     const [currLatitude, setCurrLatitude] = useState("");
//     const [currLongtitude, setCurrLongtitude] = useState("");
//     const [currName, setCurrName] = useState("");
//     const [currLocation, setCurrLocation] = useState("");
//     const [serialNumber, setSerialNumber] = useState("");
//     const [isSold, setIsSold] = useState(false);
//     const [loading, setLoading] = useState("");

//     const CONTRACT_ADDRESS = '0x210e88E9eACAA2B7C55341EF1f28AA6659bD7a8C';
//     const CONTRACT_ABI = abi.abi;

//     const { auth } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const qrData = location.state?.qrData;

//     useEffect(() => {
//         console.log("qrdata", qrData)
//         const data = qrData.split(",");
//         // const contractAddress = data[0];
//         setSerialNumber(data[1]);
//         console.log("serialNumber", serialNumber)

//         findMetaMaskAccount().then((account) => {
//             if (account !== null) {
//                 setCurrentAccount(account);
//             }
//         });
//     });

//     useEffect(() => {
//         console.log("useEffect 3")

//         getUsername();
//         getCurrentTimeLocation();
//     }, []);

//     useEffect(() => {
//         Geocode.setApiKey('AIzaSyB5MSbxR9Vuj1pPeGvexGvQ3wUel4znfYY')

//         Geocode.fromLatLng(currLatitude, currLongtitude).then(
//             (response) => {
//                 const address = response.results[0].formatted_address;
//                 let city, state, country;
//                 for (let i = 0; i < response.results[0].address_components.length; i++) {
//                     for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
//                         switch (response.results[0].address_components[i].types[j]) {
//                             case "locality":
//                                 city = response.results[0].address_components[i].long_name;
//                                 break;
//                             case "administrative_area_level_1":
//                                 state = response.results[0].address_components[i].long_name;
//                                 break;
//                             case "country":
//                                 country = response.results[0].address_components[i].long_name;
//                                 break;
//                         }
//                     }
//                 }

//                 setCurrLocation(address.replace(/,/g, ';'));
//                 console.log("city, state, country: ", city, state, country);
//                 console.log("address:", address);
//             },
//             (error) => {
//                 console.error(error);
//             }
//         );

//     }, [currLatitude, currLongtitude]);

//     const getCurrentTimeLocation = () => {
//         setCurrDate(dayjs().unix())
//         navigator.geolocation.getCurrentPosition(function (position) {
//             setCurrLatitude(position.coords.latitude);
//             setCurrLongtitude(position.coords.longitude);
//         });
//     }

//     const getUsername = async (e) => {
//         const res = await axios.get(`http://localhost:5000/profile/${auth.user}`)
//             .then(res => {
//                 console.log(JSON.stringify(res?.data[0]));
//                 setCurrName(res?.data[0].name);

//             })
//     }

//     const updateProduct = async (e) => {
//         e.preventDefault();

//         try {
//             const { ethereum } = window;

//             if (ethereum) {
//                 const provider = new ethers.providers.Web3Provider(ethereum);
//                 const signer = provider.getSigner();
//                 const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//                 console.log("here")

//                 // write transactions
//                 const registerTxn = await productContract.addProductHistory(serialNumber, currName, currLocation, currDate.toString(), Boolean(isSold));
//                 console.log("Mining (Adding Product History) ...", registerTxn.hash);
//                 setLoading("Mining (Add Product History) ...", registerTxn.hash);

//                 await registerTxn.wait();
//                 console.log("Mined (Add Product History) --", registerTxn.hash);
//                 setLoading("Mined (Add Product History) --", registerTxn.hash);

//                 const product = await productContract.getProduct(serialNumber);

//                 console.log("Retrieved product...", product);
//                 setLoading("Done! Product details updated successfully!");

//             } else {
//                 console.log("Ethereum object doesn't exist!");
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("here")
//         setLoading("Please pay the transaction fee to update the product details...")
//         await updateProduct(e);

//     }

//     const handleBack = () => {
//         navigate(-1)
//     }

//     return (
//         <Box sx={{
//             backgroundImage: `url(${bgImg})`,
//             minHeight: "80vh",
//             backgroundRepeat: "no-repeat",
//             position: 'absolute',
//             left: 0,
//             right: 0,
//             top: 0,
//             bottom: 0,
//             backgroundSize: 'cover',
//             zIndex: -2,
//             overflowY: "scroll"
//         }}>

//             <Paper elevation={3} sx={{ width: "400px", margin: "auto", marginTop: "10%", marginBottom: "10%", padding: "3%", backgroundColor: "#e3eefc" }}>

//                 <Typography
//                     variant="h2"
//                     sx={{
//                         textAlign: "center", marginBottom: "3%",
//                         fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem"
//                     }}
//                 >
//                     Update Product Details</Typography>

//                     <TextField
//                         fullWidth
//                         id="outlined-disabled"
//                         margin="normal"
//                         label="Serial Number"
//                         disabled

//                         value={serialNumber}
//                     />

//                     <TextField
//                         fullWidth
//                         id="outlined-disabled"
//                         margin="normal"
//                         label="Name"
//                         disabled
//                         value={currName}
//                     />
//                     <TextField
//                         fullWidth
//                         id="outlined-disabled"
//                         margin="normal"
//                         label="Location"
//                         disabled
//                         multiline
//                         minRows={2}
//                         value={currLocation.replace(/;/g, ",")}
//                     />
//                     <TextField
//                         fullWidth
//                         id="outlined-disabled"
//                         margin="normal"
//                         label="Date"
//                         disabled

//                         value={dayjs(currDate * 1000).format("MMMM D, YYYY h:mm A")}
//                     />

//                     {auth.role === "supplier" ? null
//                         : <Autocomplete
//                             disablePortal
//                             id="combo-box-demo"
//                             options={options}
//                             fullWidth
//                             value={isSold}
//                             onChange={(event, newVal) => {
//                                 setIsSold(newVal);
//                             }}
//                             renderInput={(params) =>
//                                 <TextField {...params}
//                                     fullWidth
//                                     id="outlined-basic"
//                                     margin="normal"
//                                     label="Is Sold?"
//                                     variant="outlined"
//                                     inherit="False"

//                                 />}
//                         />
//                     }
//                 {loading === "" ? null
//                         : <Typography
//                             variant="body2"
//                             sx={{
//                                 textAlign: "center", marginTop: "3%"
//                             }}
//                         >
//                             {loading}
//                         </Typography>
//                     }

//                 <Box
//                     sx={{
//                         width: "100%",
//                         display: "flex",
//                         justifyContent: "center",
//                     }}
//                 >

//                         <Button
//                             variant="contained"
//                             type="submit"
//                             onClick={handleSubmit}
//                             sx={{ textAlign: "center", width: "50%", marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
//                             >
//                             Update Product
//                         </Button>
//                     </Box>

//                 <Box
//                     sx={{
//                         width: "100%",
//                         display: "flex",
//                         justifyContent: "center",
//                     }}
//                 >

//                     <Button
//                         onClick={handleBack}
//                         sx={{
//                             marginTop: "5%",
//                         }}
//                     >
//                         Back
//                     </Button>

//                 </Box>
//             </Paper>
//         </Box>
//     )
// }

// export default UpdateProductDetails;

// import { Box, Paper, Typography, Autocomplete } from "@mui/material";
// import bgImg from "../../img/bg.png";
// import { TextField, Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import { ethers } from "ethers";
// import axios from "axios";
// import dayjs from "dayjs";
// import { useLocation, useNavigate } from "react-router-dom";
// import abi from "../../utils/Truemark.json";

// const options = ["true", "false"];

// const getEthereumObject = () => window.ethereum;

// const findMetaMaskAccount = async () => {
//   try {
//     const ethereum = getEthereumObject();
//     if (!ethereum) {
//       console.error("Make sure you have Metamask!");
//       return null;
//     }

//     const accounts = await ethereum.request({ method: "eth_accounts" });

//     if (accounts.length !== 0) {
//       const account = accounts[0];
//       console.log("Found an authorized account:", account);
//       return account;
//     } else {
//       console.error("No authorized account found");
//       return null;
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// const UpdateProductDetails = () => {
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [currDate, setCurrDate] = useState("");
//   const [currLatitude, setCurrLatitude] = useState("");
//   const [currLongtitude, setCurrLongtitude] = useState("");
//   const [currName, setCurrName] = useState("");
//   const [currLocation, setCurrLocation] = useState("");
//   const [serialNumber, setSerialNumber] = useState("");
//   const [isSold, setIsSold] = useState(false);
//   const [loading, setLoading] = useState("");

//   const CONTRACT_ADDRESS = "0x67333426207CaFD285E178163c43c600127BBEb7";
//   const CONTRACT_ABI = abi.abi;

//   const { auth } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const qrData = location.state?.qrData;

//   useEffect(() => {
//   console.log("qrdata", qrData);

//   // Use RegExp to extract the number after "serialNumber":
//   const match = qrData.match(/"serialNumber"\s*:\s*"(\d+)"/);

//   if (match && match[1]) {
//     const serial = match[1];
//     setSerialNumber(serial);
//     console.log("serialNumber", serial);
//   } else {
//     console.error("Serial number not found in QR data");
//   }

//   findMetaMaskAccount().then((account) => {
//     if (account !== null) {
//       setCurrentAccount(account);
//     }
//   });
// }, []);


//   useEffect(() => {
//     console.log("useEffect 3");
//     getUsername();
//     getCurrentTimeLocation();
//   }, []);

//   useEffect(() => {
//     if (currLatitude && currLongtitude) {
//       fetch(
//         `https://apiip.net/api/check?accessKey=2c0f29da-08b1-497a-9f94-15987b07b114`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           const { city, regionName, countryName } = data;
//           const formattedLocation = `${city};${regionName};${countryName}`;
//           setCurrLocation(formattedLocation);
//           console.log("Location info:", city, regionName, countryName);
//           console.log("API response:", data);
//         })
//         .catch((err) => {
//           console.error("Location fetch error:", err);
//         });
//     }
//   }, [currLatitude, currLongtitude]);

//   const getCurrentTimeLocation = () => {
//     setCurrDate(dayjs().unix());
//     navigator.geolocation.getCurrentPosition(function (position) {
//       setCurrLatitude(position.coords.latitude);
//       setCurrLongtitude(position.coords.longitude);
//     });
//   };

//   const getUsername = async () => {
//     const res = await axios
//       .get(`http://localhost:5000/profile/${auth.user}`)
//       .then((res) => {
//         console.log(JSON.stringify(res?.data[0]));
//         setCurrName(res?.data[0].name);
//       });
//   };

//   const updateProduct = async (e) => {
//     e.preventDefault();

//     try {
//       const { ethereum } = window;

//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const productContract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           CONTRACT_ABI,
//           signer
//         );

//         // const registerTxn = await productContract.addProductHistory(serialNumber, currName, currLocation, currDate.toString(), Boolean(isSold));
//         const registerTxn = await productContract.addProductHistory(
//           serialNumber,
//           currName,
//           currLocation,
//           currDate.toString(),
//           isSold
//         );
//         console.log("Mining (Adding Product History) ...", registerTxn.hash);
//         setLoading("Mining (Add Product History) ...", registerTxn.hash);

//         await registerTxn.wait();
//         console.log("Mined (Add Product History) --", registerTxn.hash);
//         setLoading("Mined (Add Product History) --", registerTxn.hash);

//         const product = await productContract.getProduct(serialNumber);
//         console.log("Retrieved product...", product);
//         setLoading("Done! Product details updated successfully!");
//       } else {
//         console.log("Ethereum object doesn't exist!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("here");
//     setLoading(
//       "Please pay the transaction fee to update the product details..."
//     );
//     await updateProduct(e);
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
//         <Typography
//           variant="h2"
//           sx={{
//             textAlign: "center",
//             marginBottom: "3%",
//             fontFamily: "Gambetta",
//             fontWeight: "bold",
//             fontSize: "2.5rem",
//           }}
//         >
//           Update Product Details
//         </Typography>

//         <TextField
//           fullWidth
//           id="serial-number"
//           margin="normal"
//           label="Serial Number"
//           value={serialNumber}
//           onChange={e => setSerialNumber(e.target.value)}
//         />

//         <TextField
//           fullWidth
//           id="name"
//           margin="normal"
//           label="Name"
//           value={currName}
//           disabled
//         />

//         <TextField
//           fullWidth
//           id="location"
//           margin="normal"
//           label="Location"
//           value={currLocation.replace(/;/g, ", ")}
//           disabled
//           multiline
//           minRows={2}
//         />

//         <TextField
//           fullWidth
//           id="date"
//           margin="normal"
//           label="Date"
//           value={dayjs(currDate * 1000).format("MMMM D, YYYY h:mm A")}
//           disabled
//         />
//         {auth.role === "supplier" ? null : (
//           <Autocomplete
//             disablePortal
//             id="is-sold"
//             options={[true, false]}
//             getOptionLabel={(option) => (option ? "Yes" : "No")}
//             isOptionEqualToValue={(option, value) => option === value}
//             value={isSold}
//             onChange={(event, newVal) => {
//               setIsSold(newVal);
//             }}
//             fullWidth
//             renderInput={(params) => (
//               <TextField {...params} label="Is Sold" margin="normal" />
//             )}
//           />
//         )}

//         {loading === "" ? null : (
//           <Typography
//             variant="body2"
//             sx={{ textAlign: "center", marginTop: "3%" }}
//           >
//             {loading}
//           </Typography>
//         )}

//         <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//           <Button
//             variant="contained"
//             type="submit"
//             onClick={async (e) => {
//               // Check if product exists before updating
//               try {
//                 const { ethereum } = window;
//                 if (ethereum) {
//                   const provider = new ethers.providers.Web3Provider(ethereum);
//                   const signer = provider.getSigner();
//                   const productContract = new ethers.Contract(
//                     CONTRACT_ADDRESS,
//                     CONTRACT_ABI,
//                     signer
//                   );
//                   const product = await productContract.getProduct(serialNumber);
//                   if (!product || !product[0] || product[0] === "") {
//                     alert("Product does not exist. Please check the Serial Number.");
//                     return;
//                   }
//                   await handleSubmit(e);
//                 } else {
//                   alert("Ethereum object doesn't exist!");
//                 }
//               } catch (err) {
//                 alert("Product does not exist. Please check the Serial Number.");
//                 return;
//               }
//             }}
//             sx={{
//               textAlign: "center",
//               width: "50%",
//               marginTop: "3%",
//               backgroundColor: "#98b5d5",
//               "&:hover": { backgroundColor: "#618dbd" },
//             }}
//           >
//             Update Product
//           </Button>
//         </Box>

//         <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//           <Button onClick={handleBack} sx={{ marginTop: "5%" }}>
//             Back
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default UpdateProductDetails;


// import { Box, Paper, Typography, Autocomplete } from "@mui/material";
// import bgImg from "../../img/bg.png";
// import { TextField, Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import { ethers } from "ethers";
// import axios from "axios";
// import dayjs from "dayjs";
// import { useLocation, useNavigate } from "react-router-dom";
// import abi from "../../utils/Truemark.json";

// const options = ["true", "false"];

// const getEthereumObject = () => window.ethereum;

// const findMetaMaskAccount = async () => {
//   try {
//     const ethereum = getEthereumObject();
//     if (!ethereum) {
//       console.error("Make sure you have Metamask!");
//       return null;
//     }

//     const accounts = await ethereum.request({ method: "eth_accounts" });

//     if (accounts.length !== 0) {
//       const account = accounts[0];
//       console.log("Found an authorized account:", account);
//       return account;
//     } else {
//       console.error("No authorized account found");
//       return null;
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// const UpdateProductDetails = () => {
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [currDate, setCurrDate] = useState("");
//   const [currLatitude, setCurrLatitude] = useState("");
//   const [currLongtitude, setCurrLongtitude] = useState("");
//   const [currName, setCurrName] = useState("");
//   const [currLocation, setCurrLocation] = useState("");
//   const [serialNumber, setSerialNumber] = useState("");
//   const [isSold, setIsSold] = useState(false);
//   const [loading, setLoading] = useState("");

//   const CONTRACT_ADDRESS = "0x67333426207CaFD285E178163c43c600127BBEb7";
//   const CONTRACT_ABI = abi.abi;

//   const { auth } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const qrData = location.state?.qrData;

//   useEffect(() => {
//     console.log("qrdata", qrData);

//     // Check if qrData exists and is not undefined
//     if (qrData) {
//       // Use RegExp to extract the number after "serialNumber":
//       const match = qrData.match(/"serialNumber"\s*:\s*"(\d+)"/);

//       if (match && match[1]) {
//         const serial = match[1];
//         setSerialNumber(serial);
//         console.log("serialNumber", serial);
//       } else {
//         console.error("Serial number not found in QR data");
//         // You might want to show an alert or handle this case
//         alert("Serial number not found in QR data. Please scan a valid QR code.");
//       }
//     } else {
//       console.error("QR data is undefined");
//       // Handle the case where qrData is undefined
//       alert("No QR data found. Please scan a QR code first.");
//       // Optionally navigate back or to QR scanner
//       // navigate('/qr-scanner'); // uncomment if you have a QR scanner route
//     }

//     findMetaMaskAccount().then((account) => {
//       if (account !== null) {
//         setCurrentAccount(account);
//       }
//     });
//   }, [qrData, navigate]); // Added qrData and navigate to dependencies

//   useEffect(() => {
//     console.log("useEffect 3");
//     getUsername();
//     getCurrentTimeLocation();
//   }, []);

//   useEffect(() => {
//     if (currLatitude && currLongtitude) {
//       fetch(
//         `https://apiip.net/api/check?accessKey=2c0f29da-08b1-497a-9f94-15987b07b114`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           const { city, regionName, countryName } = data;
//           const formattedLocation = `${city};${regionName};${countryName}`;
//           setCurrLocation(formattedLocation);
//           console.log("Location info:", city, regionName, countryName);
//           console.log("API response:", data);
//         })
//         .catch((err) => {
//           console.error("Location fetch error:", err);
//         });
//     }
//   }, [currLatitude, currLongtitude]);

//   const getCurrentTimeLocation = () => {
//     setCurrDate(dayjs().unix());
//     navigator.geolocation.getCurrentPosition(function (position) {
//       setCurrLatitude(position.coords.latitude);
//       setCurrLongtitude(position.coords.longitude);
//     });
//   };

//   const getUsername = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/profile/${auth.user}`);
//       console.log(JSON.stringify(res?.data[0]));
//       setCurrName(res?.data[0].name);
//     } catch (error) {
//       console.error("Error fetching username:", error);
//     }
//   };

//   const updateProduct = async (e) => {
//     e.preventDefault();

//     try {
//       const { ethereum } = window;

//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const productContract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           CONTRACT_ABI,
//           signer
//         );

//         const registerTxn = await productContract.addProductHistory(
//           serialNumber,
//           currName,
//           currLocation,
//           currDate.toString(),
//           isSold
//         );
//         console.log("Mining (Adding Product History) ...", registerTxn.hash);
//         setLoading("Mining (Add Product History) ...", registerTxn.hash);

//         await registerTxn.wait();
//         console.log("Mined (Add Product History) --", registerTxn.hash);
//         setLoading("Mined (Add Product History) --", registerTxn.hash);

//         const product = await productContract.getProduct(serialNumber);
//         console.log("Retrieved product...", product);
//         setLoading("Done! Product details updated successfully!");
//       } else {
//         console.log("Ethereum object doesn't exist!");
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading("Error updating product details");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("here");
//     setLoading(
//       "Please pay the transaction fee to update the product details..."
//     );
//     await updateProduct(e);
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
//         <Typography
//           variant="h2"
//           sx={{
//             textAlign: "center",
//             marginBottom: "3%",
//             fontFamily: "Gambetta",
//             fontWeight: "bold",
//             fontSize: "2.5rem",
//           }}
//         >
//           Update Product Details
//         </Typography>

//         <TextField
//           fullWidth
//           id="serial-number"
//           margin="normal"
//           label="Serial Number"
//           value={serialNumber}
//           onChange={e => setSerialNumber(e.target.value)}
//         />

//         <TextField
//           fullWidth
//           id="name"
//           margin="normal"
//           label="Name"
//           value={currName}
//           disabled
//         />

//         <TextField
//           fullWidth
//           id="location"
//           margin="normal"
//           label="Location"
//           value={currLocation.replace(/;/g, ", ")}
//           disabled
//           multiline
//           minRows={2}
//         />

//         <TextField
//           fullWidth
//           id="date"
//           margin="normal"
//           label="Date"
//           value={dayjs(currDate * 1000).format("MMMM D, YYYY h:mm A")}
//           disabled
//         />
//         {auth.role === "supplier" ? null : (
//           <Autocomplete
//             disablePortal
//             id="is-sold"
//             options={[true, false]}
//             getOptionLabel={(option) => (option ? "Yes" : "No")}
//             isOptionEqualToValue={(option, value) => option === value}
//             value={isSold}
//             onChange={(event, newVal) => {
//               setIsSold(newVal);
//             }}
//             fullWidth
//             renderInput={(params) => (
//               <TextField {...params} label="Is Sold" margin="normal" />
//             )}
//           />
//         )}

//         {loading === "" ? null : (
//           <Typography
//             variant="body2"
//             sx={{ textAlign: "center", marginTop: "3%" }}
//           >
//             {loading}
//           </Typography>
//         )}

//         <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//           <Button
//             variant="contained"
//             type="submit"
//             onClick={async (e) => {
//               // Check if serial number is provided
//               if (!serialNumber || serialNumber.trim() === "") {
//                 alert("Please provide a valid serial number.");
//                 return;
//               }

//               // Check if product exists before updating
//               try {
//                 const { ethereum } = window;
//                 if (ethereum) {
//                   const provider = new ethers.providers.Web3Provider(ethereum);
//                   const signer = provider.getSigner();
//                   const productContract = new ethers.Contract(
//                     CONTRACT_ADDRESS,
//                     CONTRACT_ABI,
//                     signer
//                   );
//                   const product = await productContract.getProduct(serialNumber);
//                   if (!product || !product[0] || product[0] === "") {
//                     alert("Product does not exist. Please check the Serial Number.");
//                     return;
//                   }
//                   await handleSubmit(e);
//                 } else {
//                   alert("Ethereum object doesn't exist!");
//                 }
//               } catch (err) {
//                 console.error("Error checking product:", err);
//                 alert("Product does not exist. Please check the Serial Number.");
//                 return;
//               }
//             }}
//             sx={{
//               textAlign: "center",
//               width: "50%",
//               marginTop: "3%",
//               backgroundColor: "#98b5d5",
//               "&:hover": { backgroundColor: "#618dbd" },
//             }}
//           >
//             Update Product
//           </Button>
//         </Box>

//         <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//           <Button onClick={handleBack} sx={{ marginTop: "5%" }}>
//             Back
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default UpdateProductDetails;


// import { Box, Paper, Typography, Autocomplete } from "@mui/material";
// import bgImg from "../../img/bg.png";
// import { TextField, Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import { ethers } from "ethers";
// import axios from "axios";
// import dayjs from "dayjs";
// import { useLocation, useNavigate } from "react-router-dom";
// import abi from "../../utils/Truemark.json";

// const options = ["true", "false"];

// const getEthereumObject = () => window.ethereum;

// const findMetaMaskAccount = async () => {
//   try {
//     const ethereum = getEthereumObject();
//     if (!ethereum) {
//       console.error("Make sure you have Metamask!");
//       return null;
//     }

//     const accounts = await ethereum.request({ method: "eth_accounts" });

//     if (accounts.length !== 0) {
//       const account = accounts[0];
//       console.log("Found an authorized account:", account);
//       return account;
//     } else {
//       console.error("No authorized account found");
//       return null;
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// const UpdateProductDetails = () => {
//   const [currentAccount, setCurrentAccount] = useState("");
//   const [currDate, setCurrDate] = useState("");
//   const [currLatitude, setCurrLatitude] = useState("");
//   const [currLongtitude, setCurrLongtitude] = useState("");
//   const [currName, setCurrName] = useState("");
//   const [currLocation, setCurrLocation] = useState("");
//   const [serialNumber, setSerialNumber] = useState("");
//   const [isSold, setIsSold] = useState(false);
//   const [loading, setLoading] = useState("");

//   const CONTRACT_ADDRESS = "0x67333426207CaFD285E178163c43c600127BBEb7";
//   const CONTRACT_ABI = abi.abi;

//   const { auth } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const qrData = location.state?.qrData;

//   useEffect(() => {
//     console.log("qrdata", qrData);

//     // Only try to process QR data if it exists
//     if (qrData) {
//       try {
//         // Handle different QR data formats
//         let extractedSerial = null;

//         // If qrData is an object with serialNumber property
//         if (typeof qrData === 'object' && qrData.serialNumber) {
//           extractedSerial = qrData.serialNumber.toString();
//         }
//         // If qrData is a JSON string, try to parse it
//         else if (typeof qrData === 'string') {
//           try {
//             const parsed = JSON.parse(qrData);
//             if (parsed.serialNumber) {
//               extractedSerial = parsed.serialNumber.toString();
//             }
//           } catch (parseError) {
//             // If JSON parsing fails, try regex
//             const match = qrData.match(/"serialNumber"\s*:\s*"?(\d+)"?/);
//             if (match && match[1]) {
//               extractedSerial = match[1];
//             }
//           }
//         }

//         if (extractedSerial) {
//           setSerialNumber(extractedSerial);
//           console.log("Serial Number extracted from QR:", extractedSerial);
//         } else {
//           console.warn("Could not extract serial number from QR data");
//         }
//       } catch (error) {
//         console.error("Error processing QR data:", error);
//       }
//     } else {
//       console.log("No QR data provided - user can enter serial number manually");
//     }

//     findMetaMaskAccount().then((account) => {
//       if (account !== null) {
//         setCurrentAccount(account);
//       }
//     });
//   }, [qrData]);

//   useEffect(() => {
//     console.log("useEffect 3");
//     getUsername();
//     getCurrentTimeLocation();
//   }, []);

//   useEffect(() => {
//     if (currLatitude && currLongtitude) {
//       fetch(
//         `https://apiip.net/api/check?accessKey=2c0f29da-08b1-497a-9f94-15987b07b114`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           const { city, regionName, countryName } = data;
//           const formattedLocation = `${city};${regionName};${countryName}`;
//           setCurrLocation(formattedLocation);
//           console.log("Location info:", city, regionName, countryName);
//           console.log("API response:", data);
//         })
//         .catch((err) => {
//           console.error("Location fetch error:", err);
//         });
//     }
//   }, [currLatitude, currLongtitude]);

//   const getCurrentTimeLocation = () => {
//     setCurrDate(dayjs().unix());
//     navigator.geolocation.getCurrentPosition(function (position) {
//       setCurrLatitude(position.coords.latitude);
//       setCurrLongtitude(position.coords.longitude);
//     });
//   };

//   const getUsername = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/profile/${auth.user}`);
//       console.log(JSON.stringify(res?.data[0]));
//       setCurrName(res?.data[0].name);
//     } catch (error) {
//       console.error("Error fetching username:", error);
//     }
//   };

//   const updateProduct = async (e) => {
//     e.preventDefault();

//     try {
//       const { ethereum } = window;

//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const productContract = new ethers.Contract(
//           CONTRACT_ADDRESS,
//           CONTRACT_ABI,
//           signer
//         );

//         const registerTxn = await productContract.addProductHistory(
//           serialNumber,
//           currName,
//           currLocation,
//           currDate.toString(),
//           isSold
//         );
//         console.log("Mining (Adding Product History) ...", registerTxn.hash);
//         setLoading(`Mining (Add Product History) ... ${registerTxn.hash}`);

//         await registerTxn.wait();
//         console.log("Mined (Add Product History) --", registerTxn.hash);
//         setLoading(`Mined (Add Product History) -- ${registerTxn.hash}`);

//         const product = await productContract.getProduct(serialNumber);
//         console.log("Retrieved product...", product);
//         setLoading("Done! Product details updated successfully!");
//       } else {
//         console.log("Ethereum object doesn't exist!");
//         setLoading("Ethereum object doesn't exist!");
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading("Error updating product details");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("here");
//     setLoading(
//       "Please pay the transaction fee to update the product details..."
//     );
//     await updateProduct(e);
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
//         <Typography
//           variant="h2"
//           sx={{
//             textAlign: "center",
//             marginBottom: "3%",
//             fontFamily: "Gambetta",
//             fontWeight: "bold",
//             fontSize: "2.5rem",
//           }}
//         >
//           Update Product Details
//         </Typography>

//         <TextField
//           fullWidth
//           id="serial-number"
//           margin="normal"
//           label="Serial Number"
//           value={serialNumber}
//           onChange={e => setSerialNumber(e.target.value)}
//           helperText={
//             qrData 
//               ? "Serial number loaded from QR code" 
//               : "Enter serial number manually or scan QR code"
//           }
//         />

//         {!qrData && (
//           <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
//             <Button
//               variant="outlined"
//               onClick={() => {
//                 // Navigate to QR scanner - replace with your actual QR scanner route
//                 navigate('/scan-qr'); // Update this path to your QR scanner route
//                 // Or show a message if QR scanner is not implemented yet
//                 // alert("QR Scanner not implemented yet. Please enter serial number manually.");
//               }}
//               sx={{
//                 backgroundColor: "#f0f0f0",
//                 "&:hover": { backgroundColor: "#e0e0e0" },
//               }}
//             >
//               Scan QR Code
//             </Button>
//           </Box>
//         )}

//         <TextField
//           fullWidth
//           id="name"
//           margin="normal"
//           label="Name"
//           value={currName}
//           disabled
//         />

//         <TextField
//           fullWidth
//           id="location"
//           margin="normal"
//           label="Location"
//           value={currLocation.replace(/;/g, ", ")}
//           disabled
//           multiline
//           minRows={2}
//         />

//         <TextField
//           fullWidth
//           id="date"
//           margin="normal"
//           label="Date"
//           value={dayjs(currDate * 1000).format("MMMM D, YYYY h:mm A")}
//           disabled
//         />
//         {auth.role === "supplier" ? null : (
//           <Autocomplete
//             disablePortal
//             id="is-sold"
//             options={[true, false]}
//             getOptionLabel={(option) => (option ? "Yes" : "No")}
//             isOptionEqualToValue={(option, value) => option === value}
//             value={isSold}
//             onChange={(event, newVal) => {
//               setIsSold(newVal);
//             }}
//             fullWidth
//             renderInput={(params) => (
//               <TextField {...params} label="Is Sold" margin="normal" />
//             )}
//           />
//         )}

//         {loading === "" ? null : (
//           <Typography
//             variant="body2"
//             sx={{ textAlign: "center", marginTop: "3%" }}
//           >
//             {loading}
//           </Typography>
//         )}

//         <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//           <Button
//             variant="contained"
//             type="submit"
//             onClick={async (e) => {
//               // Check if serial number is provided
//               if (!serialNumber || serialNumber.trim() === "") {
//                 alert("Please provide a valid serial number.");
//                 return;
//               }

//               // Check if product exists before updating
//               try {
//                 const { ethereum } = window;
//                 if (ethereum) {
//                   const provider = new ethers.providers.Web3Provider(ethereum);
//                   const signer = provider.getSigner();
//                   const productContract = new ethers.Contract(
//                     CONTRACT_ADDRESS,
//                     CONTRACT_ABI,
//                     signer
//                   );
//                   const product = await productContract.getProduct(serialNumber);
//                   if (!product || !product[0] || product[0] === "") {
//                     alert("Product does not exist. Please check the Serial Number.");
//                     return;
//                   }
//                   await handleSubmit(e);
//                 } else {
//                   alert("Ethereum object doesn't exist!");
//                 }
//               } catch (err) {
//                 console.error("Error checking product:", err);
//                 alert("Product does not exist. Please check the Serial Number.");
//                 return;
//               }
//             }}
//             sx={{
//               textAlign: "center",
//               width: "50%",
//               marginTop: "3%",
//               backgroundColor: "#98b5d5",
//               "&:hover": { backgroundColor: "#618dbd" },
//             }}
//           >
//             Update Product
//           </Button>
//         </Box>

//         <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
//           <Button onClick={handleBack} sx={{ marginTop: "5%" }}>
//             Back
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default UpdateProductDetails;





import { Box, Paper, Typography, Autocomplete } from "@mui/material";
import bgImg from "../../img/bg.png";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ethers } from "ethers";
import axios from "axios";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import abi from "../../utils/Truemark.json";

const options = ["true", "false"];

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
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const UpdateProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  
  // State management
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  
  // Get data from navigation state
  const navigationState = location.state;
  const qrData = navigationState?.qrData;
  const serialNumber = navigationState?.serialNumber;
  const productData = navigationState?.productData;
  const originalQrData = navigationState?.originalQrData;
  
  // Form data state
  const [currDate, setCurrDate] = useState("");
  const [currLatitude, setCurrLatitude] = useState("");
  const [currLongtitude, setCurrLongtitude] = useState("");
  const [currName, setCurrName] = useState("");
  const [currLocation, setCurrLocation] = useState("");
  const [extractedSerialNumber, setExtractedSerialNumber] = useState("");
  const [isSold, setIsSold] = useState(false);

  const CONTRACT_ADDRESS = "0xff640E131188aAf6E898a53E7969054327c7A5aA";
  const CONTRACT_ABI = abi.abi;

  // Debug and initialization effect
  useEffect(() => {
    console.log("Navigation state:", navigationState);
    console.log("QR Data:", qrData);
    console.log("Serial Number:", serialNumber);
    console.log("Product Data:", productData);
    console.log("Original QR Data:", originalQrData);
    console.log("Auth data:", auth);

    // Try to get serial number from multiple sources
    let finalSerialNumber = "";
    
    // First try direct serialNumber from navigation state
    if (serialNumber) {
      finalSerialNumber = serialNumber.toString().trim();
    }
    // Then try to extract from qrData if available
    else if (qrData) {
      const match = qrData.match(/"serialNumber"\s*:\s*"(\d+)"/);
      if (match && match[1]) {
        finalSerialNumber = match[1];
      }
    }

    if (finalSerialNumber) {
      setExtractedSerialNumber(finalSerialNumber);
      console.log("Final serial number:", finalSerialNumber);
    } else {
      console.error("Serial number not found in any source");
      setError("No serial number provided. Please scan QR code first.");
      return;
    }

    // Find MetaMask account
    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    });
  }, [qrData, serialNumber, productData, originalQrData, auth, navigationState]);

  useEffect(() => {
    console.log("useEffect 3");
    getUsername();
    getCurrentTimeLocation();
  }, []);

  useEffect(() => {
    if (currLatitude && currLongtitude) {
      fetch(
        `https://apiip.net/api/check?accessKey=2c0f29da-08b1-497a-9f94-15987b07b114`
      )
        .then((res) => res.json())
        .then((data) => {
          const { city, regionName, countryName } = data;
          const formattedLocation = `${city};${regionName};${countryName}`;
          setCurrLocation(formattedLocation);
          console.log("Location info:", city, regionName, countryName);
          console.log("API response:", data);
        })
        .catch((err) => {
          console.error("Location fetch error:", err);
        });
    }
  }, [currLatitude, currLongtitude]);

  const getCurrentTimeLocation = () => {
    setCurrDate(dayjs().unix());
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrLatitude(position.coords.latitude);
      setCurrLongtitude(position.coords.longitude);
    });
  };

  const getUsername = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/profile/${auth.user}`);
      console.log(JSON.stringify(res?.data[0]));
      setCurrName(res?.data[0].name);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const productContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        const registerTxn = await productContract.addProductHistory(
          extractedSerialNumber,
          currName,
          currLocation,
          currDate.toString(),
          isSold
        );
        console.log("Mining (Adding Product History) ...", registerTxn.hash);
        setLoading("Mining (Add Product History) ...", registerTxn.hash);

        await registerTxn.wait();
        console.log("Mined (Add Product History) --", registerTxn.hash);
        setLoading("Mined (Add Product History) --", registerTxn.hash);

        const product = await productContract.getProduct(extractedSerialNumber);
        console.log("Retrieved product...", product);
        setLoading("Done! Product details updated successfully!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      setLoading("Error updating product details");
      setError(`Failed to update product: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!extractedSerialNumber) {
      setError("Serial number is required");
      return;
    }
    
    if (!currentAccount) {
      setError("Please connect your MetaMask wallet");
      return;
    }
    
    console.log("here");
    setLoading(
      "Please pay the transaction fee to update the product details..."
    );
    setError("");
    await updateProduct(e);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Error display
  if (error && !extractedSerialNumber) {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "400px",
            padding: "3%",
            backgroundColor: "#e3eefc",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "3%" }}>
            Error
          </Typography>
          <Typography variant="body1" sx={{ color: 'red', marginBottom: '20px' }}>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleBack}
            sx={{
              backgroundColor: "#98b5d5",
              "&:hover": { backgroundColor: "#618dbd" },
            }}
          >
            Go Back
          </Button>
        </Paper>
      </Box>
    );
  }

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
          marginTop: "10%",
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
          Update Product Details
        </Typography>

        <TextField
          fullWidth
          id="serial-number"
          margin="normal"
          label="Serial Number"
          value={extractedSerialNumber}
          onChange={e => setExtractedSerialNumber(e.target.value)}
          InputProps={{
            readOnly: true, // Make it read-only since it comes from QR
          }}
        />

        <TextField
          fullWidth
          id="name"
          margin="normal"
          label="Name"
          value={currName}
          disabled
        />

        <TextField
          fullWidth
          id="location"
          margin="normal"
          label="Location"
          value={currLocation.replace(/;/g, ", ")}
          disabled
          multiline
          minRows={2}
        />

        <TextField
          fullWidth
          id="date"
          margin="normal"
          label="Date"
          value={dayjs(currDate * 1000).format("MMMM D, YYYY h:mm A")}
          disabled
        />
        
        {auth.role === "supplier" ? null : (
          <Autocomplete
            disablePortal
            id="is-sold"
            options={[true, false]}
            getOptionLabel={(option) => (option ? "Yes" : "No")}
            isOptionEqualToValue={(option, value) => option === value}
            value={isSold}
            onChange={(event, newVal) => {
              setIsSold(newVal);
            }}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Is Sold" margin="normal" />
            )}
          />
        )}

        {error && (
          <Typography
            variant="body2"
            sx={{ 
              textAlign: "center", 
              marginTop: "3%", 
              color: 'red' 
            }}
          >
            {error}
          </Typography>
        )}

        {loading === "" ? null : (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: "3%" }}
          >
            {loading}
          </Typography>
        )}

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            type="submit"
            onClick={async (e) => {
              // Check if serial number is provided
              if (!extractedSerialNumber || extractedSerialNumber.trim() === "") {
                setError("Please provide a valid serial number.");
                return;
              }

              // Check if product exists before updating
              try {
                const { ethereum } = window;
                if (ethereum) {
                  const provider = new ethers.providers.Web3Provider(ethereum);
                  const signer = provider.getSigner();
                  const productContract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    CONTRACT_ABI,
                    signer
                  );
                  const product = await productContract.getProduct(extractedSerialNumber);
                  if (!product || !product[0] || product[0] === "") {
                    setError("Product does not exist. Please check the Serial Number.");
                    return;
                  }
                  await handleSubmit(e);
                } else {
                  setError("Ethereum object doesn't exist!");
                }
              } catch (err) {
                console.error("Error checking product:", err);
                setError("Product does not exist. Please check the Serial Number.");
                return;
              }
            }}
            sx={{
              textAlign: "center",
              width: "50%",
              marginTop: "3%",
              backgroundColor: "#98b5d5",
              "&:hover": { backgroundColor: "#618dbd" },
            }}
          >
            Update Product
          </Button>
        </Box>

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button onClick={handleBack} sx={{ marginTop: "5%" }}>
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateProductDetails;