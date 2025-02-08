import React from "react";
import "./Logoimage.css";

const Logoimage = ({ src, alt = "Round Image", size = 80 }) => {
  return (
    <div className="top-right-image" style={{ width: size, height: size }}>
      <img src={src} alt={alt} style={{ width: size, height: size }} />
    </div>
  );
};

export default Logoimage;
