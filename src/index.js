// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/variables.css';
import './styles/global.css';
import './styles/utilities.css';
import './styles/animations.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Disable scroll restoration for the entire app
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Force scroll to top before rendering
window.scrollTo(0, 0);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);