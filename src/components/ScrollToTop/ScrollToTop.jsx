// components/ScrollToTop/ScrollToTop.jsx
import { useEffect, useState } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Scroll to top immediately when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollPosition / windowHeight) * 100;
      setProgress(scrollPercent);
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 800;
    const startTime = performance.now();

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);
      window.scrollTo(0, start * (1 - easeProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop} 
          className="scroll-to-top"
          aria-label="Back to top"
        >
          {/* Progress Circle */}
          <svg className="scroll-progress-circle" viewBox="0 0 100 100">
            <circle
              className="scroll-progress-bg"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="3"
            />
            <circle
              className="scroll-progress-fill"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              transform="rotate(-90 50 50)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-secondary)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Arrow Icon */}
          <div className="scroll-arrow">
            <i className="fas fa-arrow-up"></i>
          </div>
          
          {/* Ripple Effect */}
          <span className="scroll-ripple"></span>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;