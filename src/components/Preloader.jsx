import React, { useEffect, useRef } from "react";
import { gsap } from "../hooks/useGsap";

export default function Preloader() {
    const preloaderRef = useRef(null);
    const svgPathRef = useRef(null);

    useEffect(() => {
        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        const tl = gsap.timeline();
        tl.to(".preloader-heading .load-text", {
            delay: 1,
            y: -80,
            opacity: 0,
            duration: 0.6,
        })
            .to(svgPathRef.current, {
                duration: 0.6,
                attr: { d: curve },
                ease: "power2.inOut",
            })
            .to(svgPathRef.current, {
                duration: 0.6,
                attr: { d: flat },
                ease: "power2.inOut",
            })
            .to(preloaderRef.current, {
                y: "-130%",
                duration: 0.8,
                ease: "power4.inOut",
            })
            .set(preloaderRef.current, { display: "none", zIndex: -1 });

        return () => tl.kill();
    }, []);

    return (
        <div className="preloader" ref={preloaderRef}>
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <path
                    id="preloaderSvg"
                    ref={svgPathRef}
                    d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
                />
            </svg>
            <div className="preloader-heading">
                <div className="load-text">
                    {["Y", "A", "M", "A", "N", " ", "J", "R"].map((c, i) => (  
                        <span key={i}>{c}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
