import React, { useEffect, useState } from "react";

export function ScrollProgress({
  containerRef,
  className = "",
  height = 2,
  color = "var(--accent, #1e40af)",
  showTrack = true,
  zIndex = 9998,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = containerRef?.current;
    const isContainer = Boolean(target);

    const read = () => {
      if (isContainer) {
        const max = target.scrollHeight - target.clientHeight;
        const value = max > 0 ? (target.scrollTop / max) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, value)));
        return;
      }
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const value = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
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

  const style = {
    height: `${height}px`,
    backgroundColor: color,
    width: `${progress}%`,
    transition: "width 80ms linear",
    willChange: "width",
    borderRadius: "9999px",
    position: isContainerMode(containerRef) ? "absolute" : "fixed",
    top: 0,
    left: 0,
    zIndex,
  };

  return (
    <>
      {showTrack && (
        <div
          aria-hidden="true"
          style={{
            height: `${height}px`,
            position: isContainerMode(containerRef) ? "absolute" : "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex,
          }}
        />
      )}
      <div
        className={className}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        style={style}
      />
    </>
  );
}

function isContainerMode(containerRef) {
  return Boolean(containerRef?.current);
}

export default ScrollProgress;
