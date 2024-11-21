// CustomButton.js
import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ children, onClick, disabled = false, color = "primary", fullWidth = true, ...props }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      variant="contained"
      sx={{
        marginTop: 2,
        padding: 1.5,
        textShadow:20,
        boxShadow:5,
        backgroundColor: color === "primary" ? "#7809daf5" : {color}, // Violet color as alternative
        "&:hover": {
          backgroundColor: color === "primary" ? "#450774f5" : {color},
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
