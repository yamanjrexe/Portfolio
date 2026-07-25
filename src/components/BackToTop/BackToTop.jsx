// BackToTop.jsx - With Scroll Reveal
import React, { useState, useEffect } from 'react';
import './BackToTop.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default BackToTop;