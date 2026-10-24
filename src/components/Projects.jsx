import React from "react";

const PROJECTS = [
    {
        id: 1,
        title: "Jr Editz - Anime Editing Tutorials",
        description:
            "Jreditz is dedicated to teaching anime video editing, manga panel animation, and creative VFX for beginners and pros. With step-by-step tutorials and free resources, we help editors bring their ideas to life.",
        image: "assets/images/projects/jr-editz.png",
        techStack: ["HTML", "CSS", "Javascript"],
        liveUrl: "https://jreditz.netlify.app/",
        githubUrl: "https://github.com/yamanjrexe/JrEditz",
        status: "live",
    },
    {
        id: 2,
        title: "AniPulse - Anime Tracker",
        description:
            "AniPulse is a modern, feature-rich anime tracker that helps you manage your watchlist, track progress, analyze detailed statistics, and celebrate your anime journey.",
        image: "assets/images/projects/ani-pulse.png",
        techStack: ["React", "CSS", "Node.js", "Firebase", "AnilistAPI"],
        liveUrl: "https://ani-pulse.netlify.app/",
        githubUrl: "https://github.com/yamanjrexe/AniPulse",
        status: "live",
    },
    {
        id: 3,
        title: "Regina Shoe Center - E-commerce Website",
        description:
            "Regina Shoe Center is a modern e-commerce platform for selling shoes online. With a user-friendly interface and seamless shopping experience, customers can easily browse, select, and purchase their favorite footwear.",
        image: "assets/images/projects/regina-shoe.png",
        techStack: [
            "HTML",
            "CSS",
            "Javascript",
            "React",
            "Node.js",
            "Firebase",
        ],
        liveUrl: "#",
        githubUrl: "https://github.com/yamanjrexe/Reginashoecenter",
        status: "development",
    },
    {
        id: 4,
        title: "AniSora – Anime Streaming Platform",
        description:
            "AniSora is a full-featured anime streaming platform. It provides a seamless experience with a modern UI, high-quality streaming, and deep integration with AniList for watchlist synchronization.",
        image: "assets/images/projects/ani-sora.png",
        techStack: [
            "React",
            "Supabase",
            "PostgreSQL",
            "AniList API",
            "OAuth 2.0",
            "CSS",
        ],
        liveUrl: "#",
        githubUrl: "https://github.com/yamanjrexe/AniSora",
        status: "development",
    },
    {
        id: 5,
        title: "Edu Sphere",
        description:
            "Edu Sphere is a responsive educational web platform designed to deliver interactive learning resources through a clean and user-friendly interface.",
        image: "assets/images/projects/edu-sphere.png",
        techStack: ["HTML", "JS", "CSS"],
        liveUrl: "https://edu-sphere1.netlify.app/",
        githubUrl: "https://github.com/yamanjrexe/edusphere",
        status: "live",
    },
    {
        id: 6,
        title: "Portfolio Site",
        description:
            "The site you're on. A custom React portfolio featuring a sleek dark aesthetic, smooth GSAP scroll animations, and a fully responsive layout. Built with modern web standards to showcase my projects, skills, and creative work.",
        image: "assets/images/projects/portfolio.png",
        techStack: ["React", "CSS", "GSAP", "AOS"],
        liveUrl: "https://yamanchapagain.com.np",
        githubUrl: "https://github.com/yamanjrexe/portfolio",
        status: "live",
    },
    {
        id: 7,
        title: "Tic Tac Toe",
        description:
            "Browser game with a Minimax-powered AI opponent, three difficulty levels, and match score tracking. Scores and the last 20 matches persist between visits using localStorage.",
        image: "assets/images/projects/tic-tac-toe.png",
        techStack: ["HTML", "CSS", "JavaScript"],
        liveUrl: "https://yamanjrexe.github.io/Tic-Tac-Toe",
        githubUrl: "https://github.com/yamanjrexe/Tic-Tac-Toe",
        status: "live",
    },
    {
        id: 8,
        title: "The Cube",
        description:
            "A browser-based Rubik's cube you can twist with a mouse or touch. Supports 2x2 through 5x5, three flip animations, camera FOV control, a scramble generator, and five color themes with an HSL editor.",
        image: "assets/images/projects/the-cube.png",
        techStack: ["JavaScript", "Three.js", "CSS"],
        liveUrl: "https://yamanjrexe.github.io/The-Cube",
        githubUrl: "https://github.com/yamanjrexe/The-Cube",
        status: "live",
    },
];

export default function Projects() {
    return (
        <section
            id="projects"
            className="portfolio-three-area py-120 position-relative z-1"
        >
            <div className="portfolio-three-shape position-absolute top-0 z-n1">
                <h3 className="portfolio-three-shape-title">works</h3>
            </div>
            <div className="container tw-container-1800-px">
                <div className="row tw-mb-15">
                    <div className="col-xl-12 text-center">
                        <h2 className="tw-text-15 text-heading font-heading">
                            Featured Projects
                        </h2>
                        <p className="tw-text-xl text-neutral-600">
                            Live & in-development projects built with React,
                            JavaScript, and modern tooling
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="portfolio-three-wrapper">
                            {PROJECTS.map((p) => {
                                const isDev = p.status === "development";
                                const primaryUrl =
                                    p.liveUrl !== "#" ? p.liveUrl : p.githubUrl;

                                return (
                                    <div
                                        key={p.id}
                                        className="portfolio-three-item tw-rounded-lg portfolio-wrapper"
                                    >
                                        {/* Top block — title, description, tags, buttons */}
                                        <div className="portfolio-three-wrap">
                                            <div>
                                                <h2 className="tw-text-605 fw-medium tw-mb-2">
                                                    <a
                                                        className="hover-text-main-two-600"
                                                        href={primaryUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        {p.id}. {p.title}
                                                    </a>
                                                    {isDev && (
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "0.7rem",
                                                                marginLeft:
                                                                    "0.5rem",
                                                                padding:
                                                                    "2px 8px",
                                                                borderRadius: 4,
                                                                background:
                                                                    "#f59e0b",
                                                                color: "#000",
                                                                verticalAlign:
                                                                    "middle",
                                                                textTransform:
                                                                    "uppercase",
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            In Dev
                                                        </span>
                                                    )}
                                                </h2>
                                                <p className="tw-text-lg text-neutral-600 tw-mb-4">
                                                    {p.description}
                                                </p>

                                                <div className="portfolio-three-list portfolio-list">
                                                    <ul className="d-flex tw-gap-205 flex-wrap">
                                                        {p.techStack.map(
                                                            (t) => (
                                                                <li key={t}>
                                                                    <span className="text-uppercase text-heading tw-text-xs fw-semibold border border-neutral-300 tw-px-2 tw-py-1 tw-rounded">
                                                                        {t}
                                                                    </span>
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="portfolio-three-button">
                                                <a
                                                    className="portfolio-three-btn"
                                                    href={p.githubUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="GitHub"
                                                    aria-label="GitHub"
                                                >
                                                    <i className="ph ph-github-logo"></i>
                                                </a>
                                                <a
                                                    className="portfolio-three-btn"
                                                    href={p.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="Live Demo"
                                                    aria-label="Live Demo"
                                                >
                                                    <i className="ph ph-arrow-up-right"></i>
                                                </a>
                                            </div>
                                        </div>

                                        {/* Image block */}
                                        <div
                                            className="portfolio-thumb not-hide-cursor fw-bold tw-rounded-lg"
                                            data-cursor={
                                                isDev
                                                    ? "In Development"
                                                    : "Live Demo"
                                            }
                                        >
                                            <a
                                                className="d-block cursor-hide tw-rounded-lg"
                                                href={primaryUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <img
                                                    src={p.image}
                                                    alt={p.title}
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        const parent =
                                                            e.currentTarget
                                                                .parentElement;
                                                        if (!parent) return;
                                                        parent.style.background =
                                                            "linear-gradient(135deg,#1a1a1a,#2a2a2a)";
                                                        parent.style.display =
                                                            "flex";
                                                        parent.style.alignItems =
                                                            "center";
                                                        parent.style.justifyContent =
                                                            "center";
                                                        parent.style.color =
                                                            "#888";
                                                        parent.style.fontSize =
                                                            "1rem";
                                                        parent.style.fontWeight =
                                                            "600";
                                                        parent.style.letterSpacing =
                                                            "1px";
                                                        parent.style.padding =
                                                            "2rem";
                                                        parent.innerHTML = `<span>${p.title}</span>`;
                                                    }}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
