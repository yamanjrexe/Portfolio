import React from "react";

const ITEMS = [
    {
        num: "01",
        tag: "Anime Tools",
        label: "Anime Trackers, Streaming & Fan Platforms",
        right: "React & APIs",
        img: "assets/images/thumbs/feature-three-thumb1.jpg",
    },
    {
        num: "02",
        tag: "E-commerce",
        label: "Modern E-commerce & Business Websites",
        right: "Full Stack",
        img: "assets/images/thumbs/portfolio-two-thumb1.jpg",
    },
    {
        num: "03",
        tag: "Education",
        label: "Educational & Learning Platforms",
        right: "Responsive",
        img: "assets/images/thumbs/portfolio-two-thumb2.jpg",
    },
    {
        num: "04",
        tag: "Games & Interactive",
        label: "Browser Games & Interactive Experiences",
        right: "JavaScript & Three.js",
        img: "assets/images/thumbs/portfolio-two-thumb3.jpg",
    },
    {
        num: "05",
        tag: "Video & Creative",
        label: "Anime Editing Tutorials & Creative Video Content",
        right: "CapCut & VFX",
        img: "assets/images/thumbs/portfolio-two-thumb4.jpg",
    },
];

export default function WhatIBuild() {
    return (
        <div
            id="what-i-build"
            className="feature-three-area py-120 position-relative z-1 bg-black"
        >
            <div className="container tw-container-1800-px">
                <div className="row tw-mb-15">
                    <div className="col-12 text-center">
                        <h2 className="tw-text-15 text-white font-heading">
                            What I Build
                        </h2>
                        <p className="tw-text-xl text-neutral-400">
                            Web apps, games, e-commerce platforms, and creative
                            video content
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="feature-three-wrapper hover__widget">
                            {ITEMS.map((item, i) => (
                                <div
                                    key={item.num}
                                    className={`feature-three-single hover__reveal-item ${
                                        i === 0 ? "current" : ""
                                    }`}
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="200"
                                >
                                    <div className="feature-three-item d-flex justify-content-between align-items-center">
                                        <div className="feature-three-left d-flex align-items-center">
                                            <div>
                                                <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block tw-w-20">
                                                    {item.num}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block tw-w-160-px">
                                                    {item.tag}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block">
                                                    {item.label}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="feature-three-text tw-text-605 fw-medium text-white tw-transition-3 d-inline-block">
                                                {item.right}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="hover__reveal-bg bg-img"
                                        data-background-image={item.img}
                                        style={{
                                            backgroundImage: `url(${item.img})`,
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
