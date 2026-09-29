import React, { useEffect, useState } from "react";

export function ScrollProgress({
  containerRef,
  className = "",
  height = 2,
  zIndex = 9998,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = containerRef?.current;
    const isContainer = Boolean(target);

    const read = () => {
      if (isContainer) {
        const max = target.scrollHeight - target.clientHeight;
        setProgress(
          max > 0 ? Math.min(100, (target.scrollTop / max) * 100) : 0,
        );
        return;
      }
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0);
    };

    const source = isContainer ? target : window;
    source.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    read();

    return () => {
      source.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [containerRef]);

  return (
    <div
      className={className}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: `${height}px`,
        width: `${progress}%`,
        background: "var(--accent)",
        zIndex,
        transition: "width 60ms linear",
        pointerEvents: "none",
      }}
    />
  );
}

export default ScrollProgress;
