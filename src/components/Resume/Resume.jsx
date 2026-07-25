// Resume.jsx - With Scroll Reveal
import React, { useEffect, useState } from 'react';
import './Resume.css';

const Resume = ({ id }) => {
  const [resume, setResume] = useState(null);
  const [activeTab, setActiveTab] = useState('experience');

  useEffect(() => {
    fetch('/data/resume.json')
      .then(response => response.json())
      .then(data => setResume(data))
      .catch(error => console.error('Error loading resume:', error));
  }, []);

  if (!resume) return null;

  return (
    <section id={id} className="resume reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fas fa-briefcase"></i> My journey so far
          </span>
          <h2 className="section-title">Experience & Education</h2>
          <div className="section-line"></div>
        </div>

        <div className="resume-summary-card">
          <p className="resume-summary-text">{resume.summary}</p>
          <div className="resume-actions">
            <a href={resume.resumeFile.downloadUrl} download className="resume-btn resume-btn-primary">
              <i className="fas fa-download"></i> Download CV
            </a>
            <a href={resume.resumeFile.viewUrl} target="_blank" rel="noopener noreferrer" className="resume-btn resume-btn-secondary">
              <i className="fas fa-eye"></i> View Online
            </a>
          </div>
        </div>

        <div className="resume-tabs">
          <button className={`resume-tab ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
            <i className="fas fa-briefcase"></i> Work Experience
          </button>
          <button className={`resume-tab ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>
            <i className="fas fa-graduation-cap"></i> Education
          </button>
          <button className={`resume-tab ${activeTab === 'certifications' ? 'active' : ''}`} onClick={() => setActiveTab('certifications')}>
            <i className="fas fa-certificate"></i> Certifications
          </button>
        </div>

        <div className="resume-content">
          <div className={`resume-panel ${activeTab === 'experience' ? 'active' : ''}`}>
            <div className="timeline stagger-children">
              {resume.experience.map((exp, index) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-marker">
                    <span className="timeline-dot"></span>
                    {index < resume.experience.length - 1 && <span className="timeline-line"></span>}
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div>
                        <h3 className="timeline-title">{exp.title}</h3>
                        <p className="timeline-company">{exp.company}</p>
                      </div>
                      <span className="timeline-date">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="timeline-description">{exp.description}</p>
                    {exp.achievements && (
                      <ul className="timeline-achievements">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}><i className="fas fa-check-circle"></i> {achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`resume-panel ${activeTab === 'education' ? 'active' : ''}`}>
            <div className="education-grid stagger-children">
              {resume.education.map((edu) => (
                <div key={edu.id} className="education-card">
                  <div className="education-card-icon"><i className="fas fa-school"></i></div>
                  <div>
                    <h3 className="education-degree">{edu.degree}</h3>
                    <p className="education-institution">{edu.institution}</p>
                    <p className="education-year"><i className="far fa-calendar-alt"></i> {edu.graduationYear}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`resume-panel ${activeTab === 'certifications' ? 'active' : ''}`}>
            <div className="certifications-grid stagger-children">
              {resume.certifications.map((cert, index) => (
                <div key={index} className="certification-card">
                  <div className="certification-icon"><i className="fas fa-award"></i></div>
                  <div>
                    <h3 className="certification-name">{cert.name}</h3>
                    <p className="certification-issuer">{cert.issuer}</p>
                    <p className="certification-year"><i className="far fa-calendar-alt"></i> {cert.year}</p>
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