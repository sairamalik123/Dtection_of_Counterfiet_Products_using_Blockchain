

//correct code but location not show manuf

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
    const [loading, setLoading] = useState(true); // boolean loading state

    const CONTRACT_ADDRESS = '0xd30f45A86f17E011f54e05465BCcB5Ee82411947';
    const CONTRACT_ABI = abi.abi;

    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const qrData = location.state?.qrData;

    useEffect(() => {
        findMetaMaskAccount().then((account) => {
            if (account !== null) {
                setCurrentAccount(account);
            }
        });

        if (qrData) {
            handleScan(qrData);
        }
    }, [qrData]);

    const getImage = async (imageName) => {
        setImage(prevState => ({
            ...prevState,
            filepreview: `http://localhost:5000/file/product/${imageName}`
        }));
    };

    const handleScan = async (qrData) => {
        setLoading(true); // Start loading
        const data = qrData.split(",");
        const contractAddress = data[0];
        setSerialNumber(data[1]);

        if (contractAddress === CONTRACT_ADDRESS) {
            try {
                const { ethereum } = window;

                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const productContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                    const product = await productContract.getProduct(data[1].toString());
                    console.log("Retrieved product...", product);

                    setData(product);
                } else {
                    alert("Ethereum object doesn't exist! Please connect your wallet.");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Done loading
            }
        } else {
            setLoading(false); // Invalid contract
        }
    };

    const setData = (product) => {
        console.log("product data: ", product);

        setName(product[1]);
        setBrand(product[2]);
        setDescription(product[3].replace(/;/g, ","));
        getImage(product[4]);

        const historyData = product[5];

        const hist = historyData.map((entry) => {
            const actor = entry[1] || "Unknown Actor";
            const location = entry[2] && entry[2] !== "undefined, undefined, undefined"
                ? entry[2].replace(/;/g, ",")
                : "Location not available";
            const timestamp = entry[3] || 0;
            const sold = entry[4] === "true";

            if (sold) setIsSold(true);

            return { actor, location, timestamp, isSold: sold };
        });

        setHistory(hist);
    };

    const getHistory = () => {
        return history.map((item, index) => {
            const date = dayjs(item.timestamp * 1000).format('MM/DD/YYYY');
            const time = dayjs(item.timestamp * 1000).format('HH:mm a');

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/update-product-details', { state: { qrData } });
    };

    const handleBack = () => {
        navigate(-1);
    };

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
            {loading ? (
                <Typography align="center" sx={{ mt: 10 }} variant="h6">
                    Loading product details...
                </Typography>
            ) : (
                <Paper elevation={3} sx={{ width: "400px", margin: "auto", marginTop: "10%", marginBottom: "10%", padding: "3%", backgroundColor: "#e3eefc" }}>
                    <Box sx={{ textAlign: "center", marginBottom: "5%" }}>
                        <Typography variant="h2" sx={{ fontFamily: 'Gambetta', fontWeight: "bold", fontSize: "2.5rem" }}>
                            Product Details
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '5%', marginBottom: '5%' }}>
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
                                    {name[0] || "P"}
                                </Avatar>
                            </Box>
                            <Box sx={{ flex: '0 0 65%' }}>
                                <Typography variant="body1">{name}</Typography>
                                <Typography variant="body2">Serial Number: {serialNumber}</Typography>
                                <Typography variant="body2">Description: {description}</Typography>
                                <Typography variant="body2">Brand: {brand}</Typography>
                            </Box>
                        </Box>

                        <Timeline sx={{ [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.2 } }}>
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
                            sx={{ width: "50%", marginTop: "3%", backgroundColor: '#98b5d5', '&:hover': { backgroundColor: '#618dbd' } }}
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
            )}
        </Box>
    );
};

export default UpdateProduct;
