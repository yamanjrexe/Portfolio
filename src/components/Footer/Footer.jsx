import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-copyright">© {year} Yaman Chapagain · Nepal</p>
          <nav className="footer-links" aria-label="Footer">
            <a href="#home" className="footer-link">
              Home
            </a>
            <a href="#about" className="footer-link">
              About
            </a>
            <a href="#projects" className="footer-link">
              Projects
            </a>
            <a href="#contact" className="footer-link">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
