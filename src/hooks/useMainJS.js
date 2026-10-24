import { useEffect } from "react";
import { gsap } from "./useGsap";

export default function useMainJS() {
    useEffect(() => {
        /* ---------- 1. Apply data-background-image ---------- */
        document.querySelectorAll(".bg-img").forEach((el) => {
            const img = el.getAttribute("data-background-image");
            if (img) el.style.backgroundImage = `url('${img}')`;
        });

        /* ---------- 2. Hover button parallax ---------- */
        const cleanups = [];
        document.querySelectorAll(".tw-hover-btn-wrapper").forEach((btn) => {
            const target = btn.querySelector(".tw-hover-btn-item");
            if (!target) return;
            const move = (e) => {
                const r = btn.getBoundingClientRect();
                const relX = e.pageX - r.left;
                const relY = e.pageY - r.top;
                gsap.to(target, {
                    duration: 1,
                    x: ((relX - r.width / 2) / r.width) * 60,
                    y: ((relY - r.height / 2) / r.height) * 60,
                    ease: "power2.out",
                });
            };
            const leave = () =>
                gsap.to(target, { duration: 1, x: 0, y: 0, ease: "power2.out" });
            btn.addEventListener("mousemove", move);
            btn.addEventListener("mouseleave", leave);
            cleanups.push(() => {
                btn.removeEventListener("mousemove", move);
                btn.removeEventListener("mouseleave", leave);
            });
        });

        /* ---------- 3. Counter animation ---------- */
        const observers = [];
        document.querySelectorAll(".purecounter").forEach((el) => {
            const end = parseInt(el.getAttribute("data-purecounter-end") || "0", 10);
            const duration = parseFloat(el.getAttribute("data-purecounter-duration") || "2");
            const obj = { val: 0 };
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            gsap.to(obj, {
                                val: end,
                                duration,
                                ease: "power2.out",
                                onUpdate: () => {
                                    el.textContent = Math.round(obj.val);
                                },
                            });
                            io.disconnect();
                        }
                    });
                },
                { threshold: 0.5 }
            );
            io.observe(el);
            observers.push(io);
        });

        /* ---------- 4. Smooth anchor scroll ---------- */
        const onAnchorClick = (e) => {
            const link = e.target.closest && e.target.closest('a[href^="#"]');
            if (!link) return;
            const href = link.getAttribute("href");
            if (!href || href === "#") return;
            e.preventDefault();
            if (href === "#top" || href === "#") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            const el = document.querySelector(href);
            if (!el) return;

            window.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
        };

        document.addEventListener("click", onAnchorClick);

        return () => {
            document.removeEventListener("click", onAnchorClick);
            cleanups.forEach((fn) => fn());
            observers.forEach((io) => io.disconnect());
        };
    }, []);
}