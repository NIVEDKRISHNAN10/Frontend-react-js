import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed and imported
import config from "./config";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TextFieldtheme from "../components/TextFieldTheme";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error message as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setLoading(true); // Set loading state
    try {
      // console.log('in')
      // console.log(`${config.backendUrl}/api/register`)
      const response = await axios.post(
        `${config.backendUrl}/api/register`, // Replace with your API endpoint
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSuccessMessage("Registration successful!");
      console.log("Form Submitted: ", formData);
      window.location.href = "/dashboard";

      // // Reset form
      // setFormData({
      //   name: "",
      //   email: "",
      //   password: "",
      //   confirm_password: "",
      // });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <ThemeProvider theme={TextFieldtheme}>
      <CssBaseline />
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="confirm_password">Re-enter Password</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
    </ThemeProvider>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    backgroundColor:"#00000",
    borderRadius: "5px",
   
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    backgroundColor:'#00000',
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#000000",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  success: {
    color: "green",
    fontSize: "14px",
  },
};

export default Register;
