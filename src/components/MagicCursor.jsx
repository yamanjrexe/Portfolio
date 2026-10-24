import React, { useEffect, useRef } from "react";
import { gsap } from "../hooks/useGsap";

export default function MagicCursor() {
    const ballRef = useRef(null);

    useEffect(() => {
        // Only on non-mobile
        if (window.matchMedia("(hover: none)").matches) return;

        const ball = ballRef.current;
        if (!ball) return;

        const $mouse = { x: 0, y: 0 };
        const $pos = { x: 0, y: 0 };
        const ratio = 0.15;

        gsap.set(ball, {
            xPercent: -50,
            yPercent: -50,
            width: 5,
            height: 5,
            opacity: 1,
        });

        const onMove = (e) => {
            $mouse.x = e.clientX;
            $mouse.y = e.clientY;
        };
        document.addEventListener("mousemove", onMove);

        const update = () => {
            $pos.x += ($mouse.x - $pos.x) * ratio;
            $pos.y += ($mouse.y - $pos.y) * ratio;
            gsap.set(ball, { x: $pos.x, y: $pos.y });
        };
        gsap.ticker.add(update);

        const hide = () =>
            gsap.to(ball, { duration: 0.3, scale: 0, opacity: 0 });
        const show = () =>
            gsap.to(ball, { duration: 0.3, scale: 1, opacity: 1 });

        const hoverTargets = document.querySelectorAll(
            "a, button, .tw-cart-minus, .tw-cart-plus",
        );
        hoverTargets.forEach((el) => {
            el.addEventListener("mouseenter", hide);
            el.addEventListener("mouseleave", show);
        });

        const onLeaveDoc = () =>
            gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
        const onEnterDoc = () =>
            gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
        document.addEventListener("mouseleave", onLeaveDoc);
        document.addEventListener("mouseenter", onEnterDoc);

        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeaveDoc);
            document.removeEventListener("mouseenter", onEnterDoc);
            gsap.ticker.remove(update);
            hoverTargets.forEach((el) => {
                el.removeEventListener("mouseenter", hide);
                el.removeEventListener("mouseleave", show);
            });
        };
    }, []);

    return (
        <div id="magic-cursor">
            <div id="ball" ref={ballRef}></div>
        </div>
    );
}
