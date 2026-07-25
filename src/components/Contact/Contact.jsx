// components/Contact/Contact.jsx
import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = ({ id }) => {
  const [social, setSocial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(0);
  const RATE_LIMIT_MS = 60000; // 1 minute

  // EmailJS credentials from environment variables
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    fetch('/data/social.json')
      .then(response => response.json())
      .then(data => setSocial(data))
      .catch(error => console.error('Error loading social:', error));
  }, [EMAILJS_PUBLIC_KEY]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Rate limiting check
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmission;
    
    if (timeSinceLastSubmission < RATE_LIMIT_MS) {
      const waitSeconds = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmission) / 1000);
      setFormStatus({
        submitted: true,
        success: false,
        message: `⏳ Please wait ${waitSeconds} second${waitSeconds !== 1 ? 's' : ''} before sending another message.`
      });
      
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
      return;
    }
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: getCurrentTime()
    };
    
    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully:', response);
      
      setLastSubmission(now); // Update last submission time
      
      setFormStatus({
        submitted: true,
        success: true,
        message: '✓ Message sent successfully! I\'ll get back to you within 24 hours.'
      });
      
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      setFormStatus({
        submitted: true,
        success: false,
        message: '✗ Failed to send message. Please try again or email me directly at jryaman100@gmail.com'
      });
      
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
    }
  };

  if (!social) {
    return (
      <section id={id} className="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Get in touch</span>
            <h2 className="section-title">Contact Me</h2>
            <div className="section-line"></div>
          </div>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <i className="fas fa-spinner fa-pulse"></i> Loading...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="contact reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fas fa-envelope"></i> Get in touch
          </span>
          <h2 className="section-title">Let's Work Together</h2>
          <div className="section-line"></div>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-info-title">Have a project in mind?</h3>
            <p className="contact-info-text">
              I'm always interested in hearing about new opportunities and creative projects.
              Let's collaborate and build something amazing together!
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                <div>
                  <span className="contact-label">Email</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <a href="mailto:yamanjrexe@gmail.com" className="contact-value">yamanjrexe@gmail.com</a>
                    <CopyEmailButton email="jryaman100@gmail.com" />
                  </div>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <span className="contact-label">Location</span>
                  <span className="contact-value">{social.location}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Contact Card */}
            <div className="whatsapp-contact-card">
              <div className="whatsapp-contact-icon">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div className="whatsapp-contact-content">
                <h4>Quick Chat on WhatsApp</h4>
                <p>Get a faster response. Click below to start a conversation!</p>
                <a 
                  href="https://wa.me/+9779713512703?text=Hi%20Yaman%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-contact-btn"
                >
                  <i className="fab fa-whatsapp"></i> Chat Now
                </a>
              </div>
            </div>

            <div>
              <h4 className="social-title">Connect with me</h4>
              <div className="social-grid">
                {social.links && social.links.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-card">
                    <i className={`fab fa-${link.platform.toLowerCase()}`}></i>
                    <span className="social-platform">{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit}>
              <h3 className="form-title">Send a Message</h3>
              
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.success ? 'success' : 'error'}`}>
                  <i className={`fas ${formStatus.success ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                  <span>{formStatus.message}</span>
                </div>
              )}
              
              <div className="form-group">
                <label><i className="fas fa-user"></i> Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && (
                  <span className="error-message">
                    <i className="fas fa-exclamation-circle"></i> {errors.name}
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label><i className="fas fa-envelope"></i> Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <span className="error-message">
                    <i className="fas fa-exclamation-circle"></i> {errors.email}
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label><i className="fas fa-comment"></i> Message</label>
                <textarea 
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && (
                  <span className="error-message">
                    <i className="fas fa-exclamation-circle"></i> {errors.message}
                  </span>
                )}
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-pulse"></i>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Copy Email Button Component
const CopyEmailButton = ({ email }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      style={{
        background: 'var(--gradient-primary)',
        border: 'none',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        color: 'white',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
};

export default Contact;