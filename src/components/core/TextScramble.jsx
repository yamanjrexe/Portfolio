import React, { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#";

export function TextScramble({
  children,
  className = "",
  speed = 35,
  revealDelay = 3,
  charset = CHARS,
  as: Tag = "span",
  onComplete,
}) {
  const text = String(children ?? "");
  const [display, setDisplay] = useState(text);

  const rafRef = useRef(0);
  const startRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setDisplay(text);
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete?.();
      }
      return;
    }

    doneRef.current = false;
    startRef.current = 0;

    const tick = (now) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const frame = Math.floor(elapsed / speed);
      const revealed = Math.min(text.length, Math.floor(frame / revealDelay));

      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < revealed) out += ch;
        else if (ch === " ") out += " ";
        else out += charset[(Math.random() * charset.length) | 0];
      }
      setDisplay(out);

      if (revealed < text.length) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        if (!doneRef.current) {
          doneRef.current = true;
          onComplete?.();
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, speed, revealDelay, charset, onComplete]);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}

export default TextScramble;
