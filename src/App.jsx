// App.jsx
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Resume from "./components/Resume/Resume";
import Gallery from "./components/Gallery/Gallery";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/BackToTop/BackToTop";
import Loading from "./components/Loading/Loading";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import WhatsApp from "./components/WhatsApp/WhatsApp";
import { ScrollProgress } from "./components/core/ScrollProgress";
import { useScrollActive } from "./hooks/useScrollActive";

function App() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [hasGallery, setHasGallery] = useState(false);

  const sectionIds = [
    "home",
    "about",
    "skills",
    "projects",
    "resume",
    ...(hasGallery ? ["gallery"] : []),
    "contact",
  ];
  const activeSection = useScrollActive(showContent ? sectionIds : []);

  useEffect(() => {
    fetch("/data/config.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load config");
        return response.json();
      })
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading config:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((r) => r.json())
      .then((d) =>
        setHasGallery(Array.isArray(d.images) && d.images.length > 0),
      )
      .catch(() => setHasGallery(false));
  }, []);

  const handleLoadingComplete = () => {
    setShowContent(true);
    setTimeout(() => {
      const reveals = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("active");
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );
      reveals.forEach((reveal) => observer.observe(reveal));
    }, 100);
  };

  if (!config && !loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "var(--bg)",
          color: "var(--danger)",
        }}
      >
        Failed to load configuration
      </div>
    );
  }

  const filteredNavigation = config
    ? (config.navigation || []).filter(
        (item) => item.id !== "gallery" || hasGallery,
      )
    : [];

  return (
    <ThemeProvider>
      <ScrollToTop />

      {!showContent && <Loading onLoadingComplete={handleLoadingComplete} />}

      <div
        className="app"
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {config && (
          <>
            <ScrollProgress />
            <Navbar
              activeSection={activeSection}
              navigation={filteredNavigation}
            />
            <main>
              <Hero id="home" />
              <About id="about" />
              <Skills id="skills" />
              <Projects id="projects" />
              <Resume id="resume" />
              {hasGallery && <Gallery id="gallery" />}
              <Contact id="contact" />
            </main>
            <Footer />
            <BackToTop />
            <WhatsApp />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
