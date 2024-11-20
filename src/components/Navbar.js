import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navItem}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
      </div>
      <div style={styles.navItem}>
        <Link to="/about" style={styles.link}>
          About
        </Link>
      </div>
      <div style={styles.navItem}>
        <Link to="/contact" style={styles.link}>
          Contact
        </Link>
      </div>
      <div style={styles.navItem}>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#333",
    padding: "10px",
  },
  navItem: {
    margin: "0 10px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
  },
};
export default Navbar;
