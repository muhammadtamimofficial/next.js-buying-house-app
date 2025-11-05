"use client";
import { useEffect, useRef, useState } from "react";

export default function Slider() {
    const slidesData = [
        {
            title: "Experience The Future",
            subtitle: "Immersive 3D visuals that redefine your web experience",
            btn: "Get Started",
            src: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80",
        },
        {
            title: "Explore the Depths",
            subtitle: "Dive into transparent layers and stunning gradients",
            btn: "Explore",
            src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
        },
        {
            title: "Adventure Beyond",
            subtitle: "Where motion and light meet design brilliance",
            btn: "Join Now",
            src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
        },
    ];

    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);

    const next = () => setIndex((i) => (i + 1) % slidesData.length);
    const prev = () => setIndex((i) => (i - 1 + slidesData.length) % slidesData.length);
    const goTo = (i) => setIndex(i);

    useEffect(() => {
        timerRef.current = setInterval(next, 5000);
        return () => clearInterval(timerRef.current);
    }, []);

    const slideStyle = (i) => {
        const total = slidesData.length;
        if (i === index) return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 5 };
        const diff = (i - index + total) % total;
        if (diff === 1) return { transform: "translateX(60%) scale(0.8) rotateY(-25deg)", opacity: 0.7, zIndex: 4 };
        if (diff === total - 1) return { transform: "translateX(-60%) scale(0.8) rotateY(25deg)", opacity: 0.7, zIndex: 4 };
        return { transform: "translateX(0) scale(0.5) translateZ(-200px)", opacity: 0, zIndex: 1 };
    };

    return (
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: "50px",
                height: "100vh",
                overflow: "visible",
                background: "#121826",
                fontFamily: "Poppins, sans-serif",
                color: "#fff",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "90%",
                    maxWidth: "1400px",
                    height: "500px",
                    perspective: "1600px",
                    overflow: "visible",
                }}
            >
                <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}>
                    {slidesData.map((slide, i) => (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                borderRadius: "20px",
                                overflow: "hidden",
                                backgroundImage: `url(${slide.src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                transition: "all 1s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                ...slideStyle(i),
                            }}
                        >
                            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }} />
                            <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                                <h1>{slide.title}</h1>
                                <p>{slide.subtitle}</p>
                                <button
                                    style={{
                                        marginTop: "10px",
                                        padding: "10px 20px",
                                        borderRadius: "25px",
                                        border: "none",
                                        background: "linear-gradient(90deg,#7b61ff,#00e0ff)",
                                        color: "#fff",
                                        cursor: "pointer",
                                    }}
                                >
                                    {slide.btn}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Prev/Next Buttons on sides */}
                <button
                    onClick={() => { prev(); clearInterval(timerRef.current); }}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "30px", // moved left side outside slider box slightly
                        transform: "translateY(-50%)",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontSize: "1.8rem",
                        border: "none",
                        cursor: "pointer",
                        zIndex: 10,
                    }}
                >
                    ❮
                </button>
                <button
                    onClick={() => { next(); clearInterval(timerRef.current); }}
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "30px", // moved right side outside slider box slightly
                        transform: "translateY(-50%)",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontSize: "1.8rem",
                        border: "none",
                        cursor: "pointer",
                        zIndex: 10,
                    }}
                >
                    ❯
                </button>

                {/* Dots */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: "10px",
                        zIndex: 10,
                    }}
                >
                    {slidesData.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { goTo(i); clearInterval(timerRef.current); }}
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                border: "none",
                                background: i === index ? "#00e0ff" : "rgba(0,224,255,0.3)",
                                cursor: "pointer",
                                transition: "all 0.3s",
                            }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
