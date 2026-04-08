"use client";
import React, { useEffect } from "react";
import "./OurVision.css";

const OurVision = () => {
    useEffect(() => {
        const elements = document.querySelectorAll(".vision-fade-in");
        
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
        <section className="vision-section">
            <div className="animated-bg"></div>

            {/* 
               Container uses default flex-direction (row).
               Image (Left) -> Text (Right)
            */}
            <div className="vision-container fade-in">
                
                {/* Image Side (Left) */}
                <div className="vision-image fade-in">
                    <img
                        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80"
                        alt="Our Vision"
                    />
                </div>

                {/* Text Side (Right) */}
                <div className="vision-text fade-in">
                    <h1>Our Vision</h1>
                    <p>
                        Our vision is to become a global catalyst for digital transformation,
                        bridging the gap between complex technology and everyday human experiences.
                        We see a future where innovation knows no boundaries.
                    </p>
                    <p>
                        We envision a world where every business, regardless of size, has access to
                        cutting-edge tools that drive efficiency and creativity. By fostering a culture
                        of continuous learning and adaptation, we aim to lead the charge in shaping
                        a smarter, more connected tomorrow.
                    </p>
                    <p>
                        Sustainability and ethical technology are at the core of our long-term goals.
                        We strive to build a digital ecosystem that is inclusive, secure, and
                        environmentally conscious.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default OurVision;