import { Box, Paper, Avatar, Typography, Button } from "@mui/material";
import bgImg from "../../img/bg.png";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [role, setRole] = useState([]);
  const [website, setWebsite] = useState([]);
  const [location, setLocation] = useState([]);
  const [image, setImage] = useState({
    file: [],
    filepreview: null,
  });

  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

//   const handleData = async (e) => {
//       const res = await axios.get(`http://localhost:5000/profile/${auth.user}`)
//           .then(res => {
//               console.log(JSON.stringify(res?.data[0]));
//               setName(res?.data[0].name);
//               setDescription(res?.data[0].description);
//               setRole(res.data[0].role);
//               setWebsite(res?.data[0].website);
//               setLocation(res?.data[0].location);
//               setImage(res.data.image);
//           })
//   }

//   const handleData = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/profile/${auth.user}`);
//       const profile = res.data[0]; // ✅ Access first object in array

//       setName(profile.name);
//       setDescription(profile.description);
//       setRole(profile.role);
//       setWebsite(profile.website);
//       setLocation(profile.location);
//       setImage(`http://localhost:5000/file/profile/${profile.image}`);
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };


const handleData = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/profile/${auth.user}`);
    console.log("API response:", res.data);

    const profile = res.data; // since backend sends a single object

    if (profile && profile.name) {
      setName(profile.name);
      setDescription(profile.description);
      setRole(profile.role);
      setWebsite(profile.website);
      setLocation(profile.location);
      setImage(profile.image); // ✅ already a full URL from backend
    } else {
      console.warn("No profile data found for user:", auth.user);
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

  useEffect(() => {
    handleData();
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImg})`,
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: -2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", sm: "70%", md: "400px" }, // Adjust width for different screen sizes
          margin: "auto",
          padding: { xs: "5%", sm: "4%", md: "3%" }, // Adjust padding for smaller screens
          backgroundColor: "#e3eefc",
        }}
      >
        {/* Display Image */}
        {image ? (
          <Avatar
            sx={{
              width: { xs: 80, sm: 90, md: 100 }, // Adjust avatar size for smaller screens
              height: { xs: 80, sm: 90, md: 100 },
              margin: "auto",
              marginBottom: "3%",
              backgroundColor: "#3f51b5",
            }}
            src={image} // Use the image URL from the state
          />
        ) : (
          <Avatar
            sx={{
              width: { xs: 80, sm: 90, md: 100 },
              height: { xs: 80, sm: 90, md: 100 },
              margin: "auto",
              marginBottom: "3%",
              backgroundColor: "#3f51b5",
            }}
          >
            {name[0]} {/* Display first letter of name if no image */}
          </Avatar>
        )}

        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: "5%",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Responsive font size
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            marginBottom: "3%",
            fontSize: { xs: "0.9rem", sm: "1rem" }, // Adjust font size
          }}
        >
          Description: {description}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            marginBottom: "3%",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Role: {role}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            marginBottom: "3%",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Website: {website}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            marginBottom: "3%",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Location: {location}
        </Typography>

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
              marginTop: "7%",
              padding: { xs: "8px 16px", sm: "10px 20px" }, // Responsive button padding
              fontSize: { xs: "0.8rem", sm: "1rem" }, // Responsive font size
            }}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
