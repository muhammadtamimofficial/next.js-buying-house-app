"use client";
import React, { useEffect } from "react";
import "./OurMission.css";

const OurMission = () => {
    useEffect(() => {
        const elements = document.querySelectorAll(".fade-in");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.2 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="mission-section">
            <div className="animated-bg"></div>

            <div className="mission-container fade-in">
                <div className="mission-text">
                    <h1>Our Mission</h1>
                    <p>
                        At <strong>Your Company</strong>, our mission is to empower businesses and individuals
                        through innovative digital solutions. We aim to make technology simple, efficient,
                        and accessible — helping our clients grow, connect, and achieve their goals.
                    </p>
                    <p>
                        We believe in delivering quality with integrity, focusing on long-term relationships,
                        and building products that truly make an impact. Every line of code, every design, and
                        every feature we develop is guided by our passion for excellence and commitment to
                        our users’ success.
                    </p>
                    <p>
                        Our vision extends beyond business — we strive to contribute positively to our
                        community, promoting sustainability, transparency, and continuous innovation.
                    </p>
                </div>

                <div className="mission-image fade-in">
                    <img
                        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80"
                        alt="Our Mission"
                    />
                </div>
            </div>
        </section>
    );
};

export default OurMission;
