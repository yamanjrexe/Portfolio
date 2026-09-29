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
      ([entry]) => {
        if (entry.isIntersecting && !animated) setAnimated(true);
      },
      { threshold: 0.15 },
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
          <span className="section-subtitle">Skills</span>
          <h2 className="section-title">Tools I use day to day</h2>
          <div className="section-line" />
        </div>

        <div
          className="skills-tabs"
          role="tablist"
          aria-label="Skill categories"
        >
          {skills.categories.map((category) => (
            <button
              key={category.id}
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`skills-tab ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <i
                className={categoryIcons[category.id] || "fas fa-cog"}
                aria-hidden="true"
              />
              {category.name}
            </button>
          ))}
        </div>

        <div className="skills-content">
          {skills.categories.map((category) => (
            <div
              key={category.id}
              role="tabpanel"
              className={`skills-panel ${
                activeCategory === category.id ? "active" : ""
              }`}
            >
              <div className="skills-grid">
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-card">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">
                        {getLevel(skill.percent)} · {skill.percent}%
                      </span>
                    </div>
                    <div
                      className="skill-progress"
                      role="progressbar"
                      aria-valuenow={skill.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency`}
                    >
                      <div
                        className="skill-progress-bar"
                        style={{
                          width: animated ? `${skill.percent}%` : "0%",
                          transitionDelay: `${index * 40}ms`,
                        }}
                      />
                    </div>
                    <span className="skill-years">
                      {skill.years} {skill.years === 1 ? "year" : "years"}{" "}
                      experience
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
