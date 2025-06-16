import React from 'react';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import abi from '../../utils/Truemark.json';
import bgImg from '../../img/bg.png';

const CONTRACT_ADDRESS = '0xff640E131188aAf6E898a53E7969054327c7A5aA';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const qrData = location.state?.qrData;
  const urlSerialNumber = params.serialNumber;

  // Load data when QR is scanned or accessed directly
  useEffect(() => {
    if (qrData) {
      handleScan(qrData);
    } else if (urlSerialNumber) {
      handleDirectAccess(urlSerialNumber);
    }
  }, [qrData, urlSerialNumber]);

  const getImage = async (imageName) => {
    if (imageName && imageName !== '') {
      setImage({
        filepreview: `http://localhost:5000/file/product/${imageName}`
      });
    } else {
      setImage({ filepreview: null });
    }
  };

  const handleDirectAccess = async (serial) => {
    setLoading(true);
    setError('');
    
    // Clean serial number - remove quotes and extra characters
    const cleanSerial = cleanSerialNumber(serial);
    setSerialNumber(cleanSerial);
    
    try {
      const { ethereum } = window;
      if (!ethereum) {
        throw new Error("MetaMask not found. Please install MetaMask.");
      }
      
      const provider = new ethers.providers.Web3Provider(ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      
      console.log('Fetching product with serial:', cleanSerial);
      const product = await contract.getProduct(cleanSerial);
      console.log('Product data received:', product);
      
      populateProductData(product);
    } catch (error) {
      console.error("Direct Access Error:", error);
      setError(`Failed to load product: ${error.message}`);
      setLoading(false);
    }
  };

  const handleScan = async (qrData) => {
    setLoading(true);
    setError('');
    
    try {
      let serial = null;

      console.log('QR Data received:', qrData);

      // Handle QR data with digital verification (contract, serialNumber, signature)
      if (typeof qrData === 'string') {
        try {
          // Try to parse as JSON first (for digital verification format)
          const parsed = JSON.parse(qrData);
          console.log('Parsed QR JSON:', parsed);
          
          // Check if it has digital verification format
          if (parsed.contract && parsed.serialNumber && parsed.signature) {
            // Verify contract address matches
            if (parsed.contract.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()) {
              serial = parsed.serialNumber;
              console.log('Digital verification QR detected, serial:', serial);
            } else {
              throw new Error("Contract address mismatch in QR code");
            }
          } else if (parsed.serialNumber) {
            serial = parsed.serialNumber;
          } else if (parsed.serial) {
            serial = parsed.serial;
          } else {
            throw new Error("Invalid QR format - missing serial number");
          }
        } catch (parseError) {
          // If not JSON, try comma-separated format
          if (qrData.includes(',')) {
            const parts = qrData.split(',');
            if (parts.length >= 2) {
              const [contractAddress, serialNum] = parts;
              if (contractAddress.toLowerCase() === CONTRACT_ADDRESS.toLowerCase()) {
                serial = serialNum;
              } else {
                throw new Error("Invalid contract address in QR code");
              }
            } else {
              throw new Error("Invalid comma-separated QR format");
            }
          } else {
            // Use as direct serial number
            serial = qrData;
          }
        }
      } else if (typeof qrData === 'object') {
        if (qrData.serialNumber) {
          serial = qrData.serialNumber;
        } else if (qrData.serial) {
          serial = qrData.serial;
        }
      }

      if (!serial) {
        throw new Error("Serial number not found in QR code");
      }

      // Clean the serial number
      const cleanSerial = cleanSerialNumber(serial);
      console.log('Clean serial number:', cleanSerial);
      setSerialNumber(cleanSerial);

      const { ethereum } = window;
      if (!ethereum) {
        throw new Error("MetaMask not found. Please install MetaMask.");
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      
      console.log('Fetching product with serial:', cleanSerial);
      const product = await contract.getProduct(cleanSerial);
      console.log('Product data received:', product);
      
      populateProductData(product);
    } catch (error) {
      console.error("QR Scan Error:", error);
      setError(`Failed to scan QR: ${error.message}`);
      setLoading(false);
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

  const populateProductData = (product) => {
    try {
      console.log('Populating product data:', product);
      
      // Check if product exists and has data
      if (!product || product.length === 0) {
        throw new Error("Product not found or has no data");
      }
      
      // Based on your smart contract return order:
      // 0: serialRet, 1: nameRet, 2: brandRet, 3: descriptionRet, 
      // 4: imageRet, 5: manufacturerRet, 6: historyRet
      
      const serialRet = product[0] || '';
      const productName = product[1] || 'Unknown Product';
      const productBrand = product[2] || 'Unknown Brand';
      const productDescription = product[3] ? product[3].replace(/;/g, ',') : 'No description available';
      const productImage = product[4] || '';
      const manufacturerAddress = product[5] || '';
      const productHistory = product[6] || [];
      
      console.log('Extracted data:', {
        serial: serialRet,
        name: productName,
        brand: productBrand,
        description: productDescription,
        image: productImage,
        manufacturer: manufacturerAddress,
        historyLength: productHistory.length
      });
      
      setName(productName);
      setBrand(productBrand);
      setDescription(productDescription);
      
      // Handle image
      if (productImage && productImage !== '') {
        getImage(productImage);
      } else {
        setImage({ filepreview: null });
      }

      // Handle history - productHistory should be an array of structs
      if (productHistory && Array.isArray(productHistory) && productHistory.length > 0) {
        console.log('Processing history:', productHistory);
        
        const hist = productHistory.map((entry, index) => {
          console.log(`History entry ${index}:`, entry);
          
          // Each entry should be a struct with properties
          // Adjust these indices based on your ProductHistory struct
          const actor = entry.actor || entry[0] || 'Unknown Actor';
          const location = entry.location || entry[1] || 'Unknown Location';
          const timestamp = entry.timestamp || entry[2] || 0;
          const isSoldFlag = entry.isSold || entry[3] || false;
          
          // Clean location if it has semicolons
          const cleanLocation = typeof location === 'string' ? location.replace(/;/g, ',') : location;
          
          if (isSoldFlag) {
            setIsSold(true);
          }
          
          return { 
            actor, 
            location: cleanLocation, 
            timestamp: Number(timestamp) 
          };
        });
        
        console.log('Processed history:', hist);
        setHistory(hist);
      } else {
        console.log('No history data found or empty array');
        setHistory([]);
      }
      
      setLoading(false);
      setError('');
    } catch (error) {
      console.error('Error populating product data:', error);
      setError(`Error loading product data: ${error.message}`);
      setLoading(false);
    }
  };

  const handleBack = () => navigate(-1);

  // const handleUpdateProduct = () => {
  //   // Navigate to update product page with clean serial number
  //   navigate(`/update-product/${serialNumber}`);
  // };

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
        <Typography variant="h4" align="center" gutterBottom>
          Product Details
        </Typography>

        {loading ? (
          <Typography align="center" sx={{ mt: 5, mb: 5 }}>
            Loading product details...
          </Typography>
        ) : error ? (
          <Box sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
            <Typography color="error" variant="h6">
              {error}
            </Typography>
            <Button variant="outlined" onClick={handleBack} sx={{ mt: 2 }}>
              Go Back
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <Avatar 
                alt={name} 
                src={image.filepreview} 
                sx={{ width: 100, height: 100, marginRight: 2 }}
              >
                {!image.filepreview && name ? name.charAt(0).toUpperCase() : 'P'}
              </Avatar>
              <Box>
                <Typography variant="h6">{name}</Typography>
                <Typography>Serial Number: {serialNumber}</Typography>
                <Typography>Description: {description}</Typography>
                <Typography>Brand: {brand}</Typography>
              </Box>
            </Box>

            <Typography variant="h5" align="center" gutterBottom>
              Product History
            </Typography>
            
            <Timeline position="alternate">
              {history.length === 0 ? (
                <Typography align="center" sx={{ mt: 2 }}>
                  No history available for this product.
                </Typography>
              ) : (
                history.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent color="textSecondary">
                      {item.timestamp > 0 ? 
                        dayjs(item.timestamp * 1000).format('DD MMM YYYY - hh:mm A') : 
                        'Unknown Date'
                      }
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
                ))
              )}
            </Timeline>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Product Sold: <strong>{isSold ? 'Yes' : 'No'}</strong>
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <Button variant="contained" onClick={handleBack}>
                Back
              </Button>
              {/* <Button variant="contained" color="primary" onClick={handleUpdateProduct}>
                Update Product
              </Button> */}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Product;