import React, { useEffect, useRef, useState } from "react";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export function AnimatedNumber({
  value,
  from = 0,
  duration = 1400,
  delay = 0,
  decimals = 0,
  enabled = true,
  startOnView = false,
  className = "",
  as: Tag = "span",
  ariaLabel,
}) {
  const [display, setDisplay] = useState(from);
  const ref = useRef(null);
  const rafRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const target = Number(value) || 0;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setDisplay(target);
      return;
    }

    if (!enabled || startedRef.current) return;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const startTime = performance.now() + delay;
      const delta = target - from;

      const tick = (now) => {
        const elapsed = now - startTime;
        if (elapsed < 0) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        const t = Math.min(1, elapsed / duration);
        setDisplay(from + delta * easeOutCubic(t));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
        else setDisplay(target);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    if (!startOnView) {
      run();
      return () => cancelAnimationFrame(rafRef.current);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [value, from, duration, delay, enabled, startOnView]);

  const rendered = Number(display).toFixed(decimals);

  return (
    <Tag
      ref={ref}
      className={className}
      aria-label={ariaLabel ?? String(value)}
    >
      <span aria-hidden="true">{rendered}</span>
    </Tag>
  );
}

export default AnimatedNumber;
