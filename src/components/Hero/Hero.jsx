// components/Hero/Hero.jsx
import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = ({ id }) => {
  const [profile, setProfile] = useState(null);
  
  // Typing animation states
  const [displayRole, setDisplayRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typing animation effect (roleOptions moved inside useEffect)
  useEffect(() => {
    const roleOptions = ["Web Developer", "Video Editor"];
    
    const currentIndex = loopNum % roleOptions.length;
    const fullText = roleOptions[currentIndex];

    const tick = () => {
      if (isDeleting) {
        setDisplayRole(fullText.substring(0, displayRole.length - 1));
        setTypingSpeed(100);
      } else {
        setDisplayRole(fullText.substring(0, displayRole.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayRole === fullText) {
        setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(100);
        }, 3000);
      } else if (isDeleting && displayRole === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayRole, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    fetch('/data/profile.json')
      .then(response => response.json())
      .then(data => setProfile(data.hero))
      .catch(error => console.error('Error loading profile:', error));
  }, []);

  const handleCTAClick = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  if (!profile) return null;

  return (
    <section id={id} className="hero reveal">
      <div className="hero-background">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
        <div className="hero-shape shape-4"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          
          <h1 className="hero-title">
            <span className="hero-title-line">Creating digital</span>
            <span className="hero-title-gradient">experiences</span>
            <span className="hero-title-line">that matter</span>
          </h1>
          
          {/* Typing Animation - Same style as About.jsx */}
          <div className="hero-typing-section">
            <span className="hero-typing-prefix">I'm a</span>
            <div className="hero-typing-wrapper">
              <span className="hero-typing-role">{displayRole}</span>
              <span className="hero-typing-cursor"></span>
            </div>
          </div>
          
          <p className="hero-description">{profile.tagline}</p>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">2+</span>
              <span className="hero-stat-label">Years Coding</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">4+</span>
              <span className="hero-stat-label">Years Editing</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">10+</span>
              <span className="hero-stat-label">Projects</span>
            </div>
          </div>
          
          <div className="hero-actions">
            <a 
              href={profile.cta.projects}
              className="hero-btn hero-btn-primary"
              onClick={(e) => handleCTAClick(e, profile.cta.projects)}
            >
              <i className="fas fa-arrow-right"></i>
              View My Work
            </a>
            <a 
              href={profile.cta.contact}
              className="hero-btn hero-btn-secondary"
              onClick={(e) => handleCTAClick(e, profile.cta.contact)}
            >
              <i className="fas fa-paper-plane"></i>
              Let's Talk
            </a>
            <a 
              href="https://wa.me/9779713512703?text=Hi!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20collaborate!"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-whatsapp"
            >
              <i className="fab fa-whatsapp"></i>
              WhatsApp Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;