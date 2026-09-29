import React, { useEffect, useState } from "react";
import TextScramble from "../core/TextScramble";
import "./Loading.css";

const STATUSES = ["BOOTING", "LOADING ASSETS", "PREPARING VIEW", "READY"];

const Loading = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(id);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onLoadingComplete, 300);
          }, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(id);
  }, [onLoadingComplete]);

  useEffect(() => {
    const next = Math.min(
      STATUSES.length - 1,
      Math.floor((progress / 100) * STATUSES.length),
    );
    setStatusIndex(next);
  }, [progress]);

  return (
    <div
      className={`loading-screen ${fadeOut ? "fade-out" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${progress} percent`}
    >
      <div className="loading-content">
        <div className="loading-mark" aria-hidden="true">
          Y
        </div>

        <TextScramble
          as="h1"
          className="loading-name"
          speed={45}
          revealDelay={4}
        >
          YAMAN CHAPAGAIN
        </TextScramble>

        <div className="loading-bar-track" aria-hidden="true">
          <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="loading-meta" aria-hidden="true">
          <span className="loading-status">{STATUSES[statusIndex]}</span>
          <span className="loading-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
