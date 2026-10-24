import React from "react";

const SECTIONS = [
    {
        num: "01",
        title: "Web Development",
        tags: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "Firebase"],
        anim: "fade-up",
    },
    {
        num: "02",
        title: "Frontend & UI",
        tags: [
            "Responsive Design",
            "Component Architecture",
            "Tailwind CSS",
            "REST APIs",
        ],
        anim: "fade-up",
    },
    {
        num: "03",
        title: "Backend & Databases",
        tags: [
            "Node.js",
            "Supabase",
            "PostgreSQL",
            "Firebase",
            "AniList API",
            "OAuth 2.0",
        ],
        anim: "fade-up",
    },
    {
        num: "04",
        title: "Video Editing & Creative",
        tags: [
            "CapCut",
            "Kinemaster",
            "Anime VFX",
            "Manga Panel Animation",
            "Transitions",
        ],
        anim: "fade-up",
    },
];

export default function Expertise() {
    return (
        <section
            id="expertise"
            className="service-three-area bg-black pt-120 tw-pb-15"
        >
            <div className="container tw-container-1800-px">
                <div className="row">
                    <div className="col-12">
                        <div className="tw-mb-15">
                            <h2 className="text-white tw-text-15 text-center font-heading">
                                Core Expertise
                            </h2>
                        </div>
                        <div className="service-three-wrapper">
                            {SECTIONS.map((s, i) => (
                                <div
                                    key={s.num}
                                    className={`service-three-single ${i % 2 === 1 ? "ms-auto" : ""}`}
                                    data-aos={s.anim}
                                    data-aos-duration="1000"
                                    data-aos-delay={200 + i * 100}
                                >
                                    {/* Changed to center content */}
                                    <div className="service-three-item d-flex flex-column align-items-center justify-content-center text-center">
                                        <div className="service-three-content d-flex flex-column align-items-center">
                                            <div>
                                                <h2 className="service-three-title tw-text-15 text-white tw-mb-4">
                                                    <a href="#expertise">
                                                        {s.title}
                                                    </a>
                                                </h2>
                                            </div>

                                            <div className="portfolio-list portfolio-two-list">
                                                {/* Added justify-content-center to center the tags */}
                                                <ul className="d-flex tw-gap-205 flex-wrap justify-content-center">
                                                    {s.tags.map((t) => (
                                                        <li key={t}>
                                                            <span className="text-uppercase text-white tw-text-sm fw-medium position-relative z-1 border border-neutral-700 tw-px-3 tw-py-1 tw-rounded-md">
                                                                {t}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
