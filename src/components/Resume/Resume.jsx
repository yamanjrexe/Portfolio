import React, { useEffect, useState } from "react";
import "./Resume.css";

const Resume = ({ id }) => {
  const [resume, setResume] = useState(null);
  const [activeTab, setActiveTab] = useState("experience");

  useEffect(() => {
    fetch("/data/resume.json")
      .then((r) => r.json())
      .then((data) => setResume(data))
      .catch((err) => console.error("Error loading resume:", err));
  }, []);

  if (!resume) return null;

  return (
    <section id={id} className="resume reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Resume</span>
          <h2 className="section-title">Work and education</h2>
          <div className="section-line" />
        </div>

        <div className="resume-summary">
          <p className="resume-summary-text">{resume.summary}</p>
          <div className="resume-actions">
            <a
              href={resume.resumeFile.downloadUrl}
              download
              className="resume-btn resume-btn-primary"
            >
              <i className="fas fa-download" aria-hidden="true" />
              Download CV
            </a>
            <a
              href={resume.resumeFile.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn resume-btn-secondary"
            >
              <i className="fas fa-eye" aria-hidden="true" />
              View online
            </a>
          </div>
        </div>

        <div
          className="resume-tabs"
          role="tablist"
          aria-label="Resume sections"
        >
          <button
            role="tab"
            aria-selected={activeTab === "experience"}
            className={`resume-tab ${
              activeTab === "experience" ? "active" : ""
            }`}
            onClick={() => setActiveTab("experience")}
          >
            <i className="fas fa-briefcase" aria-hidden="true" />
            Experience
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "education"}
            className={`resume-tab ${
              activeTab === "education" ? "active" : ""
            }`}
            onClick={() => setActiveTab("education")}
          >
            <i className="fas fa-graduation-cap" aria-hidden="true" />
            Education
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "certifications"}
            className={`resume-tab ${
              activeTab === "certifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("certifications")}
          >
            <i className="fas fa-certificate" aria-hidden="true" />
            Certifications
          </button>
        </div>

        <div className="resume-content">
          <div
            role="tabpanel"
            className={`resume-panel ${
              activeTab === "experience" ? "active" : ""
            }`}
          >
            <div className="timeline">
              {resume.experience.map((exp, index) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-marker">
                    <span className="timeline-dot" />
                    {index < resume.experience.length - 1 && (
                      <span className="timeline-line" />
                    )}
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div>
                        <h3 className="timeline-title">{exp.title}</h3>
                        <p className="timeline-company">{exp.company}</p>
                      </div>
                      <span className="timeline-date">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="timeline-description">{exp.description}</p>
                    {exp.achievements && (
                      <ul className="timeline-achievements">
                        {exp.achievements.map((item, i) => (
                          <li key={i}>
                            <i
                              className="fas fa-check-circle"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            role="tabpanel"
            className={`resume-panel ${
              activeTab === "education" ? "active" : ""
            }`}
          >
            <div className="education-grid">
              {resume.education.map((edu) => (
                <div key={edu.id} className="education-card">
                  <div className="education-icon">
                    <i className="fas fa-school" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="education-degree">{edu.degree}</h3>
                    <p className="education-institution">{edu.institution}</p>
                    <p className="education-year">{edu.graduationYear}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            role="tabpanel"
            className={`resume-panel ${
              activeTab === "certifications" ? "active" : ""
            }`}
          >
            <div className="certifications-grid">
              {resume.certifications.map((cert, index) => (
                <div key={index} className="certification-card">
                  <div className="certification-icon">
                    <i className="fas fa-award" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="certification-name">{cert.name}</h3>
                    <p className="certification-issuer">{cert.issuer}</p>
                    <p className="certification-year">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
