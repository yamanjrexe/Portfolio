// Loading.jsx - Modern Loading Screen (Fixed ESLint Warning)
import React, { useEffect, useState } from 'react';
import './Loading.css';

const Loading = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingText, setLoadingText] = useState('Initializing');

  const loadingMessages = [
    'Initializing',
    'Loading modules',
    'Setting up environment',
    'Preparing assets',
    'Almost ready',
    'Welcome!'
  ];

  useEffect(() => {
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex++;
      if (textIndex < loadingMessages.length) {
        setLoadingText(loadingMessages[textIndex]);
      }
    }, 800);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(textInterval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onLoadingComplete, 600);
          }, 400);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        {/* Animated Logo */}
        <div className="loading-logo">
          <div className="loading-logo-icon">
            <i className="fas fa-code"></i>
          </div>
          <div className="loading-logo-text">
            <span className="loading-letter">Y</span>
            <span className="loading-letter">C</span>
          </div>
        </div>

        {/* Name */}
        <h1 className="loading-name">Yaman Chapagain</h1>
        
        {/* Animated Progress Bar */}
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}>
            <div className="loading-bar-shimmer"></div>
          </div>
        </div>
        
        {/* Progress Percentage */}
        <div className="loading-percentage">{progress}%</div>
        
        {/* Loading Message */}
        <p className="loading-message">
          <i className="fas fa-spinner fa-pulse"></i>
          {loadingText}...
        </p>
      </div>
    </div>
  );
};

export default Loading;