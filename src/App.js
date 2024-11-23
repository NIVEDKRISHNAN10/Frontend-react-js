import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // React Router for navigation
import Navbar from "./components/Navbar"; // Import your Navbar component
// import Home from './pages/Home'; // Example Home page
// import About from './pages/About'; // Example About page
// import Contact from './pages/Contact'; // Example Contact page
import Login from "./pages/Login"; // Example Login page
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

import Logoimage from "./components/Logoimge";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> This renders the Navbar component on every page */}
      <Logoimage src="/images/logo.png" alt="Profile" size={90} />
      <div>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
