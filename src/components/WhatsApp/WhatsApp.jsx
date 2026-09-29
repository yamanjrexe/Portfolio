import React, { useEffect, useState } from "react";
import "./WhatsApp.css";

const WhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const url =
    "https://wa.me/+9779713512703?text=Hi%20Yaman%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20talk.";

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="whatsapp-float">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp" aria-hidden="true" />
      </a>
    </div>
  );
};

export default WhatsApp;
