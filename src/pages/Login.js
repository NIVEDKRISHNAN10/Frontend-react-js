import { Box, CssBaseline, TextField, ThemeProvider, Typography } from "@mui/material";
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url('https://source.unsplash.com/random/1920x1080?technology')`,
        backgroundColor: "rgba(10, 8, 201, 0.8)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "0",
      }}
    >
    
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          width: "100%",
          backgroundColor: "rgba(200, 235, 130, 0.9)",
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
            color: "#7809daf5",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
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
        <CustomButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </CustomButton>
        {/* <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            padding: 1.5,
            backgroundColor: "#1565c0",
            "&:hover": { backgroundColor: "#0d47a1" },
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button> */}
        <Typography textAlign="center" marginTop={2}>
          Don't have an account? <a href="/register">Sign Up</a>
        </Typography>
      </Box>
    </Box>
    </ThemeProvider>
  );
  console.log(12);
};

export default LoginPage;
