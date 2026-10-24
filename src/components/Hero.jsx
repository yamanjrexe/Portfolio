import React from "react";

const NAME = "Yaman Chapagain";
const NICKNAME = "Yaman";
const TAGLINE = "Creating websites and videos with creativity and precision";

const BULLETS = [
    "React.js & JavaScript Ecosystem",
    "HTML5, CSS3 & Responsive Design",
    "Node.js & Backend Foundations",
    "Anime & Creative Video Editing",
    "Freelance Web Development",
];

export default function Hero() {
    return (
        <section className="banner-three-area">
            <div className="container tw-container-1800-px">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="banner-three-wrapper position-relative z-1">
                            <div className="banner-three-man position-absolute start-50 translate-middle-x">
                                <img
                                    src="assets/images/me/hero-cutout.png"
                                    alt={NAME}
                                />
                            </div>
                            <h1 className="banner-three-title text-black tw-mb-30 text-uppercase">
                                {NICKNAME}
                            </h1>
                            <div className="banner-three-wrap d-flex justify-content-between align-items-end position-relative z-1">
                                <div
                                    className="banner-three-left tw-rounded-lg"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="200"
                                >
                                    <h2 className="banner-three-left-title tw-text-3xl tw-mb-6">
                                        Hi, I'm {NAME} <br />
                                        <span className="text-main-two-600">
                                            Web Developer
                                        </span>{" "}
                                        & Video Editor
                                    </h2>
                                    <div className="banner-three-list">
                                        <ul>
                                            {BULLETS.map((t) => (
                                                <li
                                                    key={t}
                                                    className="tw-text-lg fw-medium d-inline-flex align-items-center tw-gap-2 tw-mb-4"
                                                >
                                                    <span>
                                                        <img
                                                            src="assets/images/icons/banner-three-pluse.svg"
                                                            alt="plus"
                                                        />
                                                    </span>
                                                    {t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div
                                    className="banner-three-center text-center"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="200"
                                >
                                    <h3 className="banner-three-center-title tw-text-120">
                                        {TAGLINE}
                                    </h3>
                                    <div className="banner-three-button">
                                        <a
                                            className="tw-hover-btn bg-black text-white fw-bold tw-py-4 tw-px-10 d-inline-block hover-text-white text-uppercase tw-rounded-lg"
                                            href="#projects"
                                        >
                                            explore projects
                                            <span className="tw-hover-btn-circle-dot bg-main-two-600"></span>
                                        </a>
                                    </div>
                                </div>

                                <div
                                    className="banner-three-right tw-rounded-lg"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="300"
                                >
                                    <div className="banner-three-counter-item tw-rounded-md tw-mb-4 position-relative">
                                        <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                                            <span
                                                className="purecounter font-heading"
                                                data-purecounter-duration="2"
                                                data-purecounter-end="8"
                                            ></span>
                                            +
                                        </h4>
                                        <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">
                                            Live & Development Projects
                                        </p>
                                    </div>
                                    <div className="banner-three-counter-item tw-rounded-md tw-mb-4 ms-auto bg-black">
                                        <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-white tw-mb-2 lh-1">
                                            <span
                                                className="purecounter font-heading"
                                                data-purecounter-duration="2"
                                                data-purecounter-end="4"
                                            ></span>
                                            +
                                        </h4>
                                        <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-white">
                                            Years of Video Editing
                                        </p>
                                    </div>
                                    <div className="banner-three-counter-item tw-rounded-md tw-mb-4">
                                        <h4 className="banner-three-counter-title tw-text-101 fw-semibold font-heading text-heading tw-mb-2 lh-1">
                                            Nepal
                                        </h4>
                                        <p className="banner-three-counter-paragraph tw-text-lg fw-medium text-heading">
                                            Based in Nepal · Available Worldwide
                                        </p>
                                    </div>
                                </div>

                                <div className="banner-three-line-shape position-absolute start-50 translate-middle-x z-n1">
                                    <img
                                        src="assets/images/shapes/banner-three-shape.png"
                                        alt="shape"
                                    />
                                    <div className="banner-three-carcel-shape">
                                        <div>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
