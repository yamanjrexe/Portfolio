import React from "react";

export default function About() {
    return (
        <section
            id="about"
            className="about-three-area py-120 position-relative z-1"
        >
            <div className="container tw-container-1800-px">
                <div className="about-three-top position-relative z-1">
                    <div className="row justify-content-center tw-mb-21">
                        <div className="col-xl-10">
                            <div className="text-center">
                                <h2 className="about-three-title text-heading tw-text-15 tw-itm-title tw-itm-anim">
                                    A 17-year-old web developer and video editor
                                    from Nepal, building creative and useful
                                    digital projects — from anime streaming
                                    platforms and tracking apps to responsive
                                    websites and video content.
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-6">
                            <div
                                className="about-three-thumb w-100 tw-clip-anim tw-rounded-lg"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay="200"
                            >
                                <img
                                    className="tw-anim-img w-100 tw-rounded-lg"
                                    data-animate="true"
                                    src="assets/images/me/yaman.png"
                                    alt="Yaman Chapagain About"
                                    style={{
                                        objectFit: "cover",
                                        maxHeight: 650,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div
                                className="about-three-right"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay="300"
                            >
                                <div>
                                    <p className="tw-text-xl tw-mb-8">
                                        Hi, I'm <strong>Yaman Chapagain</strong>{" "}
                                        (Yaman Jr) — a self-taught Web Developer
                                        and Video Editor from Nepal.
                                    </p>
                                    <p className="tw-text-xl tw-mb-8">
                                        I started video editing in 2020 with
                                        Kinemaster and later moved to CapCut,
                                        sharpening my editing skills over the
                                        years. In 2024, I began learning web
                                        development and started building
                                        projects like chat apps, anime tracking
                                        platforms, and educational websites.
                                    </p>
                                    <p className="tw-text-xl tw-mb-10">
                                        I love turning ideas into real, working
                                        products — and I'm constantly learning
                                        new technologies to keep improving.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img
                    className="about-three-shape position-absolute start-0 w-100"
                    src="assets/images/shapes/about-three-shape.png"
                    alt="shape"
                />
            </div>
        </section>
    );
}
