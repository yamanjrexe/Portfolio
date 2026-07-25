// components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer reveal">
      <div className="container">
        <div className="footer-content">
          <p className="footer-copyright">
            © {currentYear} Yaman Chapagain. Crafted with 
            <i className="fas fa-heart"></i> 
            in Nepal
          </p>
          
          <div className="footer-links">
            <a href="#home" className="footer-link">Home</a>
            <span className="footer-separator">•</span>
            <a href="#about" className="footer-link">About</a>
            <span className="footer-separator">•</span>
            <a href="#projects" className="footer-link">Projects</a>
            <span className="footer-separator">•</span>
            <a href="#contact" className="footer-link">Contact</a>
            <span className="footer-separator">•</span>
            <a 
              href="https://wa.me/+9779713512703" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-link"
            >
              <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;