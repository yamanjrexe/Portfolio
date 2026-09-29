import { useState, useEffect } from "react";

export const useScrollActive = (sectionIds) => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const determine = () => {
      const scrollPosition = window.scrollY + 120;

      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { offsetTop, offsetHeight } = el;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(id);
          return;
        }
      }

      const last = document.getElementById(sectionIds[sectionIds.length - 1]);
      if (
        last &&
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
      }
    };

    determine();
    window.addEventListener("scroll", determine, { passive: true });
    window.addEventListener("resize", determine);
    return () => {
      window.removeEventListener("scroll", determine);
      window.removeEventListener("resize", determine);
    };
  }, [sectionIds]);

  return activeSection;
};