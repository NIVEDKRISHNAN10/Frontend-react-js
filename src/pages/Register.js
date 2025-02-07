import React from "react";
import { ThemeProvider, CssBaseline, Box, Typography, Button, TextField } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

const RegisterPage = () => {
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
          CREATE YOUR ACCOUNT
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "60%",
            minHeight: "60vh",
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
              style={{ width: "50%", height: "auto", objectFit: "contain" }}
              alt="Register"
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
                variant="h3"
                component="h1"
                textAlign="center"
                gutterBottom
                sx={{ color: "#0c0c40", fontWeight: "bold" }}
              >
                Register
              </Typography>
              <TextField label="Name" variant="outlined" fullWidth margin="normal" />
              <TextField label="Email" variant="outlined" fullWidth margin="normal" />
              <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
              <TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" />
              <Button fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#080836" }}>
                Register
              </Button>
              <Typography textAlign="center" marginTop={2}>
                Already have an account? <a href="/login">Login</a>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RegisterPage;
