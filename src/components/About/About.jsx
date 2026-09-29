import React, { useEffect, useState } from "react";
import "./About.css";

const About = ({ id }) => {
  const [about, setAbout] = useState(null);
  const [profile, setProfile] = useState(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    fetch("/data/profile.json")
      .then((r) => r.json())
      .then((data) => {
        setAbout(data.about);
        setProfile(data.profile);
      })
      .catch((err) => console.error("Error loading about:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birth = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    const birthday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate(),
    );
    if (today < birthday) years--;

    const lastBirthday = new Date(birthday);
    if (today < lastBirthday) lastBirthday.setFullYear(today.getFullYear() - 1);

    const days = Math.floor(
      (today.getTime() - lastBirthday.getTime()) / (1000 * 60 * 60 * 24),
    );

    return `${years}y ${days}d`;
  };

  if (!about || !profile) return null;

  return (
    <section id={id} className="about reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">About</span>
          <h2 className="section-title">A short introduction</h2>
          <div className="section-line" />
        </div>

        <div className="about-grid stagger-children">
          <div className="about-card">
            <div className="about-profile">
              <img
                src={profile.photo}
                alt={profile.name}
                className="about-image"
              />
              <div>
                <h3 className="about-name">{profile.name}</h3>
                <p className="about-role">{profile.role}</p>
              </div>
            </div>

            <p className="about-bio">{about.bio}</p>

            <div className="about-meta">
              <div className="about-meta-item">
                <span className="meta-label">Age</span>
                <span className="meta-value">{calculateAge(profile.dob)}</span>
              </div>
              <div className="about-meta-item">
                <span className="meta-label">Location</span>
                <span className="meta-value">{profile.location}</span>
              </div>
            </div>
          </div>

          <div className="about-card">
            <h3 className="about-section-title">What I&rsquo;m working on</h3>
            <ul className="about-list">
              {about.goals.map((goal, index) => (
                <li key={index} className="about-list-item">
                  <span className="about-list-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
