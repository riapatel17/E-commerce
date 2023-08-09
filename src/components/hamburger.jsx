import React, { useState } from "react";
import { Link } from "react-router-dom";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className="menu-items">
        <div className="nav-links">
          <Link to="/" className="menu-link">
            Home
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/cart" className="menu-link">
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
