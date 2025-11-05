'use client';
import { useEffect, useRef } from 'react';
import './Overview.css';

const Overview = () => {
    const canvasRef = useRef(null);
    const wrapRef = useRef(null);
    const layersRef = useRef([]);
    const glassRef = useRef(null);
    const visualRef = useRef(null);
    const textileRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        /* ----------------------- Particles ----------------------- */
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let W, H, particles;
        let animationFrameId;

        function resize() {
            W = canvas.width = document.documentElement.clientWidth;
            H = canvas.height = document.documentElement.clientHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        function createParticles(count = 80) {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    r: Math.random() * 2.6 + 0.6,
                    v: (Math.random() * 0.4) + 0.1,
                    alpha: Math.random() * 0.6 + 0.15,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }
        createParticles(90);

        function drawParticles(t) {
            if (!ctx) return;
            ctx.clearRect(0, 0, W, H);
            for (const p of particles) {
                p.y -= p.v;
                p.x += Math.sin((t / 1000) + p.phase) * 0.2;
                if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
                ctx.beginPath();
                ctx.globalAlpha = p.alpha;
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
                g.addColorStop(0, 'rgba(105,199,255,0.9)');
                g.addColorStop(0.3, 'rgba(138,212,255,0.25)');
                g.addColorStop(1, 'rgba(138,212,255,0)');
                ctx.fillStyle = g;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
            animationFrameId = requestAnimationFrame(drawParticles);
        }
        animationFrameId = requestAnimationFrame(drawParticles);

        /* ----------------------- Parallax for layers + elements ----------------------- */
        const wrap = wrapRef.current;
        const layers = layersRef.current.filter(Boolean);
        const glass = glassRef.current;
        const visual = visualRef.current;
        const textile = textileRef.current;

        if (!wrap) return;

        let mouse = { x: 0, y: 0 };
        let idleAnimationFrameId;

        function onMove(e) {
            const rect = wrap.getBoundingClientRect();
            const cx = (e.clientX - rect.left) / rect.width - 0.5;
            const cy = (e.clientY - rect.top) / rect.height - 0.5;
            mouse.x = cx; mouse.y = cy;

            // transform background layers at different depths
            layers.forEach(layer => {
                const depth = parseFloat(layer.dataset.depth) || 0.4;
                const tx = cx * 40 * depth;
                const ty = cy * 20 * depth;
                const rz = cx * 6 * depth;
                layer.style.transform = `translate(${-50 + tx}%, ${-50 + ty}%) translateZ(${-200 * depth}px) rotateZ(${rz}deg)`;
            });

            // glass card subtle tilt & translation
            if (glass) {
                const gx = cx * 10; const gy = cy * -8;
                glass.style.transform = `translateZ(90px) rotateY(${gx}deg) rotateX(${gy}deg)`;
            }

            // visual floating
            if (visual && textile) {
                const vx = cx * -18; const vy = cy * -10;
                visual.style.transform = `translateZ(20px) translateY(${vy}px) translateX(${vx}px)`;
                textile.style.transform = `translateZ(120px) translateX(${vx * 0.6}px) translateY(${vy * 0.6}px) scale(1.04)`;
            }
        }

        function resetTransform() {
            layers.forEach((layer, i) => layer && (layer.style.transform = ''));
            glass && (glass.style.transform = '');
            visual && (visual.style.transform = '');
            textile && (textile.style.transform = '');
        }

        wrap.addEventListener('mousemove', onMove);
        wrap.addEventListener('mouseleave', resetTransform);

        /* subtle slow auto-motion for layers when idle */
        let t0 = 0;
        function idleMotion(ts) {
            const dt = (ts - t0) / 1000; t0 = ts;
            layers.forEach((layer, i) => {
                if (!layer) return;
                const depth = parseFloat(layer.dataset.depth) || 0.4;
                const angle = Math.sin(ts / 4000 + i) * (1.5 * depth);
                layer.style.transform += ` rotateZ(${angle}deg)`;
            });
            idleAnimationFrameId = requestAnimationFrame(idleMotion);
        }
        idleAnimationFrameId = requestAnimationFrame(idleMotion);

        /* Accessibility: reduce motion if user prefers */
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (media.matches) {
            wrap.removeEventListener('mousemove', onMove);
            layers.forEach(layer => layer && (layer.style.transition = 'transform 1.2s ease'));
        }

        // Cleanup function
        return () => {
            window.removeEventListener('resize', resize);
            wrap.removeEventListener('mousemove', onMove);
            wrap.removeEventListener('mouseleave', resetTransform);
            cancelAnimationFrame(animationFrameId);
            cancelAnimationFrame(idleAnimationFrameId);
        };
    }, []);

    // Function to set ref for layers
    const setLayerRef = (index) => (el) => {
        layersRef.current[index] = el;
    };

    return (
        <section className="overview-wrap" id="overview" ref={wrapRef}>
            {/* Background geometric SVG layers */}
            <div className="bg-layers" aria-hidden="true">
                <div
                    className="layer layer-4"
                    data-depth="0.15"
                    ref={setLayerRef(3)}
                >
                    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="g4" x1="0" x2="1">
                                <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
                                <stop offset="1" stopColor="#dff6ff" stopOpacity="0.5" />
                            </linearGradient>
                        </defs>
                        <polygon points="50,30 820,40 870,540 120,560" fill="url(#g4)" opacity="0.85" />
                    </svg>
                </div>
                <div
                    className="layer layer-1"
                    data-depth="0.28"
                    ref={setLayerRef(0)}
                >
                    <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="g1" x1="0" x2="1">
                                <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
                                <stop offset="1" stopColor="#e8f9ff" stopOpacity="0.4" />
                            </linearGradient>
                            <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="18" result="b" />
                                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                        </defs>
                        <polygon points="40,120 1160,20 1100,680 80,720" fill="url(#g1)" filter="url(#glow1)" opacity="0.95" />
                    </svg>
                </div>
                <div
                    className="layer layer-2"
                    data-depth="0.46"
                    ref={setLayerRef(1)}
                >
                    <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="g2" x1="0" x2="1">
                                <stop offset="0" stopColor="#f8fdff" stopOpacity="0.95" />
                                <stop offset="1" stopColor="#eaf9ff" stopOpacity="0.45" />
                            </linearGradient>
                        </defs>
                        <polygon points="120,10 780,40 860,520 60,560" fill="url(#g2)" opacity="0.9" />
                    </svg>
                </div>
                <div
                    className="layer layer-3"
                    data-depth="0.62"
                    ref={setLayerRef(2)}
                >
                    <svg viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="g3" x1="0" x2="1">
                                <stop offset="0" stopColor="#ffffff" stopOpacity="0.96" />
                                <stop offset="1" stopColor="#dff6ff" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                        <polygon points="0,60 640,0 700,420 20,460" fill="url(#g3)" opacity="1" />
                    </svg>
                </div>
            </div>

            {/* particles canvas */}
            <canvas className="particles" ref={canvasRef} />

            <div className="content" role="region" aria-labelledby="overview-title">
                {/* Left: Glass content */}
                <div
                    className="glass"
                    id="glass"
                    aria-labelledby="overview-title"
                    aria-describedby="overview-desc"
                    ref={glassRef}
                >
                    <span className="kicker">Overview</span>
                    <h1 className="over-title" id="overview-title">Crafting Tomorrow&apos;s Fabrics</h1>
                    <h2 className="content-title" id="overview-desc">Design-driven, sustainably sourced textile solutions</h2>
                    <p className="lead">We combine decades of expertise with modern design and agile manufacturing — delivering textiles that balance aesthetics, durability, and sustainability.</p>

                    <div className="facilities" id="facilities">
                        <div className="fac">
                            <div className="icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 12h3l2 8 4-16 2 8h4" />
                                </svg>
                            </div>
                            <p>21+ Years of Experience</p>
                        </div>

                        <div className="fac">
                            <div className="icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 7h18M12 3v18" />
                                </svg>
                            </div>
                            <p>Sustainable Global Sourcing</p>
                        </div>

                        <div className="fac">
                            <div className="icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2v20M2 12h20" />
                                </svg>
                            </div>
                            <p>End-to-End Support</p>
                        </div>

                        <div className="fac">
                            <div className="icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 7h16v10H4z" />
                                </svg>
                            </div>
                            <p>In-House Design Studio</p>
                        </div>

                        <div className="fac">
                            <div className="icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2l3 7h7l-5 4 2 9-6-5-6 5 2-9-5-4h7z" />
                                </svg>
                            </div>
                            <p>Strict Quality Control</p>
                        </div>

                        <div className="fac">
                            <div className="icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 12h18M12 3v18" />
                                </svg>
                            </div>
                            <p>Fast & Flexible Service</p>
                        </div>
                    </div>
                </div>

                {/* Right: Visual textile image with floating shapes */}
                <div className="visual" id="visual" ref={visualRef}>
                    <div className="frame" id="frame">
                        <img
                            src="https://media.istockphoto.com/id/472214120/photo/young-african-textile-worker-sewing.jpg?s=612x612&w=0&k=20&c=lXbw8RRm0DlAksEtJtX25GmuUrC-cuN6TNPWi69BpFs="
                            alt="Textile sample"
                            id="textile"
                            ref={textileRef}
                        />
                    </div>
                    <div className="float-shape" aria-hidden="true"></div>
                </div>
            </div>
        </section>
    );
};

export default Overview;