import React, { useEffect, useState } from "react";
import "./About.css";

const About = ({ id }) => {
  const [about, setAbout] = useState(null);
  const [profile, setProfile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Used only to force a re-render so the age updates automatically
  const [, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetch("/data/profile.json")
      .then((response) => response.json())
      .then((data) => {
        setAbout(data.about);
        setProfile(data.profile);
      })
      .catch((error) => console.error("Error loading about:", error));
  }, []);

  // Auto update age every minute (changes automatically at midnight)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return "N/A";

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();

    const birthdayThisYear = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    if (today < birthdayThisYear) {
      years--;
    }

    const lastBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    if (today < lastBirthday) {
      lastBirthday.setFullYear(today.getFullYear() - 1);
    }

    const diffTime = today.getTime() - lastBirthday.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return `${years} yrs ${days} days`;
  };

  // Typing animation effect
  useEffect(() => {
    if (!profile) return;

    const nameOptions = [profile.name, profile.nickname || "Yaman Jr"];
    const currentIndex = loopNum % nameOptions.length;
    const fullText = nameOptions[currentIndex];

    const tick = () => {
      if (isDeleting) {
        setDisplayName(fullText.substring(0, displayName.length - 1));
        setTypingSpeed(100);
      } else {
        setDisplayName(fullText.substring(0, displayName.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayName === fullText) {
        setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(100);
        }, 3000);
      } else if (isDeleting && displayName === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayName, isDeleting, loopNum, profile, typingSpeed]);

  if (!about || !profile) return null;

  return (
    <section id={id} className="about reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fas fa-user-astronaut"></i> Get to know me
          </span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line"></div>
        </div>

        <div className="about-grid stagger-children">
          <div className="about-card about-card-large">
            <div className="about-profile">
              <div className="about-image-wrapper">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="about-image"
                />
              </div>

              <div className="about-info">
                <h3 className="about-name typing-animation">
                  {displayName}
                  <span className="typing-cursor"></span>
                </h3>

                <p className="about-role">{profile.role}</p>

                <div className="about-details">
                  <div className="about-detail-item">
                    <span className="detail-label">Age</span>
                    <span className="detail-value">
                      {calculateAge(profile.dob)}
                    </span>
                  </div>

                  <div className="about-detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="about-bio">{about.bio}</p>
          </div>

          <div className="about-card">
            <div className="about-card-header">
              <div className="card-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Goals</h3>
            </div>

            <ul className="goals-list">
              {about.goals.map((goal, index) => (
                <li key={index} className="goal-item">
                  <span className="goal-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="goal-text">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-card about-card-full">
            <div className="about-card-header">
              <div className="card-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>Vision</h3>
            </div>

            <p className="vision-text">{about.vision}</p>

            <div className="vision-quote">
              <i className="fas fa-quote-right quote-icon"></i>
              <p>{about.vision}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
