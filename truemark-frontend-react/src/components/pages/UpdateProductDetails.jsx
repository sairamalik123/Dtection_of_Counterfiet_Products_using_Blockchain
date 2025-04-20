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
import { useLocation, useNavigate } from 'react-router-dom';
import abi from '../../utils/Truemark.json';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { ethers } from "ethers";
import axios from 'axios';


const getEthereumObject = () => window.ethereum;

/*
 * This function returns the first linked account found.
 * If there is no account linked, it will return null.
 */
const findMetaMaskAccount = async () => {
    try {
        const ethereum = getEthereumObject();

        /*
        * First make sure we have access to the Ethereum object.
        */
        if (!ethereum) {
            console.error("Make sure you have Metamask!");
            return null;
        }

        console.log("We have the Ethereum object", ethereum);
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



const UpdateProduct = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [suppDate, setSuppDate] = useState('');
    const [suppLatitude, setSuppLatitude] = useState("");
    const [suppLongtitude, setSuppLongtitude] = useState("");
    const [suppName, setSuppName] = useState("");
    const [suppLocation, setSuppLocation] = useState("");
    const [loading, setLoading] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [productData, setProductData] = useState("");

    const [name, setName] = useState("P");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [imageName, setImageName] = useState("");
    const [history, setHistory] = useState([]);
    const [isSold, setIsSold] = useState(false);

    const [image, setImage] = useState({
        file: [],
        filepreview: null
    });


    const CONTRACT_ADDRESS = '0x3d4c9606dc06741181d7c37207c4c11020931fca';
    const CONTRACT_ABI = abi.abi;

    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const qrData = location.state?.qrData;

    console.log("qrData", qrData);

    useEffect(() => {
        console.log("useEffect 1")

        findMetaMaskAccount().then((account) => {
            if (account !== null) {
                setCurrentAccount(account);
            }
        });

        if (qrData) {
            handleScan(qrData)
        }

    }, [qrData]);

    const getImage = async (imageName) => {
        setImage(prevState => ({
            ...prevState,
            filepreview: `http://localhost:5000/file/product/${imageName}`
            })
        )
    }

    const handleScan = async (qrData) => {
        const data = qrData.split(",");
        const contractAddress = data[0];
        setSerialNumber(data[1]);

        console.log("contract address", contractAddress)
        console.log("serial number", data[1])

        if (contractAddress === CONTRACT_ADDRESS) {

            try {
                const { ethereum } = window;

                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);



                    const product = await productContract.getProduct(data[1].toString());

                    // setProductData(product.toString())                    

                    console.log("Retrieved product...", product);
                    setData(product.toString())


                } else {
                    console.log("Ethereum object doesn't exist!");
                    alert("Ethereum object doesn't exist! Please connect your wallet first!")
                }
            } catch (error) {
                console.log(error);
            }
        }

    };

    const setData = (d) => {
        console.log("product data: ", d);

        const arr = d.split(",");
        console.log("arr", arr)

        setName(arr[1]);
        setBrand(arr[2]);
        setDescription(arr[3].replace(/;/g, ","));
        // setImageName(arr[4]);
        getImage(arr[4]);

        const hist = [];
        let start = 5;

        for (let i = 5; i < arr.length; i += 5) {
            const actor = arr[start + 1];
            const location = arr[start + 2].replace(/;/g, ",");
            const timestamp = arr[start + 3];
            const isSold = arr[start + 4] === "true" ? setIsSold(true) : false;

            hist.push({
                actor, location, timestamp, isSold
            });

            start += 5;
        }
        console.log("hist", hist)
        setHistory(hist);

    }

    

    const handleBack = () => {
        navigate(-1)
    }


    const getHistory = () => {
        return history.map((item, index) => {
            const date = dayjs(item.timestamp * 1000).format('MM/DD/YYYY');
            const time = dayjs(item.timestamp * 1000).format('HH:mm a');

            // if (item.isSold) {
            //     setIsSold(true);
            // }

            return (
                <TimelineItem key={index}>
                    <TimelineOppositeContent color="textSecondary">
                        {time} {date}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography>Location: {item.location}</Typography>
                        <Typography>Actor: {item.actor}</Typography>
                    </TimelineContent>
                </TimelineItem>
            );
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();;

        navigate('/update-product-details', { state: { qrData }});
    }
    

    return (
        <Box sx={{
            backgroundImage: `url(${bgImg})`,
            minHeight: "80vh",
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
                        Product Details</Typography>

                    <Box
                        sx={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, width: '100%',
                            marginTop: '5%', marginBottom: '5%'
                        }}
                    >
                        <Box
                            sx={{
                                marginRight: '1.5%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', flex: '0 0 35%', width: '35%'
                            }}
                        >
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
                                {name}


                            </Avatar>

                        </Box>
                        <Box
                            sx={{
                                marginLeft: '1.5%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'left', flex: '0 0 65%', width: '65%'
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: "left", marginBottom: "5%",
                                }}
                            >
                                {name}
                                {/* Product Name */}

                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: "left", marginBottom: "3%",
                                }}
                            >
                                Serial Number: {serialNumber}
                            </Typography>


                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: "left", marginBottom: "3%",
                                }}
                            >
                                Description: {description}
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: "left", marginBottom: "3%",
                                }}
                            >
                                Brand: {brand}
                            </Typography>

                        </Box>

                    </Box>

                    <Timeline
                        sx={{
                            [`& .${timelineOppositeContentClasses.root}`]: {
                                flex: 0.2,
                            },
                        }}
                    >
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

                    {loading === "" ? null
                        : <Typography
                            variant="body2"
                            sx={{
                                textAlign: "center", marginTop: "3%"
                            }}
                        >
                            {loading}
                        </Typography>
                    }

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: "50%", marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
                        onClick={handleSubmit}
                    >
                        Update Product
                    </Button>

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

export default UpdateProduct;