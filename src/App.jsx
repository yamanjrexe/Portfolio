import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Preloader from "./components/Preloader";
import MagicCursor from "./components/MagicCursor";
import BackToTop from "./components/BackToTop";
import Header from "./components/Header";
import OffcanvasMenu from "./components/OffcanvasMenu";
import Hero from "./components/Hero";
import About from "./components/About";
import Marquee from "./components/Marquee";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import WhatIBuild from "./components/WhatIBuild";
import Footer from "./components/Footer";

import { ScrollTrigger, ScrollSmoother } from "./hooks/useGsap";
import useAnimations from "./hooks/useAnimations";
import useMainJS from "./hooks/useMainJS";

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const smootherRef = useRef(null);

    useAnimations();
    useMainJS();

    useEffect(() => {
        if (window.location.hash) {
            window.history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search,
            );
        }

        try {
            if (AOS?.init)
                AOS.init({
                    once: false,
                    offset: 0,
                    anchorPlacement: "top-bottom",
                });
        } catch (e) {
            console.warn("AOS:", e);
        }

        try {
            if (
                ScrollSmoother &&
                typeof ScrollSmoother.create === "function" &&
                document.querySelector("#smooth-wrapper") &&
                document.querySelector("#smooth-content")
            ) {
                smootherRef.current = ScrollSmoother.create({
                    smoothTouch: 0.2,
                    smooth: 4,
                    effects: true,
                    normalizeScroll: false,
                    ignoreMobileResize: true,
                });
            }
        } catch (e) {
            console.warn("ScrollSmoother:", e);
        }

        const refresh = () => {
            try {
                ScrollTrigger?.refresh?.();
            } catch {}
        };
        window.addEventListener("load", refresh);
        const t1 = setTimeout(refresh, 500);
        const t2 = setTimeout(refresh, 1500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            window.removeEventListener("load", refresh);
            smootherRef.current?.kill?.();
        };
    }, []);

    return (
        <div className="app-root">
            <Preloader />
            <div className="overlay" />
            <div className="side-overlay" />
            <MagicCursor />
            <div id="toast-container" />
            <BackToTop />
            <OffcanvasMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <Header onOpenMenu={() => setMenuOpen(true)} />
                    <Hero />
                    <About />
                    <Marquee />
                    <Expertise />
                    <Projects />
                    <WhatIBuild />
                    <Footer />
                </div>
            </div>
        </div>
    );
}
