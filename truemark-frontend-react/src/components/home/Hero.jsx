// import { Box, Button, styled, Typography } from "@mui/material";
// import { Container } from "@mui/system";
// import React from "react";
// import Navbar from "./Navbar";
// // import bgImg from "../../img/bg.png";
// import heroImg from "../../img/hero_illustration.png";
// import CustomButton from "./CustomButton";
// import { Link } from "react-router-dom";

// const Hero = () => {
//   const CustomBox = styled(Box)(({ theme }) => ({
//     display: "flex",
//     justifyContent: "center",
//     gap: theme.spacing(5),
//     marginTop: theme.spacing(3),
//     [theme.breakpoints.down("md")]: {
//       flexDirection: "column",
//       alignItems: "center",
//       textAlign: "center",
//     },
//   }));

//   const Title = styled(Typography)(({ theme }) => ({
//     fontSize: "64px",
//     color: "#000336",
//     fontWeight: "bold",
//     margin: theme.spacing(4, 0, 4, 0),
//     [theme.breakpoints.down("sm")]: {
//       fontSize: "40px",
//     },
//   }));

//   // return (
//   //   <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "95vh" }}>
//   //     <Container>
//   //       <Navbar />
//   //       <CustomBox>
//   //         <Box sx={{ flex: "2" }}>
//   //           <Typography
//   //             variant="body2"
//   //             sx={{
//   //               fontSize: "18px",
//   //               color: "#687690",
//   //               fontWeight: "500",
//   //               mt: 1,
//   //               mb: 4,
//   //             }}
//   //           >

//   //             Welcome to Identeefi
//   //           </Typography>
//   //           <Title variant="h1">
//   //             Securely Authenticate Your Products with Identeefi
//   //           </Title>
//   //           <Typography
//   //             variant="body2"
//   //             sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
//   //           >
//   //             Our blockchain-based product identification system provides a secure and reliable way to authenticate your products and protect against fraud
//   //           </Typography>
//   //           <Link to="/scanner">

//   //             <CustomButton
//   //               backgroundColor="#0F1B4C"
//   //               color="#fff"
//   //               buttonText="Scan QR"
//   //               heroBtn={true}
//   //             />
//   //           </Link>
//   //         </Box>

//   //         <Box sx={{ flex: "1.25" }}>
//   //           <img
//   //             src={heroImg}
//   //             alt="heroImg"
//   //             style={{ maxWidth: "100%", marginBottom: "2rem" }}
//   //           />
//   //         </Box>
//   //       </CustomBox>
//   //     </Container>
//   //   </Box>
//   // );
//   return (
//     <section id="home">
    
//     <Box sx={{ backgroundColor: "#5656", minHeight: "95vh" }}> 
//       <Container>
//         <Navbar />
//         <CustomBox>
//           <Box sx={{ flex: "2" }}>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: "18px",
//                 color: "#687690",
//                 fontWeight: "500",
//                 mt: 1,
//                 mb: 4,
//                 ml:1,
//               }}
//             >
//               Welcome to TrueMark!
//             </Typography>
//             <Title variant="h1">
//             Verify Your Product Authenticity with TrueMark’s Trusted Solutions.</Title>
//             <Typography
//               variant="body2"
//               sx={{ fontSize: "16px", color: "#5A6473", my: 4 }}
//             >
//             Our blockchain-powered counterfeit detection solution provides a secure and reliable method for verifying product authenticity and preventing fraud, protecting against counterfeiting while upholding consumer trust.            </Typography>
//             <Link to="/scanner" style={{ textDecoration: 'none'}}>

//               <CustomButton
//                 backgroundColor="#0F1B4C"
//                 color="#fff"
//                 buttonText="Scan QR"
//                 heroBtn={true}
//               />
//             </Link>
//           </Box>

//           <Box sx={{ flex: "1.25" }}>
//             <img
//               src={heroImg}
//               alt="heroImg"
//               style={{ maxWidth: "100%", marginBottom: "2rem" }}
//             />
//           </Box>
//         </CustomBox>
//       </Container>
//     </Box>
//     </section>
//   );
// };

// export default Hero;


//correct code but our service button not in use
// import { Box, Button, styled, Typography } from "@mui/material";
// import { Container } from "@mui/system";
// import React from "react";
// import Navbar from "./Navbar";
// import heroImg from "../../img/hero_illustration.png";
// import CustomButton from "./CustomButton";
// import { Link } from "react-router-dom";

// const Hero = () => {
  
//   const CustomBox = styled(Box)(({ theme }) => ({
//     display: "flex",
//     justifyContent: "center",
//     gap: theme.spacing(5),
//     marginTop: theme.spacing(3),
//     [theme.breakpoints.down("md")]: {
//       flexDirection: "column",
//       alignItems: "center",
//       textAlign: "center",
//     },
//   }));

//   const Title = styled(Typography)(({ theme }) => ({
//     fontSize: "64px",
//     color: "#000336",
//     fontWeight: "bold",
//     margin: theme.spacing(4, 0, 4, 0),
//     [theme.breakpoints.down("sm")]: {
//       fontSize: "40px",
//     },
//   }));

//   const HeroContainer = styled(Box)(({ theme }) => ({
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     minHeight: "95vh",
//     position: "relative",
//     overflow: "hidden",
//     color: "#fff",
//     "&::before": {
//       content: '""',
//       position: "absolute",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: "rgba(0,0,0,0.1)",
//       zIndex: 1,
//     },
//     "& > *": {
//       position: "relative",
//       zIndex: 2,
//     },
//   }));

//   const FeaturesGrid = styled(Box)(({ theme }) => ({
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gap: theme.spacing(3),
//     marginTop: theme.spacing(6),
//     [theme.breakpoints.down("md")]: {
//       gridTemplateColumns: "1fr",
//     },
//   }));

//   const FeatureCard = styled(Box)(({ theme }) => ({
//     background: "rgba(255, 255, 255, 0.1)",
//     backdropFilter: "blur(10px)",
//     border: "1px solid rgba(255, 255, 255, 0.2)",
//     borderRadius: "20px",
//     padding: theme.spacing(3),
//     textAlign: "center",
//     transition: "all 0.3s ease",
//     "&:hover": {
//       transform: "translateY(-10px)",
//       boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//     },
//   }));

//   const FeatureIcon = styled(Box)(({ theme }) => ({
//     fontSize: "3rem",
//     marginBottom: theme.spacing(2),
//   }));

//   const CTAButtons = styled(Box)(({ theme }) => ({
//     display: "flex",
//     gap: theme.spacing(2),
//     marginTop: theme.spacing(3),
//     [theme.breakpoints.down("sm")]: {
//       flexDirection: "column",
//       alignItems: "center",
//     },
//   }));

//   const ScannerButton = styled(Button)(({ theme }) => ({
//     background: "linear-gradient(45deg, #ff9a9e, #fecfef)",
//     color: "white",
//     padding: "1rem 2rem",
//     borderRadius: "30px",
//     fontSize: "1.1rem",
//     fontWeight: "bold",
//     textTransform: "none",
//     boxShadow: "0 5px 20px rgba(255, 154, 158, 0.3)",
//     transition: "all 0.3s ease",
//     "&:hover": {
//       transform: "translateY(-3px)",
//       boxShadow: "0 8px 25px rgba(255, 154, 158, 0.4)",
//     },
//   }));

//   const ServiceButton = styled(Button)(({ theme }) => ({
//     background: "linear-gradient(45deg, #4ecdc4, #44a08d)",
//     color: "white",
//     padding: "1rem 2rem",
//     borderRadius: "30px",
//     fontSize: "1.1rem",
//     fontWeight: "bold",
//     textTransform: "none",
//     boxShadow: "0 5px 20px rgba(78, 205, 196, 0.3)",
//     transition: "all 0.3s ease",
//     "&:hover": {
//       transform: "translateY(-3px)",
//       boxShadow: "0 8px 25px rgba(78, 205, 196, 0.4)",
//     },
//   }));

//   return (
//     <section id="home">
//       <HeroContainer>
//         <Container>
//           <Navbar />
//           <CustomBox>
//             <Box sx={{ flex: "2" }}>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   fontSize: "18px",
//                   color: "rgba(255, 255, 255, 0.9)",
//                   fontWeight: "500",
//                   mt: 1,
//                   mb: 4,
//                   ml: 1,
//                 }}
//               >
//                 Welcome to TrueMark!
//               </Typography>
//               <Title 
//                 variant="h1" 
//                 sx={{ 
//                   color: "#fff",
//                   textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
//                   animation: "fadeInUp 1s ease",
//                 }}
//               >
//                 Secure Product Authentication
//               </Title>
//               <Typography
//                 variant="body2"
//                 sx={{ 
//                   fontSize: "18px", 
//                   color: "rgba(255, 255, 255, 0.9)", 
//                   my: 4,
//                   lineHeight: 1.6,
//                 }}
//               >
//                 Our blockchain-powered counterfeit detection solution provides a secure and reliable method for verifying product authenticity and preventing fraud, protecting against counterfeiting while upholding consumer trust.
//               </Typography>
              
//               <CTAButtons>
//                 <Link to="/scanner" style={{ textDecoration: 'none' }}>
//                   <ScannerButton>
//                     🔍 Scan QR Code
//                   </ScannerButton>
//                 </Link>
//                 <ServiceButton>
//                   📋 Our Services
//                 </ServiceButton>
//               </CTAButtons>
//             </Box>

//             <Box sx={{ flex: "1.25" }}>
//               <img
//                 src={heroImg}
//                 alt="heroImg"
//                 style={{ 
//                   maxWidth: "100%", 
//                   marginBottom: "2rem",
//                   filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
//                 }}
//               />
//             </Box>
//           </CustomBox>

//           {/* Features Section */}
//           <FeaturesGrid>
//             <FeatureCard>
//               <FeatureIcon>🔐</FeatureIcon>
//               <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//                 Blockchain Security
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                 Immutable records on the blockchain ensure product authenticity cannot be forged
//               </Typography>
//             </FeatureCard>

//             <FeatureCard>
//               <FeatureIcon>📱</FeatureIcon>
//               <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//                 QR Code Scanning
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                 Simple mobile scanning for instant product verification and authentication
//               </Typography>
//             </FeatureCard>

//             <FeatureCard>
//               <FeatureIcon>🌐</FeatureIcon>
//               <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//                 Global Verification
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                 Worldwide product tracking and verification network for complete transparency
//               </Typography>
//             </FeatureCard>
//           </FeaturesGrid>
//         </Container>
//       </HeroContainer>
//     </section>
//   );
// };

// export default Hero;



import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useRef } from "react";
import Navbar from "./Navbar";
import heroImg from "../../img/hero_illustration.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const Hero = () => {
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  const HeroContainer = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "95vh",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.1)",
      zIndex: 1,
    },
    "& > *": {
      position: "relative",
      zIndex: 2,
    },
  }));

  const FeaturesGrid = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: theme.spacing(3),
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  }));

  const FeatureCard = styled(Box)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    padding: theme.spacing(3),
    textAlign: "center",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    },
  }));

  const FeatureIcon = styled(Box)(({ theme }) => ({
    fontSize: "3rem",
    marginBottom: theme.spacing(2),
  }));

  const CTAButtons = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const ScannerButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(45deg, #ff9a9e, #fecfef)",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "30px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    textTransform: "none",
    boxShadow: "0 5px 20px rgba(255, 154, 158, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 25px rgba(255, 154, 158, 0.4)",
    },
  }));

  const ServiceButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(45deg, #4ecdc4, #44a08d)",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "30px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    textTransform: "none",
    boxShadow: "0 5px 20px rgba(78, 205, 196, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 25px rgba(78, 205, 196, 0.4)",
    },
  }));

  return (
    <section id="home">
      <HeroContainer>
        <Container>
          <Navbar />
          <CustomBox>
            <Box sx={{ flex: "2" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "18px",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: "500",
                  mt: 1,
                  mb: 4,
                  ml: 1,
                }}
              >
                Welcome to TrueMark!
              </Typography>
              <Title 
                variant="h1" 
                sx={{ 
                  color: "#fff",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  animation: "fadeInUp 1s ease",
                }}
              >
                Secure Product Authentication
              </Title>
              <Typography
                variant="body2"
                sx={{ 
                  fontSize: "18px", 
                  color: "rgba(255, 255, 255, 0.9)", 
                  my: 4,
                  lineHeight: 1.6,
                }}
              >
                Our blockchain-powered counterfeit detection solution provides a secure and reliable method for verifying product authenticity and preventing fraud, protecting against counterfeiting while upholding consumer trust.
              </Typography>
              
              <CTAButtons>
                <Link to="/scanner" style={{ textDecoration: 'none' }}>
                  <ScannerButton>
                    🔍 Scan QR Code
                  </ScannerButton>
                </Link>
                <ServiceButton onClick={scrollToFeatures}>
                  📋 Our Services
                </ServiceButton>
              </CTAButtons>
            </Box>

            <Box sx={{ flex: "1.25" }}>
              <img
                src={heroImg}
                alt="heroImg"
                style={{ 
                  maxWidth: "100%", 
                  marginBottom: "2rem",
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
                }}
              />
            </Box>
          </CustomBox>

          {/* Features Section */}
          <FeaturesGrid ref={featuresRef}>
            <FeatureCard>
              <FeatureIcon>🔐</FeatureIcon>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Blockchain Security
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Immutable records on the blockchain ensure product authenticity cannot be forged
              </Typography>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>📱</FeatureIcon>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                QR Code Scanning
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Simple mobile scanning for instant product verification and authentication
              </Typography>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🌐</FeatureIcon>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Global Verification
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Worldwide product tracking and verification network for complete transparency
              </Typography>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </HeroContainer>
    </section>
  );
};

export default Hero;
