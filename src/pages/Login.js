import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import config from "./config";
import axios from "axios";
import Logoimage from "../components/Logoimge";

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
      <Logoimage src="/images/logo.png" alt="Profile" size={90} />
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
          sx={{
            color: "#18578f",
            fontWeight: "bold",
            fontFamily: "Figtree, sans-serif",
            marginBottom: 2,
          }}
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
              <Typography
                variant="h4"
                component="h1"
                textAlign="center"
                gutterBottom
                sx={{
                  color: "#0c0c40",
                  fontWeight: "bold",
                  fontFamily: "Figtree, sans-serif",
                }}
              >
                Login
              </Typography>

              {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                    fontFamily: "Figtree, sans-serif",
                  }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                    fontFamily: "Figtree, sans-serif",
                  }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 2,
                    backgroundColor: "#4385e0",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#0a0a50",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>

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
