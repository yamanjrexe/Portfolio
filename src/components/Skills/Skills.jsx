import React, { useState, useEffect, useRef } from "react";
import { skillsData } from "../../utils/skills";
import "./Skills.css";

const getLevel = (percent) => {
  if (percent >= 90) return "Expert";
  if (percent >= 75) return "Advanced";
  if (percent >= 50) return "Intermediate";
  return "Beginner";
};

const Skills = ({ id }) => {
  const [skills] = useState(skillsData);
  const [activeCategory, setActiveCategory] = useState(skills.categories[0].id);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const categoryIcons = {
    frontend: "fas fa-code",
    backend: "fas fa-server",
    design: "fas fa-palette",
    tools: "fas fa-tools",
  };

  return (
    <section id={id} className="skills reveal" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fas fa-chart-line"></i> What I bring to the table
          </span>
          <h2 className="section-title">Skills &amp; Expertise</h2>
          <div className="section-line"></div>
        </div>

        <div className="skills-tabs">
          {skills.categories.map((category) => (
            <button
              key={category.id}
              className={`skills-tab ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <i className={categoryIcons[category.id] || "fas fa-cog"}></i>
              {category.name}
            </button>
          ))}
        </div>

        <div className="skills-content">
          {skills.categories.map((category) => (
            <div
              key={category.id}
              className={`skills-panel ${activeCategory === category.id ? "active" : ""}`}
            >

              <div className="skills-visualization">
                <div className="skills-grid-mini">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="skill-mini-card">
                      <div className="skill-mini-header">
                        <span className="skill-mini-name">{skill.name}</span>
                        <span className="skill-mini-level">
                          {getLevel(skill.percent)} · {skill.percent}%
                        </span>
                      </div>
                      <div className="skill-mini-progress">
                        <div
                          className="skill-mini-progress-bar"
                          style={{
                            width: animated ? `${skill.percent}%` : "0%",
                            transitionDelay: `${index * 0.05}s`,
                          }}
                        ></div>
                      </div>
                      <span className="skill-mini-years">
                        {skill.years} years experience
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
