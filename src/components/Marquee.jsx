import React from "react";

const ITEMS = [
    { text: "WEB DEVELOPMENT", stroke: false },
    { text: "VIDEO EDITING", stroke: true },
    { text: "RESPONSIVE DESIGN", stroke: false },
    { text: "CREATIVE PROJECTS", stroke: true },
];

export default function Marquee() {
    const renderSet = (keyPrefix) =>
        ITEMS.map((item, i) => (
            <div key={`${keyPrefix}-${i}`} className="marquee__item">
                <h2
                    className={`marquee-two-title marquee-three-title text-uppercase ${
                        item.stroke ? "text-stroke" : "text-white"
                    }`}
                >
                    {item.text} <span className="text-white">-</span>
                </h2>
            </div>
        ));

    return (
        <div className="marquee tw-pt-17 bg-black">
            <div className="marquee__track">
                <div className="marquee__set">{renderSet("a")}</div>
                <div className="marquee__set" aria-hidden="true">
                    {renderSet("b")}
                </div>
            </div>
        </div>
    );
}
