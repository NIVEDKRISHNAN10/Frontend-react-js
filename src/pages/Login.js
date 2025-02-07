import {
  Box,
  Button,
  createTheme,
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
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        gutterBottom
        sx={{ color: "#0c0c40", fontWeight: "bold", fontStyle:"Papyrus", marginBottom: 2 }}
      >
        WELCOME TO OUR PLATFORM
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "60%",
          minHeight: "65vh",
          backgroundColor: "#fff",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e0e0e0",
            padding: 2,
          }}
        >
          <img
            src="/images/login.png"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
            alt="Login"
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box
            sx={{
              width: "80%",
              maxWidth: 400,
              backgroundColor: "#ffffff",
              padding: 4,
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h4" component="h1" textAlign="center" gutterBottom sx={{ color: "#0c0c40", fontWeight: "bold" }}>
              Login
            </Typography>
            <TextField label="Email" variant="outlined" fullWidth margin="normal" />
            <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
            <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#080836" }}>
              Login
            </Button>
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
