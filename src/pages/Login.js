import {
  Box,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import config from "./config";
import axios from "axios";
import CustomButton from "../components/Buttons";
import TextFieldTheme from "../components/TextFieldTheme";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.backendUrl}/api/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful, token:", response.data.token);
      localStorage.setItem("authToken", response.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={TextFieldTheme}>
      <CssBaseline /> {/* Resets default browser styling */}
      <Box
        sx={{
          display: "flex", // Flexbox to divide the container into sections
          flexDirection: "column", // Align items vertically within the container
          width: "100%", // Full width
          minHeight: "100vh", // Full height
          position: "relative", // For positioning the heading at the top
        }}
      >
        {/* Welcome Heading */}
        <Typography
          variant="h3"
          component="h1"
          textAlign="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            position: "absolute", // Position at the top
            top: 20, // Distance from the top of the container
            left: "50%", // Center horizontally
            transform: "translateX(-50%)", // Adjust centering
            zIndex: 10, // Ensure it appears on top of other elements
            color: "#4A4A4A",
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          Welcome to Our Platform!
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flex: 1, // Ensures it takes up the rest of the vertical space
          }}
        >
          {/* Right Side (Image) */}
          <Box
            sx={{
              flex: 2.9, // Takes up 50% of the space
              // backgroundImage: "/images/myimage.jpg", // Image URL
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center", // Center image in the box
              alignItems: "center", // Center image vertically
              backgroundColor: "#5f838230", // Optional fallback color
              height: "100vh",
            }}
          >
            <img
              src="/images/login.png"
              style={{
                width: "100%", // Full width of the container
                height: "70%", // Full height of the container
                objectFit: "cover", // Ensures the image covers the container without distorting
              }}
            ></img>
          </Box>
          {/* Left Side (Login Form) */}
          <Box
            sx={{
              // flex: .5, // Takes up 50% of the space
              // display: "flex",
              justifyContent: "center", // Center the login form horizontally
              alignItems: "center", // Center the login form vertically
              backgroundColor: "#5f838230", // Optional background color for left side
              padding: 10,
              paddingTop: 35,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                // display:'flex',
                maxWidth: 400,
                backgroundColor: "#c1c7c6",
                padding: 4,
                borderRadius: 4,
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                textAlign="center"
                gutterBottom
                sx={{
                  color: "#0c0c40",
                  fontStyle: "italic",
                  // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Login
              </Typography>
              {error && (
                <Typography color="error" textAlign="center" marginBottom={2}>
                  {error}
                </Typography>
              )}
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
              />
              <CustomButton
                onClick={handleSubmit}
                disabled={loading}
                color={"#080836"}
              >
                {loading ? "Logging in..." : "Login"}
              </CustomButton>
              <Typography textAlign="center" marginTop={2}>
                Don't have an account? <a href="/register">Sign Up</a>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
