import React, { useEffect, useState } from "react";
import GlowCursor from "../core/GlowCursor";
import AnimatedNumber from "../core/AnimatedNumber";
import { useTheme } from "../../context/ThemeContext";
import "./Hero.css";

const STATS = [
  { value: 2, suffix: "+", label: "Years coding" },
  { value: 4, suffix: "+", label: "Years editing" },
  { value: 10, suffix: "+", label: "Projects shipped" },
];

const Hero = ({ id, play = true }) => {
  const { theme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [displayRole, setDisplayRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  const isDark = theme === "dark";

  const glow = isDark
    ? { color: "#e63946", secondary: "#7a0a1a", hotspot: 0.7, brightness: 1.3 }
    : { color: "#c8102e", secondary: "#7a0a1a", hotspot: 0.5, brightness: 1.1 };

  useEffect(() => {
    const roles = ["Web Developer", "Video Editor"];
    const fullText = roles[loopNum % roles.length];

    const tick = () => {
      if (isDeleting) {
        setDisplayRole(fullText.substring(0, displayRole.length - 1));
        setTypingSpeed(70);
      } else {
        setDisplayRole(fullText.substring(0, displayRole.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && displayRole === fullText) {
        setTimeout(() => setIsDeleting(true), 2200);
      } else if (isDeleting && displayRole === "") {
        setIsDeleting(false);
        setLoopNum((n) => n + 1);
      }
    };

    const timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayRole, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    fetch("/data/profile.json")
      .then((r) => r.json())
      .then((data) => setProfile(data.hero))
      .catch((err) => console.error("Error loading profile:", err));
  }, []);

  const handleCTAClick = (e, target) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!profile) return null;

  return (
    <section id={id} className="hero reveal">
      <GlowCursor
        color={glow.color}
        secondaryColor={glow.secondary}
        trailLength={44}
        trailWidth={7}
        trailTaper={0.85}
        followSpeed={0.18}
        glowIntensity={1.6}
        glowSpread={1.2}
        hotspot={glow.hotspot}
        brightness={glow.brightness}
        opacity={0.9}
        pulseSpeed={1}
        noiseStrength={0.03}
        idleFade
        idleTimeout={900}
        fadeDuration={700}
        blendMode={isDark ? "screen" : "normal"}
        maxDevicePixelRatio={1.5}
      >
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="hero-eyebrow">Available for work</span>

            <h1 className="hero-title">
              Hi, I&rsquo;m Yaman. I build for the web and edit video.
            </h1>

            <p className="hero-description">
              Currently working as a{" "}
              <span className="hero-typing-role">
                {displayRole}
                <span className="hero-typing-cursor" aria-hidden="true" />
              </span>
              . Based in Nepal, working with clients worldwide.
            </p>

            <div className="hero-stats">
              {STATS.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <span className="hero-stat-number">
                    <AnimatedNumber
                      value={stat.value}
                      duration={1400}
                      enabled={play}
                      startOnView={false}
                    />
                    <span aria-hidden="true">{stat.suffix}</span>
                  </span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="hero-actions">
              <a
                href={profile.cta.projects}
                className="hero-btn hero-btn-primary"
                onClick={(e) => handleCTAClick(e, profile.cta.projects)}
              >
                View projects
              </a>
              <a
                href={profile.cta.contact}
                className="hero-btn hero-btn-secondary"
                onClick={(e) => handleCTAClick(e, profile.cta.contact)}
              >
                Get in touch
              </a>
              <a
                href="https://wa.me/9779713512703?text=Hi%20Yaman%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn hero-btn-secondary"
              >
                <i className="fab fa-whatsapp" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </GlowCursor>
    </section>
  );
};

export default Hero;
