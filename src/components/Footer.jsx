import React from "react";

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

const QUICK_LINKS = [
    { href: "#about", label: "About Me" },
    { href: "#expertise", label: "Expertise" },
    { href: "#projects", label: "Projects" },
    { href: "#what-i-build", label: "What I Build" },
    { href: "#contact", label: "Contact" },
];

const EMAIL = "yamanjrexe@gmail.com";
const NAME = "Yaman Chapagain";
const NICKNAME = "Yaman";

export default function Footer() {
    return (
        <section
            id="contact"
            className="footer-three-area pt-120 tw-pb-10 position-relative z-1 bg-black"
        >
            <div className="container tw-container-1800-px">
                <div className="row pb-120 justify-content-center text-center">
                    <div className="col-xl-8 col-lg-10">
                        <div
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay="200"
                        >
                            <span className="text-main-two-600 text-uppercase fw-bold tracking-wider tw-text-sm border border-neutral-800 tw-px-4 tw-py-2 tw-rounded-md">
                                CONNECT WITH ME
                            </span>
                            <h2 className="tw-text-15 text-white font-heading tw-mt-4 tw-mb-4">
                                Let's Build Something Together
                            </h2>
                            <p className="tw-text-xl text-neutral-400 tw-mb-10">
                                Reach out for web projects, video editing,
                                collaborations, or just to say hi.
                            </p>

                            <div className="d-flex align-items-center justify-content-center flex-wrap tw-gap-4">
                                {SOCIALS.map((s) => (
                                    <a
                                        key={s.label}
                                        className="social-chip social-chip--lg"
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className={s.icon}></i>
                                        <span>{s.label}</span>
                                    </a>
                                ))}
                                <a
                                    className="social-chip social-chip--lg"
                                    href={`mailto:${EMAIL}`}
                                >
                                    <i className="ph ph-envelope"></i>
                                    <span>Email</span>
                                </a>
                            </div>

                            <p className="tw-text-lg text-neutral-400 tw-mt-8">
                                Or email me directly at{" "}
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="text-main-two-600"
                                    style={{ textDecoration: "underline" }}
                                >
                                    {EMAIL}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-three-border tw-px-18 tw-mb-10">
                <div className="container-fluid gx-0">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="footer-three-middile d-flex align-items-center justify-content-between">
                                <div
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="200"
                                >
                                    <h4 className="tw-text-2xl text-white tw-mb-2">
                                        Quick Links
                                    </h4>
                                    <ul className="d-flex tw-gap-4 flex-wrap list-unstyled">
                                        {QUICK_LINKS.map((l) => (
                                            <li key={l.href}>
                                                <a
                                                    className="tw-text-lg text-white"
                                                    href={l.href}
                                                >
                                                    {l.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="300"
                                >
                                    <a
                                        className="footer-three-back-to-top tw-w-170 tw-h-170 lh-1 d-inline-flex justify-content-center align-items-center bg-main-two-600 text-white tw-text-3xl rounded-circle"
                                        href="#top"
                                    >
                                        <i className="ph ph-arrow-up"></i>
                                    </a>
                                </div>
                                <div
                                    className="text-lg-end"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="400"
                                >
                                    <h4 className="tw-text-2xl text-white tw-mb-2">
                                        {NAME}
                                    </h4>
                                    <p className="tw-text-lg text-white">
                                        © {new Date().getFullYear()} {NAME}. All
                                        rights reserved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="container tw-container-1800-px">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="footer-three-bottom text-center">
                                <h5 className="footer-three-bottom-title text-white text-center">
                                    {NICKNAME}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <img
                    className="position-absolute top-0 start-0 z-n1"
                    src="assets/images/shapes/footer-three-bg-shape.png"
                    alt="shape"
                />
            </div>
        </section>
    );
}
