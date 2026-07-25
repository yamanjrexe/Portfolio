// components/WhatsApp/WhatsApp.jsx
import React, { useState, useEffect } from 'react';
import './WhatsApp.css';

const WhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Your WhatsApp number
  const phoneNumber = '+9779713512703';
  const defaultMessage = encodeURIComponent(
    "Hi! I visited your portfolio and would like to connect. 👋"
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div 
          className={`whatsapp-float ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="whatsapp-tooltip">
            <span>Let's chat on WhatsApp! 💬</span>
          </div>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
            aria-label="Chat on WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
            {isHovered && <span className="whatsapp-text">Chat with me</span>}
          </a>
          
          <div className="whatsapp-pulse-ring"></div>
        </div>
      )}
    </>
  );
};

export default WhatsApp;