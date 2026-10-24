import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText } from "./useGsap";

export default function useAnimations() {
    useEffect(() => {
        if (!gsap) return;

        const ctx = gsap.context(() => {
            /* ---------- 1. Hover button dot follows cursor ---------- */
            document.querySelectorAll(".tw-hover-btn").forEach((btn) => {
                const dot = btn.querySelector(".tw-hover-btn-circle-dot");
                const circleDot = btn.querySelector(".tw-btn-circle-dot");
                const move = (e) => {
                    const r = btn.getBoundingClientRect();
                    const x = e.clientX - r.left;
                    const y = e.clientY - r.top;
                    if (dot) gsap.set(dot, { top: y, left: x });
                    if (circleDot) gsap.set(circleDot, { top: y, left: x });
                };
                btn.addEventListener("mouseenter", move);
                btn.addEventListener("mouseleave", move);
            });

            /* ---------- 2. tw-itm-title (split text invert) ---------- */
            if (SplitText) {
                document.querySelectorAll(".tw-itm-title").forEach((el) => {
                    const split = new SplitText(el, {
                        type: "lines,words,chars",
                        linesClass: "split-line",
                    });
                    if (el.classList.contains("tw-itm-anim")) {
                        gsap.set(split.chars, { opacity: 0.3, x: "-7" });
                    }
                    gsap.to(split.chars, {
                        x: "0",
                        y: "0",
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 92%",
                            end: "top 60%",
                            scrub: 1,
                        },
                    });
                });
            }

            /* ---------- 3. Image clip effect (About section) ---------- */
            const initialClip = [
                "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
                "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
                "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
                "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
                "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
                "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
                "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
                "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
                "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
            ];
            const finalClip = [
                "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
                "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
                "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
                "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
                "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
                "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
                "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
                "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
                "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)",
            ];
            document.querySelectorAll(".tw-clip-anim").forEach((wrapper) => {
                const img = wrapper.querySelector(".tw-anim-img[data-animate='true']");
                if (!img) return;
                wrapper.querySelectorAll(".mask").forEach((m) => m.remove());
                const url = img.src;
                const masks = [];
                for (let i = 0; i < 9; i++) {
                    const m = document.createElement("div");
                    m.className = `mask mask-${i + 1}`;
                    Object.assign(m.style, {
                        backgroundImage: `url(${url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "absolute",
                        inset: "0",
                    });
                    wrapper.appendChild(m);
                    masks.push(m);
                }
                gsap.set(masks, { clipPath: (i) => initialClip[i] });
                const tl = gsap.timeline({
                    scrollTrigger: { trigger: wrapper, start: "top 75%" },
                });
                const order = [
                    [".mask-1"],
                    [".mask-2", ".mask-4"],
                    [".mask-3", ".mask-5", ".mask-7"],
                    [".mask-6", ".mask-8"],
                    [".mask-9"],
                ];
                order.forEach((targets, i) => {
                    const els = targets.map((c) => wrapper.querySelector(c)).filter(Boolean);
                    if (els.length) {
                        tl.to(
                            els,
                            {
                                clipPath: (j, el) => finalClip[masks.indexOf(el)],
                                duration: 1,
                                ease: "power4.out",
                                stagger: 0.1,
                            },
                            i * 0.125,
                        );
                    }
                });
            });

            /* ---------- 4. Hover reveal (What I Build) ---------- */
            document.querySelectorAll(".hover__reveal-item").forEach((item) => {
                const onMove = (e) => {
                    const r = item.getBoundingClientRect();
                    const x = e.clientX - r.left;
                    const y = e.clientY - r.top;
                    const bg = item.querySelector(".hover__reveal-bg");
                    if (bg) bg.style.transform = `translate(${x}px, ${y}px)`;
                };
                item.addEventListener("mousemove", onMove);
            });

            /* ---------- 5. Portfolio three shape pin ---------- */
            if (document.querySelector(".portfolio-three-shape")) {
                gsap.to(".portfolio-three-shape", {
                    scrollTrigger: {
                        trigger: ".portfolio-three-area",
                        start: "top center-=200",
                        pin: ".portfolio-three-shape",
                        end: "bottom bottom-=200",
                        pinSpacing: false,
                        scrub: 1,
                    },
                });
            }

            ScrollTrigger?.refresh?.();
        });

        return () => ctx.revert();
    }, []);
}