// import { Box, Button, styled, Typography, TextField } from "@mui/material";
// import { Container } from "@mui/system";
// import React from "react";

// import fbIcon from "../../img/fbicon.png";
// import twitterIcon from "../../img/twittericon.png";
// import linkedinIcon from "../../img/linkedinicon.png";

// const Footer = () => {
//   const FooterWrapper = styled(Box)(({ theme }) => ({
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "#fff",
//     padding: theme.spacing(8, 2),
//     marginTop: theme.spacing(8),
//     borderTopLeftRadius: "40px",
//     borderTopRightRadius: "40px",
//   }));

//   const SectionTitle = styled(Typography)(({ theme }) => ({
//     fontSize: "20px",
//     fontWeight: "bold",
//     marginBottom: theme.spacing(2),
//   }));

//   const FooterLink = styled("span")(({ theme }) => ({
//     display: "block",
//     fontSize: "16px",
//     color: "rgba(255, 255, 255, 0.8)",
//     fontWeight: "300",
//     cursor: "pointer",
//     marginBottom: theme.spacing(1),
//     transition: "color 0.3s",
//     "&:hover": {
//       color: "#fff",
//     },
//   }));

//   const IconBox = styled(Box)(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     gap: "1.2rem",
//     marginTop: theme.spacing(2),
//   }));

//   const EmailInput = styled(TextField)(({ theme }) => ({
//     backgroundColor: "#fff",
//     borderRadius: "10px",
//     width: "100%",
//     maxWidth: "300px",
//     marginTop: theme.spacing(2),
//     input: {
//       color: "#333",
//       padding: "12px",
//       fontSize: "14px",
//     },
//   }));

//   return (
//     <FooterWrapper>
//       <Container>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: 4,
//           }}
//         >
//           {/* Products */}
//           <Box>
//             <SectionTitle>Products</SectionTitle>
//             <FooterLink>Product Verification</FooterLink>
//             <FooterLink>Supply Chain Tracking</FooterLink>
//             <FooterLink>Anti-Counterfeiting</FooterLink>
//             <FooterLink>Smart Contracts</FooterLink>
//           </Box>

//           {/* Resources */}
//           <Box>
//             <SectionTitle>Resources</SectionTitle>
//             <FooterLink>How It Works</FooterLink>
//             <FooterLink>Case Studies</FooterLink>
//             <FooterLink>Blog</FooterLink>
//             <FooterLink>Whitepaper</FooterLink>
//           </Box>

//           {/* Company */}
//           <Box>
//             <SectionTitle>Company</SectionTitle>
//             <FooterLink>About Us</FooterLink>
//             <FooterLink>Partnerships</FooterLink>
//             <FooterLink>Terms of Use</FooterLink>
//             <FooterLink>Privacy Policy</FooterLink>
//           </Box>

//           {/* Contact */}
//           <Box sx={{ maxWidth: "300px" }}>
//             <SectionTitle>Get in Touch</SectionTitle>
//             <Typography
//               variant="body2"
//               sx={{ color: "rgba(255,255,255,0.85)", mb: 2 }}
//             >
//               Let us help you find the perfect solution for your needs.
//             </Typography>

//             <EmailInput
//               placeholder="Enter your email"
//               variant="outlined"
//               size="small"
//             />

//             <IconBox>
//               <img src={fbIcon} alt="fb" style={{ cursor: "pointer" }} />
//               <img src={twitterIcon} alt="twitter" style={{ cursor: "pointer" }} />
//               <a
//                 href="https://www.linkedin.com/in/saira-luqman-7a495b224"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src={linkedinIcon}
//                   alt="linkedin"
//                   style={{ cursor: "pointer" }}
//                 />
//               </a>
//             </IconBox>
//           </Box>
//         </Box>

//         {/* Copyright */}
//         <Box sx={{ textAlign: "center", mt: 6, fontSize: "14px", opacity: 0.7 }}>
//           © {new Date().getFullYear()} TrueMark – Counterfeit Protection via Blockchain
//         </Box>
//       </Container>
//     </FooterWrapper>
//   );
// };

// export default Footer;


import React, { useState } from "react";
import emailjs from "emailjs-com";
import {
  Box,
  Button,
  styled,
  Typography,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import fbIcon from "../../img/fbicon.png";
import twitterIcon from "../../img/twittericon.png";
import linkedinIcon from "../../img/linkedinicon.png";

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

const Footer = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    const templateParams = {
      name: userName,
      email: email,
      message: message,
      title: "Contact Query",
    };

    emailjs
      .send(
        "service_56ua4wk",
        "template_kywyazi",
        templateParams,
        "I0V7Lpa_CjzQiyId7"
      )
      .then((res) => {
        console.log("Email sent!", res);
        setSent(true);
        setUserName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        console.error("Failed to send email", err);
      });
  };

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

            <TextField
              placeholder="Enter your name"
              variant="outlined"
              size="small"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ mt: 1, backgroundColor: "#fff", borderRadius: "10px" }}
              fullWidth
            />

            <EmailInput
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              placeholder="Enter your message"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              sx={{ mt: 2, backgroundColor: "#fff", borderRadius: "10px" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              onClick={handleSend}
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#fff",
                color: "#764ba2",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
            >
              Send
            </Button>

            {sent && (
              <Typography sx={{ mt: 1, color: "#0f0" }}>
                Message sent successfully!
              </Typography>
            )}

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

        <Box sx={{ textAlign: "center", mt: 6, fontSize: "14px", opacity: 0.7 }}>
          © {new Date().getFullYear()} TrueMark – Counterfeit Protection via Blockchain
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
