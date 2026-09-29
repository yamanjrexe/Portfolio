import React, { useState, useEffect } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Navbar.css";

const Navbar = ({ activeSection, navigation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();

    document.body.classList.remove("menu-open");
    setIsMobileMenuOpen(false);

    const element = document.getElementById(id);
    if (!element) return;

    const headerHeight =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        ),
        10,
      ) || 72;

    const buffer = 8;
    const top =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      buffer;

    requestAnimationFrame(() => {
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => handleNavClick(e, "home")}
        >
          Yaman Chapagain
        </a>

        <div className="navbar-right">
          <div className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`navbar-link ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <ThemeToggle />

          <button
            className={`navbar-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
