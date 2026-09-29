"use client";

import { useEffect, useRef, useState } from "react";
import "./CountUp.css";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 1.4,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}) {
  const [value, setValue] = useState(direction === "down" ? to : from);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  const target = direction === "down" ? from : to;
  const start = direction === "down" ? to : from;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setValue(target);
      return;
    }

    let raf = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      setHasStarted(true);
      onStart?.();

      const startTime = performance.now() + delay * 1000;
      const delta = target - start;

      const tick = (now) => {
        const elapsed = now - startTime;
        if (elapsed < 0) {
          raf = requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(1, elapsed / (duration * 1000));
        const eased = easeOutExpo(progress);
        setValue(Math.round(start + delta * eased));

        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setValue(target);
          onEnd?.();
        }
      };

      raf = requestAnimationFrame(tick);
    };

    if (!startWhen) {
      run();
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, start, delay, duration, startWhen, onStart, onEnd]);

  const formatted = separator
    ? value.toLocaleString("en-US").replace(/,/g, separator)
    : value.toLocaleString("en-US");

  return (
    <span ref={ref} className={`count-up ${className}`}>
      {formatted}
    </span>
  );
}
