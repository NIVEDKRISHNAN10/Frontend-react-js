import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import config from './config';
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // For loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
 try {
    const response = await axios.post(
      `${config.backendUrl}/api/login`, // URL from your config
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

      // Save token to localStorage (or session storage)
      localStorage.setItem("authToken", response.data.token);

      // Redirect to another page (optional)
      window.location.href = "/dashboard"; // Example route
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          width: "100%",
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
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
          onChange={handlechange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handlechange}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            padding: 1.5,
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          Login
        </Button>
        <Typography textAlign="center" marginTop={2}>
          Don't have an account? <a href="/register">Sign Up</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
