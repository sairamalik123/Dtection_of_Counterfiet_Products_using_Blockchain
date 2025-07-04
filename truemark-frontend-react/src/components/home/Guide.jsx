// import { Box, Button, styled, Typography } from "@mui/material";
// import React from "react";

// import buyIcon from "../../img/buy_icon.png";
// import sellIcon from "../../img/sell_icon.png";
// import rentIcon from "../../img/rent_icon.png";

// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import CustomButton from "./CustomButton";

// const Guide = () => {
//   const CustomBox = styled(Box)(({ theme }) => ({
//     width: "30%",
//     [theme.breakpoints.down("md")]: {
//       width: "85%",
//     },
//   }));

//   const GuidesBox = styled(Box)(({ theme }) => ({
//     display: "flex",
//     justifyContent: "space-around",
//     width: "70%",
//     marginTop: theme.spacing(5),
//     marginBottom: theme.spacing(5),
//     [theme.breakpoints.down("md")]: {
//       width: "100%",
//     },
//     [theme.breakpoints.down("sm")]: {
//       marginBottom: "0",
//       flexDirection: "column",
//     },
//   }));

//   const GuideBox = styled(Box)(({ theme }) => ({
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: theme.spacing(5),
//     [theme.breakpoints.down("sm")]: {
//       margin: theme.spacing(2, 0, 2, 0),
//     },
//   }));

//   // return (
//   //   <Box
//   //     sx={{
//   //       display: "flex",
//   //       flexDirection: "column",
//   //       justifyContent: "center",
//   //       alignItems: "center",
//   //       marginBottom: "5rem",
//   //     }}
//   //   >
//   //     <div
//   //       style={{
//   //         width: "5%",
//   //         height: "5px",
//   //         backgroundColor: "#000339",
//   //         margin: "0 auto",
//   //       }}
//   //     ></div>

//   //     <Typography
//   //       variant="h3"
//   //       sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
//   //     >
//   //       How it works?
//   //     </Typography>

//   //     <CustomBox>
//   //       <Typography
//   //         variant="body2"
//   //         sx={{
//   //           fontSize: "16px",
//   //           fontWeight: "500",
//   //           color: "#5A6473",
//   //           textAlign: "center",
//   //           marginBottom: "2rem",
//   //         }}
//   //       >
//   //         Our fake product identification system using blockchain technology assigns a unique digital ID to each product that is recorded on the blockchain. Consumers can scan the product's QR code or enter its digital ID on our website to verify its authenticity and ensure it has not been tampered with or counterfeited. By leveraging the security and transparency of the blockchain, our system provides a reliable and efficient way to combat product counterfeiting and protect consumers' safety and trust.
//   //       </Typography>
//   //     </CustomBox>

//   //     {/* <GuidesBox>
//   //       <GuideBox>
//   //         <img src={buyIcon} alt="buyIcon" />
//   //         <Typography
//   //           variant="body2"
//   //           sx={{
//   //             fontWeight: "500",
//   //             fontSize: "20px",
//   //             color: "#3B3c45",
//   //             my: 1,
//   //           }}
//   //         >
//   //           Buying Guides
//   //         </Typography>
//   //         <Box
//   //           sx={{
//   //             cursor: "pointer",
//   //             display: "flex",
//   //             justifyContent: "center",
//   //             alignItems: "center",
//   //           }}
//   //         >
//   //           <Typography
//   //             variant="body2"
//   //             sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
//   //           >
//   //             How to buy
//   //           </Typography>
//   //           <ArrowRightAltIcon style={{ color: "#0689FF" }} />
//   //         </Box>
//   //       </GuideBox>

//   //       <GuideBox>
//   //         <img src={rentIcon} alt="buyIcon" />
//   //         <Typography
//   //           variant="body2"
//   //           sx={{
//   //             fontWeight: "500",
//   //             fontSize: "20px",
//   //             color: "#3B3c45",
//   //             my: 1,
//   //           }}
//   //         >
//   //           Renting Guides
//   //         </Typography>
//   //         <Box
//   //           sx={{
//   //             cursor: "pointer",
//   //             display: "flex",
//   //             justifyContent: "center",
//   //             alignItems: "center",
//   //           }}
//   //         >
//   //           <Typography
//   //             variant="body2"
//   //             sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
//   //           >
//   //             How to rent
//   //           </Typography>
//   //           <ArrowRightAltIcon style={{ color: "#0689FF" }} />
//   //         </Box>
//   //       </GuideBox>

//   //       <GuideBox>
//   //         <img src={sellIcon} alt="buyIcon" />
//   //         <Typography
//   //           variant="body2"
//   //           sx={{
//   //             fontWeight: "500",
//   //             fontSize: "20px",
//   //             color: "#3B3c45",
//   //             my: 1,
//   //           }}
//   //         >
//   //           Selling Guides
//   //         </Typography>
//   //         <Box
//   //           sx={{
//   //             cursor: "pointer",
//   //             display: "flex",
//   //             justifyContent: "center",
//   //             alignItems: "center",
//   //           }}
//   //         >
//   //           <Typography
//   //             variant="body2"
//   //             sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
//   //           >
//   //             How to sell
//   //           </Typography>
//   //           <ArrowRightAltIcon style={{ color: "#0689FF" }} />
//   //         </Box>
//   //       </GuideBox>
//   //     </GuidesBox> */}

//   //     <CustomButton
//   //       backgroundColor="#0F1B4C"
//   //       color="#fff"
//   //       buttonText="See Full Guides"
//   //       guideBtn={true}
//   //     />
//   //   </Box>
//   // );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         marginBottom: "5rem",
//       }}
//     >
//       <div
//         style={{
//           width: "5%",
//           height: "5px",
//           backgroundColor: "#000339",
//           margin: "0 auto",
//         }}
//       ></div>

//       <Typography
//         variant="h3"
//         sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
//       >
//         How it works?
//       </Typography>

//       <CustomBox>
//         <Typography
//           variant="body2"
//           sx={{
//             fontSize: "17px",
//             fontWeight: "500",
//             color: "#5A6473",
//             textAlign: "center",
//             marginBottom: "2rem",
//           }}
//         >
//           Every product has a unique digital identity created for it by our
//           counterfeit detection system using blockchain technology. This ID
//           cannot be changed or forged because it is permanently stored on the
//           blockchain. Customers can quickly confirm the legitimacy of a product
//           by manually inputting the digital ID on our website or scanning the
//           product's QR code. Instantaneously, the system verifies the product's
//           authenticity and integrity by searching the blockchain for its record.
//           Our system offers a reliable and effective means of stopping
//           counterfeiting, safeguarding customers and guaranteeing faith in the
//           authenticity of the product by leveraging the transparency and
//           security properties of blockchain technology.{" "}
//         </Typography>
//       </CustomBox>

//       <GuidesBox>
//         {/* Buying Guide */}
//         <GuideBox>
//           <img src={buyIcon} alt="buyIcon" />
//           <Typography
//             variant="body2"
//             sx={{
//               fontWeight: "500",
//               fontSize: "20px",
//               color: "#3B3c45",
//               my: 1,
//             }}
//           >
//             Buying Guides
//           </Typography>
//           <Box
//             sx={{
//               cursor: "pointer",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             onClick={() =>
//               window.open(
//                 "https://pirg.org/edfund/resources/counterfeit-products-how-to-tell-whether-you-bought-one/#:~:text=Scan%20the%20Universal%20Product%20Code,product%20could%20be%20a%20counterfeit.",
//                 "_blank"
//               )
//             }
//           >
//             <Typography
//               variant="body2"
//               sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
//             >
//               How to buy
//             </Typography>
//             <ArrowRightAltIcon style={{ color: "#0689FF" }} />
//           </Box>
//         </GuideBox>

//         {/* Renting Guide */}
//         <GuideBox>
//   <img src={rentIcon} alt="rentIcon" />
//   <Typography
//     variant="body2"
//     sx={{
//       fontWeight: "500",
//       fontSize: "20px",
//       color: "#3B3c45",
//       my: 1,
//     }}
//   >
//     Renting Guides
//   </Typography>
//   <Box
//     sx={{
//       cursor: "pointer",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//     onClick={() =>
//       window.open(
//         "https://pirg.org/edfund/resources/counterfeit-products-how-to-tell-whether-you-bought-one/#:~:text=Scan%20the%20Universal%20Product%20Code,product%20could%20be%20a%20counterfeit.",
//                 "_blank"
//       )
//     }
//   >
//     <Typography
//       variant="body2"
//       sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
//     >
//       How to rent
//     </Typography>
//     <ArrowRightAltIcon style={{ color: "#0689FF" }} />
//   </Box>
// </GuideBox>

// {/* Selling Guide */}
// <GuideBox>
//   <img src={sellIcon} alt="sellIcon" />
//   <Typography
//     variant="body2"
//     sx={{
//       fontWeight: "500",
//       fontSize: "20px",
//       color: "#3B3c45",
//       my: 1,
//     }}
//   >
//     Selling Guides
//   </Typography>
//   <Box
//     sx={{
//       cursor: "pointer",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//     onClick={() =>
//       window.open(
//         "https://pirg.org/edfund/resources/counterfeit-products-how-to-tell-whether-you-bought-one/#:~:text=Scan%20the%20Universal%20Product%20Code,product%20could%20be%20a%20counterfeit.",
//                 "_blank"
//       )
//     }
//   >
//     <Typography
//       variant="body2"
//       sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
//     >
//       How to sell
//     </Typography>
//     <ArrowRightAltIcon style={{ color: "#0689FF" }} />
//   </Box>
// </GuideBox>
// </GuidesBox>

//       {/* Button */}
//       <CustomButton
//         backgroundColor="#0F1B4C"
//         color="#fff"
//         buttonText="See Full Guides"
//         guideBtn={true}
//         onClick={() =>
//           window.open("https://www.blockchain.com/explorer/api", "_blank")
//         }
//       />
//     </Box>
//   );
// };

// export default Guide;

import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";

import buyIcon from "../../img/buy_icon.png";
import sellIcon from "../../img/sell_icon.png";
import rentIcon from "../../img/rent_icon.png";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomButton from "./CustomButton";

const Guide = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    gap: theme.spacing(4),
    flexWrap: "wrap",
    width: "90%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    padding: theme.spacing(4),
    textAlign: "center",
    color: "#000",
    flex: "1",
    minWidth: "280px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
    },
  }));

  const GuideButton = styled(Box)(({ theme }) => ({
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
    color: "#0689FF",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    "&:hover": {
      textDecoration: "underline",
      color: "#005fcc",
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
        py: 8,
        px: 2,
        borderRadius: "30px",
        mx: "auto",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>

      <Typography
        variant="h3"
        sx={{
          fontSize: "35px",
          fontWeight: "bold",
          color: "#000339",
          my: 3,
          textAlign: "center",
        }}
      >
        How it works?
      </Typography>

      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "17px",
            fontWeight: "500",
            color: "#3B3c45",
            textAlign: "center",
            marginBottom: "2rem",
            lineHeight: 1.8,
          }}
        >
          Our platform uses blockchain technology to ensure product authenticity
          and traceability. When a user scans the QR code printed on a product,
          the system first checks whether the product is registered and verified
          on the blockchain using a secure digital signature. If the product is
          found, the user is prompted to enter a unique One-Time Key (OTK)
          printed on the packaging. This adds an extra layer of security. If the
          key is valid and unused, and the user's MetaMask wallet is connected,
          the system grants access to full product details — including brand,
          description, registration date, location, and complete supply chain
          history (manufacturer, supplier, and retailer). If the product is not
          on the blockchain or the OTK is incorrect or already used, the product
          is flagged as counterfeit, and access to its details is denied.
        </Typography>
      </CustomBox>

      {/* Guide Cards */}
      <GuidesBox>
        <GuideBox>
          <img src={buyIcon} alt="buyIcon" style={{ width: "60px" }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#000", my: 2 }}
          >
            Buying Guides
          </Typography>
          <GuideButton
            onClick={() =>
              window.open(
                "https://pirg.org/edfund/resources/counterfeit-products-how-to-tell-whether-you-bought-one/#:~:text=Scan%20the%20Universal%20Product%20Code,product%20could%20be%20a%20counterfeit.",
                "_blank"
              )
            }
          >
            How to buy <ArrowRightAltIcon sx={{ ml: 1 }} />
          </GuideButton>
        </GuideBox>

        <GuideBox>
          <img src={rentIcon} alt="rentIcon" style={{ width: "60px" }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#000", my: 2 }}
          >
            Renting Guides
          </Typography>
          <GuideButton
            onClick={() =>
              window.open(
                "https://pirg.org/edfund/resources/counterfeit-products-how-to-tell-whether-you-bought-one/#:~:text=Scan%20the%20Universal%20Product%20Code,product%20could%20be%20a%20counterfeit.",
                "_blank"
              )
            }
          >
            How to rent <ArrowRightAltIcon sx={{ ml: 1 }} />
          </GuideButton>
        </GuideBox>

        <GuideBox>
          <img src={sellIcon} alt="sellIcon" style={{ width: "60px" }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#000", my: 2 }}
          >
            Selling Guides
          </Typography>
          <GuideButton
            onClick={() =>
              window.open(
                "https://pirg.org/edfund/resources/counterfeit-products-how-to-tell-whether-you-bought-one/#:~:text=Scan%20the%20Universal%20Product%20Code,product%20could%20be%20a%20counterfeit.",
                "_blank"
              )
            }
          >
            How to sell <ArrowRightAltIcon sx={{ ml: 1 }} />
          </GuideButton>
        </GuideBox>
      </GuidesBox>

      {/* CTA Button */}
      <CustomButton
        backgroundColor="#0F1B4C"
        color="#fff"
        buttonText="See Full Guides"
        guideBtn={true}
        onClick={() =>
          window.open("https://www.blockchain.com/explorer/api", "_blank")
        }
      />
    </Box>
  );
};

export default Guide;
