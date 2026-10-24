import React, { useEffect } from "react";

const LINKS = [
    { href: "#about", label: "About" },
    { href: "#expertise", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#what-i-build", label: "What I Build" },
    { href: "#contact", label: "Connect" },
];

const SOCIALS = [
    {
        href: "https://github.com/yamanjrexe",
        icon: "ph ph-github-logo",
        label: "GitHub",
    },
    {
        href: "https://www.facebook.com/yamanjrexe",
        icon: "ph ph-facebook-logo",
        label: "Facebook",
    },
    {
        href: "https://instagram.com/yamanjr.exe",
        icon: "ph ph-instagram-logo",
        label: "Instagram",
    },
];

const EMAIL = "yamanjrexe@gmail.com";

export default function OffcanvasMenu({ open, onClose }) {
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleNav = (e, href) => {
        e.preventDefault();
        onClose();
        setTimeout(() => {
            const el =
                href === "body" ? document.body : document.querySelector(href);
            if (el) {
                const top = href === "body" ? 0 : el.offsetTop - 90;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }, 300);
    };

    return (
        <div
            className={`tw-offcanvas-2-area p-relative ${open ? "opened" : ""}`}
        >
            <div className="tw-offcanvas-2-bg is-left left-box"></div>
            <div className="tw-offcanvas-2-bg is-right right-box d-none d-md-block"></div>
            <div className="tw-offcanvas-2-wrapper">
                <div className="tw-offcanvas-2-left left-box">
                    <div className="tw-offcanvas-2-left-wrap d-flex justify-content-between align-items-center">
                        <div className="twoffcanvas__logo">
                            <a
                                className="logo-1"
                                href="#top"
                                onClick={(e) => handleNav(e, "body")}
                            >
                                <h3 className="text-white fw-bold tw-mb-0">
                                    Yaman Jr
                                </h3>
                            </a>
                        </div>
                        <div className="tw-offcanvas-2-close d-md-none text-end">
                            <button
                                className="tw-offcanvas-2-close-btn"
                                onClick={onClose}
                            >
                                <span className="text">
                                    <span className="text-white">close</span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="tw-main-menu-mobile tw-mt-8">
                        <nav>
                            <ul className="d-flex flex-column tw-gap-5 list-unstyled tw-mb-0">
                                {LINKS.map((l) => (
                                    <li key={l.href}>
                                        <a
                                            href={l.href}
                                            onClick={(e) =>
                                                handleNav(e, l.href)
                                            }
                                            className="text-white text-uppercase fw-bold hover-text-main-two-600 tw-transition-3"
                                            style={{
                                                color: "#fff",
                                                fontSize: "1.8rem",
                                                fontWeight: 700,
                                                textDecoration: "none",
                                                display: "inline-block",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="tw-offcanvas-2-right right-box d-none d-md-block p-relative">
                    <div className="tw-offcanvas-2-close text-end">
                        <button
                            className="tw-offcanvas-2-close-btn"
                            onClick={onClose}
                        >
                            <span className="text">
                                <span>close</span>
                            </span>
                        </button>
                    </div>
                    <div className="tw-offcanvas-2-right-inner d-flex flex-column justify-content-between h-100">
                        <div className="twoffcanvas__contact-info">
                            <div className="twoffcanvas__contact-title">
                                <h5 className="text-white tw-mb-1">
                                    Yaman Chapagain
                                </h5>
                                <p className="text-neutral-400 tw-text-sm tw-mb-4">
                                    Web Developer & Video Editor · Nepal
                                </p>
                            </div>
                            <div className="twoffcanvas__social-info tw-mt-4">
                                <h6 className="text-white tw-mb-3">
                                    Connect Across Platforms
                                </h6>
                                <ul className="d-flex flex-wrap tw-gap-3 list-unstyled">
                                    {SOCIALS.map((s) => (
                                        <li key={s.label}>
                                            <a
                                                className="social-chip"
                                                href={s.href}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i className={s.icon}></i>
                                                <span style={{ color: '#fff' }}>{s.label}</span>
                                            </a>
                                        </li>
                                    ))}
                                    <li>
                                        <a
                                            className="social-chip"
                                            href={`mailto:${EMAIL}`}
                                        >
                                            <i className="ph ph-envelope"></i>
                                            <span style={{ color: '#fff' }}>Email</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
