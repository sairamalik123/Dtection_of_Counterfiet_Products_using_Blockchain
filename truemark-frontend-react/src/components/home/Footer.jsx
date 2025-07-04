// import { styled, Typography } from "@mui/material";
// import { Box, Container } from "@mui/system";
// import React from "react";

// import fbIcon from "../../img/fbicon.png";
// import twitterIcon from "../../img/twittericon.png";
// import linkedinIcon from "../../img/linkedinicon.png";

// const Footer = () => {
//   const CustomContainer = styled(Container)(({ theme }) => ({
//     display: "flex",
//     justifyContent: "space-around",
//     gap: theme.spacing(5),
//     [theme.breakpoints.down("sm")]: {
//       flexDirection: "column",
//       textAlign: "center",
//     },
//   }));

//   const IconBox = styled(Box)(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     gap: "1rem",
//     [theme.breakpoints.down("sm")]: {
//       justifyContent: "center",
//     },
//   }));

//   const FooterLink = styled("span")(({ theme }) => ({
//     fontSize: "16px",
//     color: "#7A7A7E",
//     fontWeight: "300",
//     cursor: "pointer",
//     "&:hover": {
//       color: "#000",
//     },
//   }));

//   return (
    
//     <Box sx={{ py: 10 }}>
//       <CustomContainer>
//         <CustomContainer>
//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "20px",
//                 color: "#1C1C1D",
//                 fontWeight: "700",
//                 mb: 2,
//               }}
//             >
//               Products
//             </Typography>

//             <FooterLink>Product Verification</FooterLink>
//             <br />
//             <FooterLink>Supply Chain Tracking</FooterLink>
//             <br />
//             <FooterLink>Anti-Counterfeiting</FooterLink>
//             <br />
//             <FooterLink>Smart Contracts</FooterLink>
//           </Box>

//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "20px",
//                 color: "#1C1C1D",
//                 fontWeight: "700",
//                 mb: 2,
//               }}
//             >
//               Resources
//             </Typography>

//             <FooterLink>How It Works</FooterLink>
//             <br />
//             <FooterLink>Case Studies</FooterLink>
//             <br />
//             <FooterLink>Blog</FooterLink>
//             <br />
//             <FooterLink>Whitepaper</FooterLink>
//           </Box>

//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "20px",
//                 color: "#1C1C1D",
//                 fontWeight: "700",
//                 mb: 2,
//               }}
//             >
//               Company
//             </Typography>

//             <FooterLink>About Us</FooterLink>
//             <br />
//             <FooterLink>Partnerships</FooterLink>
//             <br />
//             <FooterLink>Terms of Use</FooterLink>
//             <br />
//             <FooterLink>Privacy Policy</FooterLink>
//           </Box>

//           <Box>
//             <Typography
//               sx={{
//                 fontSize: "20px",
//                 color: "#1C1C1D",
//                 fontWeight: "700",
//                 mb: 2,
//               }}
//             >
//               Get in touch
//             </Typography>

//             <Typography
//               sx={{
//                 fontSize: "16px",
//                 color: "#7A7A7E",
//                 fontWeight: "500",
//                 mb: 2,
//               }}
//             >
//               Let us help you find the perfect solution for your needs. 
//             </Typography>

//             <IconBox>
//   <img src={fbIcon} alt="fbIcon" style={{ cursor: "pointer" }} />
//   <img
//     src={twitterIcon}
//     alt="twitterIcon"
//     style={{ cursor: "pointer" }}
//   />
//   <a href="https://www.linkedin.com/in/saira-luqman-7a495b224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
//     <img
//       src={linkedinIcon}
//       alt="linkedinIcon"
//       style={{ cursor: "pointer" }}
//     />
//   </a>
// </IconBox>

//           </Box>
//         </CustomContainer>
//       </CustomContainer>
//     </Box>
//   );
// };


// export default Footer;


import { Box, Button, styled, Typography, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import fbIcon from "../../img/fbicon.png";
import twitterIcon from "../../img/twittericon.png";
import linkedinIcon from "../../img/linkedinicon.png";

const Footer = () => {
  const FooterWrapper = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    padding: theme.spacing(8, 2),
    marginTop: theme.spacing(8),
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
  }));

  const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  }));

  const FooterLink = styled("span")(({ theme }) => ({
    display: "block",
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "300",
    cursor: "pointer",
    marginBottom: theme.spacing(1),
    transition: "color 0.3s",
    "&:hover": {
      color: "#fff",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",
    marginTop: theme.spacing(2),
  }));

  const EmailInput = styled(TextField)(({ theme }) => ({
    backgroundColor: "#fff",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "300px",
    marginTop: theme.spacing(2),
    input: {
      color: "#333",
      padding: "12px",
      fontSize: "14px",
    },
  }));

  return (
    <FooterWrapper>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {/* Products */}
          <Box>
            <SectionTitle>Products</SectionTitle>
            <FooterLink>Product Verification</FooterLink>
            <FooterLink>Supply Chain Tracking</FooterLink>
            <FooterLink>Anti-Counterfeiting</FooterLink>
            <FooterLink>Smart Contracts</FooterLink>
          </Box>

          {/* Resources */}
          <Box>
            <SectionTitle>Resources</SectionTitle>
            <FooterLink>How It Works</FooterLink>
            <FooterLink>Case Studies</FooterLink>
            <FooterLink>Blog</FooterLink>
            <FooterLink>Whitepaper</FooterLink>
          </Box>

          {/* Company */}
          <Box>
            <SectionTitle>Company</SectionTitle>
            <FooterLink>About Us</FooterLink>
            <FooterLink>Partnerships</FooterLink>
            <FooterLink>Terms of Use</FooterLink>
            <FooterLink>Privacy Policy</FooterLink>
          </Box>

          {/* Contact */}
          <Box sx={{ maxWidth: "300px" }}>
            <SectionTitle>Get in Touch</SectionTitle>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.85)", mb: 2 }}
            >
              Let us help you find the perfect solution for your needs.
            </Typography>

            <EmailInput
              placeholder="Enter your email"
              variant="outlined"
              size="small"
            />

            <IconBox>
              <img src={fbIcon} alt="fb" style={{ cursor: "pointer" }} />
              <img src={twitterIcon} alt="twitter" style={{ cursor: "pointer" }} />
              <a
                href="https://www.linkedin.com/in/saira-luqman-7a495b224"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={linkedinIcon}
                  alt="linkedin"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </IconBox>
          </Box>
        </Box>

        {/* Copyright */}
        <Box sx={{ textAlign: "center", mt: 6, fontSize: "14px", opacity: 0.7 }}>
          © {new Date().getFullYear()} TrueMark – Counterfeit Protection via Blockchain
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
