import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = ({ id }) => {
  const [social, setSocial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(0);
  const RATE_LIMIT_MS = 60000;

  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_AUTOREPLY_TEMPLATE_ID =
    process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID;

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    fetch("/data/social.json")
      .then((r) => r.json())
      .then(setSocial)
      .catch((err) => console.error("Error loading social:", err));
  }, [EMAILJS_PUBLIC_KEY]);

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "Enter a valid email";
    if (!formData.message.trim()) next.message = "Message is required";
    else if (formData.message.trim().length < 10)
      next.message = "Message must be at least 10 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getTime = () =>
    new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = Date.now();
    const elapsed = now - lastSubmission;
    if (elapsed < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000);
      setStatus({
        submitted: true,
        success: false,
        message: `Please wait ${wait} second${wait !== 1 ? "s" : ""} before sending again.`,
      });
      setTimeout(() => setStatus((p) => ({ ...p, submitted: false })), 5000);
      return;
    }

    if (!validate()) return;
    setIsSubmitting(true);

    const time = getTime();

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time,
      });

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_TEMPLATE_ID, {
        email: formData.email,
        name: formData.name,
        message: formData.message,
        time,
      });

      setLastSubmission(now);
      setStatus({
        submitted: true,
        success: true,
        message:
          "Message sent. A confirmation is on its way to your inbox. I'll reply within 24 hours.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({
        submitted: true,
        success: false,
        message:
          "Could not send the message. Please email yamanjrexe@gmail.com directly.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus((p) => ({ ...p, submitted: false })), 5000);
    }
  };

  if (!social) {
    return (
      <section id={id} className="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Contact</span>
            <h2 className="section-title">Send a message</h2>
            <div className="section-line" />
          </div>
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
            Loading contact info…
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="contact reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Contact</span>
          <h2 className="section-title">Send a message</h2>
          <div className="section-line" />
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-info-title">Have a project in mind?</h3>
            <p className="contact-info-text">
              Tell me what you&rsquo;re building and I&rsquo;ll reply within 24
              hours.
            </p>

            <div className="contact-detail">
              <div className="contact-icon">
                <i className="fas fa-envelope" aria-hidden="true" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className="contact-label">Email</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href="mailto:yamanjrexe@gmail.com"
                    className="contact-value"
                  >
                    yamanjrexe@gmail.com
                  </a>
                  <CopyEmailButton email="yamanjrexe@gmail.com" />
                </div>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt" aria-hidden="true" />
              </div>
              <div>
                <span className="contact-label">Location</span>
                <span className="contact-value">{social.location}</span>
              </div>
            </div>

            <div className="contact-methods">
              <a
                href="https://wa.me/+9779713512703?text=Hi%20Yaman%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method whatsapp"
              >
                <i className="fab fa-whatsapp" aria-hidden="true" />
                WhatsApp
              </a>
            </div>

            {social.links && social.links.length > 0 && (
              <>
                <h4 className="social-title">Elsewhere</h4>
                <div className="social-grid">
                  {social.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-card"
                    >
                      <i
                        className={`fab fa-${link.platform.toLowerCase()}`}
                        aria-hidden="true"
                      />
                      <span>{link.platform}</span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit} noValidate>
              <h3 className="form-title">Message</h3>

              {status.submitted && (
                <div
                  className={`form-message ${
                    status.success ? "success" : "error"
                  }`}
                  role="status"
                >
                  <i
                    className={`fas ${
                      status.success
                        ? "fa-check-circle"
                        : "fa-exclamation-circle"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{status.message}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={errors.name ? "error" : ""}
                  autoComplete="name"
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={errors.email ? "error" : ""}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What are you working on?"
                  className={errors.message ? "error" : ""}
                />
                {errors.message && (
                  <span className="error-message">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i
                      className="fas fa-circle-notch fa-spin"
                      aria-hidden="true"
                    />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send message</span>
                    <i className="fas fa-paper-plane" aria-hidden="true" />
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

const CopyEmailButton = ({ email }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      className="contact-copy-btn"
      onClick={handleCopy}
      aria-label={copied ? "Email copied" : "Copy email"}
    >
      <i
        className={`fas ${copied ? "fa-check" : "fa-copy"}`}
        aria-hidden="true"
      />
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
};

export default Contact;
