// ThemeToggle.jsx - Updated with Font Awesome
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle-track">
        <div className={`theme-toggle-thumb ${theme}`}>
          <i className={`theme-icon fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;