import React, { useEffect, useState } from "react";

const NAV = [
    { href: "#about", label: "About" },
    { href: "#expertise", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#what-i-build", label: "What I Build" },
    { href: "#contact", label: "Contact" },
];

export default function Header({ onOpenMenu }) {
    const [fixed, setFixed] = useState(false);

    useEffect(() => {
        const onScroll = () => setFixed(window.scrollY >= 260);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const smoothScroll = (e, href) => {
        e.preventDefault();
        const el =
            href === "body" ? document.body : document.querySelector(href);
        if (el) {
            const top = href === "body" ? 0 : el.offsetTop - 90;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <header
            className={`header header-two header-three tw-transition-all tw-z-99 position-relative ${
                fixed ? "fixed-header" : ""
            }`}
        >
            <div className="container tw-container-1800-px">
                <nav className="d-flex align-items-center justify-content-between position-relative">
                    <div className="header-three-logo tw-rounded-md">
                        <a
                            href="#top"
                            className="link text-decoration-none"
                            onClick={(e) => smoothScroll(e, "body")}
                        >
                            <h2 className="text-heading fw-bold tw-mb-0 tracking-wider">
                                Yaman Jr
                            </h2>
                        </a>
                    </div>

                    <div className="header-menu d-none d-lg-block">
                        <div className="main-menu">
                            <nav className="tw-main-menu-content">
                                <ul className="d-flex tw-gap-8 list-unstyled tw-mb-0 align-items-center">
                                    {NAV.map((item) => (
                                        <li key={item.href}>
                                            <a
                                                href={item.href}
                                                onClick={(e) =>
                                                    smoothScroll(e, item.href)
                                                }
                                                className="text-black fw-bold text-decoration-none tw-text-lg hover-text-main-two-600"
                                                style={{
                                                    color: "#111111",
                                                    fontSize: "1.1rem",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="header-right d-flex align-items-center tw-gap-705">
                        <div className="header-three-menu">
                            <button
                                className="tw-offcanvas-open-btn tw-w-13 tw-h-13 lh-1 d-inline-flex justify-content-center align-items-center tw-transition-3 tw-rounded-md"
                                onClick={onOpenMenu}
                                aria-label="Open menu"
                            >
                                <span>
                                    <img
                                        className="tw-transition-3"
                                        src="assets/images/icons/header-three-toggle.svg"
                                        alt="toggle"
                                    />
                                </span>
                            </button>
                        </div>
                        <div className="header-three-button d-none d-md-block">
                            <a
                                className="tw-hover-btn bg-black text-white fw-bold tw-py-4 tw-px-10 d-inline-block hover-text-white text-uppercase tw-rounded-md"
                                href="#contact"
                                onClick={(e) => smoothScroll(e, "#contact")}
                            >
                                Let's Talk
                                <span className="tw-hover-btn-circle-dot bg-main-two-600"></span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
