import React from "react";
import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { styled } from "@mui/system";

const CircleButton = styled(Button)(({ theme }) => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "#0F1B4C",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  bottom: "20px",
  right: "20px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#0A133D",
  },
}));

const ArrowCircleButton = ({ onClick }) => {
  return (
    <CircleButton onClick={onClick}>
      <ArrowUpwardIcon />
    </CircleButton>
  );
};

export default ArrowCircleButton;
