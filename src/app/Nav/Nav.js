// app/page.jsx  (or pages/index.js)
'use client';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const itemsRef = useRef([]);
  const signupRef = useRef(null);

  // place indicator under an element
  const placeIndicator = (el) => {
    if (!el || !indicatorRef.current || !navRef.current) return;
    const rect = el.getBoundingClientRect();
    const parentRect = navRef.current.getBoundingClientRect();
    const left = rect.left - parentRect.left + 8;
    const width = Math.max(48, rect.width - 16);
    indicatorRef.current.style.left = `${left}px`;
    indicatorRef.current.style.width = `${width}px`;
  };

  // initial placement after render
  useLayoutEffect(() => {
    const active = itemsRef.current[activeIndex];
    if (active) placeIndicator(active);
    // ensure reposition on font/load reflows
    const t = setTimeout(() => {
      const a = itemsRef.current[activeIndex];
      if (a) placeIndicator(a);
    }, 50);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update when activeIndex changes
  useEffect(() => {
    const active = itemsRef.current[activeIndex];
    if (active) placeIndicator(active);
  }, [activeIndex]);

  // Resize -> re-place indicator
  useEffect(() => {
    const onResize = () => {
      const active = itemsRef.current[activeIndex];
      if (active) placeIndicator(active);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeIndex]);

  // 3D hover transform and per-item depth translation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const handleMove = (e) => {
      const rect = nav.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = y * 6;
      const ry = -x * 12;
      nav.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

      const cx = (e.clientX - rect.left) / rect.width;
      itemsRef.current.forEach((it, i) => {
        if (!it) return;
        const depth = 20 + i * 6;
        const tx = (cx - 0.5) * depth;
        // use translateZ + translateX for the 3D feel
        it.style.transform = `translateZ(${60 + i * 6}px) translateX(${tx}px)`;
      });

      const logo = nav.querySelector('.logo');
      if (logo) logo.style.transform = `translateZ(50px) translateX(${(cx - 0.5) * 18}px)`;
    };
    const reset = () => (nav.style.transform = 'rotateX(0) rotateY(0)');

    nav.addEventListener('mousemove', handleMove);
    nav.addEventListener('mouseleave', reset);
    return () => {
      nav.removeEventListener('mousemove', handleMove);
      nav.removeEventListener('mouseleave', reset);
    };
  }, []);

  // keyboard navigation for focused nav items
  useEffect(() => {
    const onKey = (e) => {
      const focused = document.activeElement;
      const idx = itemsRef.current.findIndex((el) => el === focused);
      if (idx === -1) return;
      if (e.key === 'ArrowRight') {
        const next = Math.min(itemsRef.current.length - 1, idx + 1);
        itemsRef.current[next].focus();
        setActiveIndex(next);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        const prev = Math.max(0, idx - 1);
        itemsRef.current[prev].focus();
        setActiveIndex(prev);
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // signup animation
  const handleSignupClick = () => {
    const el = signupRef.current;
    if (!el || !el.animate) return;
    el.animate(
      [
        { transform: 'translateZ(30px) scale(1)' },
        { transform: 'translateZ(36px) scale(0.98)' },
        { transform: 'translateZ(30px) scale(1)' },
      ],
      { duration: 420, easing: 'cubic-bezier(.2,.9,.3,1)' }
    );
  };

  const menuItems = ['Home', 'Features', 'Pricing', 'About', 'Contact'];

  return (
    <>
      <Head>
        <title>Buying House</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>

      <div className="nav-wrap">
        <nav className="navbar" id="navbar" aria-label="Primary" ref={navRef}>
          <div className="logo" tabIndex={0}>
            <div className="mark">3D</div>
            <div className="word">Logo</div>
          </div>

          <ul className={`nav-list ${menuOpen ? 'open' : ''}`} id="navList" role="menubar">
            {menuItems.map((label, i) => {
              // Features is the dropdown (index 1)
              if (i === 1) {
                return (
                  <li key={label} className="dropdown-parent" role="none">
                    <a
                      href="#features"
                      className="nav-item"
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded="false"
                      ref={(el) => (itemsRef.current[i] = el)}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveIndex(i);
                      }}
                      tabIndex={0}
                    >
                      {label}
                      <i style={{ fontSize: 14, marginLeft: 8 }} className="fa">
                        &#xf0d7;
                      </i>
                    </a>

                    <ul className="dropdown" role="menu" aria-label="Features submenu">
                      <li role="none">
                        <a role="menuitem" href="#feature1">
                          Feature 1
                        </a>
                      </li>
                      <li role="none">
                        <a role="menuitem" href="#feature2">
                          Feature 2
                        </a>
                      </li>
                      <li role="none">
                        <a role="menuitem" href="#feature3">
                          Feature 3
                        </a>
                      </li>
                    </ul>
                  </li>
                );
              }

              return (
                <li key={label} role="none">
                  <a
                    href={`#${label.toLowerCase()}`}
                    className="nav-item"
                    role="menuitem"
                    ref={(el) => (itemsRef.current[i] = el)}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveIndex(i);
                      setMenuOpen(false);
                    }}
                    tabIndex={0}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="cta">
            <button
              className="btn"
              id="signupBtn"
              ref={signupRef}
              aria-label="Sign up"
              onClick={handleSignupClick}
            >
              <span className="dot" />
              <span>Sign up</span>
            </button>
          </div>

          <button
            className="hamburger"
            id="menuBtn"
            aria-expanded={menuOpen}
            aria-controls="navList"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((s) => !s)}
          >
            <span className="bars" />
          </button>

          <div className="indicator" id="indicator" ref={indicatorRef} aria-hidden="true" />
          <div className="nav-shadow" aria-hidden="true" />
        </nav>
      </div>

      <style jsx global>{`
        :root {
          --bg: #0f1724;
          --card: #0b1220;
          --accent: linear-gradient(90deg, #7b61ff, #00e0ff);
          --muted: #9aa8bf;
          --glass: rgba(255, 255, 255, 0.03);
          --glass-2: rgba(255, 255, 255, 0.02);
          --nav-height: 72px;
        }

        html,
        body,
        #__next {
          height: 100%;
        }

        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
            Arial;
          background: radial-gradient(1200px 800px at 10% 10%, rgba(123, 97, 255, 0.08), transparent),
            radial-gradient(1000px 700px at 90% 90%, rgba(0, 224, 255, 0.05), transparent), var(--bg);
          color: #e6eef8;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          padding: 40px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 24px;
          min-height: 100vh;
        }

        .nav-wrap {
          width: 100%;
          max-width: 100%;
          perspective: 1200px;
        }

        nav.navbar {
          height: var(--nav-height);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);
          border-radius: 20px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 18px;
          position: relative;
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.02);
          transform-style: preserve-3d;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          overflow: visible;
          backdrop-filter: blur(6px) saturate(1.1);
        }

        /* Logo */
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-right: 6px;
          transform: translateZ(40px) scale(.98);
        }

        .logo .mark {
          width: 46px;
          height: 46px;
          border-radius: 10px;
          background: var(--accent);
          display: grid;
          place-items: center;
          font-weight: 700;
          color: #051025;
          box-shadow: 0 6px 18px rgba(123, 97, 255, 0.18);
          transform: translateZ(50px);
        }

        .logo .word {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.2px;
          color: #ecf5ff;
        }

        .nav-list {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-left: 6px;
          flex: 1;
          list-style: none;
          padding: 0;
          margin: 0;
          transform-style: preserve-3d;
          position: relative;
        }

        .nav-list li {
          list-style: none;
        }

        .nav-item {
          display: inline-block;
          position: relative;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          color: var(--muted);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: transform .22s cubic-bezier(.2, .9, .3, 1), color .18s ease;
          transform: translateZ(30px);
          -webkit-tap-highlight-color: transparent;
        }

        .nav-item:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(123, 97, 255, 0.12);
        }

        .nav-item:hover {
          color: #fff;
          transform: translateZ(60px) translateY(-3px);
        }

        /* Dropdown */
        .dropdown-parent {
          position: relative;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: var(--card);
          border-radius: 12px;
          padding: 8px 0;
          display: none;
          flex-direction: column;
          min-width: 160px;
          z-index: 10;
          box-shadow: 0 8px 24px rgba(2, 6, 23, 0.6);
        }

        .dropdown a {
          padding: 10px 16px;
          color: var(--muted);
          text-decoration: none;
          font-size: 14px;
          display: block;
        }

        .dropdown a:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .dropdown-parent:hover > .dropdown,
        .dropdown-parent:focus-within > .dropdown {
          display: flex;
        }

        .indicator {
          position: absolute;
          left: 0;
          bottom: 8px;
          height: 6px;
          border-radius: 6px;
          background: var(--accent);
          width: 60px;
          transform-origin: center;
          transition: transform .28s cubic-bezier(.2, .9, .3, 1), left .28s ease, width .28s ease;
          z-index: 1;
          filter: blur(6px);
          transform: translateZ(40px);
        }

        .nav-shadow {
          position: absolute;
          left: 8px;
          right: 8px;
          bottom: -20px;
          height: 46px;
          border-radius: 14px;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(2, 6, 23, 0.45), rgba(2, 6, 23, 0.14));
          filter: blur(12px);
          z-index: 0;
          transform: translateZ(-40px) scale(.98);
        }

        .cta {
          margin-left: auto;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
          cursor: pointer;
          font-weight: 700;
          transform: translateZ(30px);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        #signupBtn span:last-child {
          color: #fff;
        }

        .btn:hover {
          transform: translateZ(36px) scale(1.03);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
        }

        .btn .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(90deg, #ff8a5b, #ff5ab3);
          box-shadow: 0 6px 18px rgba(255, 90, 150, 0.12);
          display: inline-block;
        }

        .hamburger {
          display: none;
          border: none;
          background: none;
          padding: 8px;
          border-radius: 10px;
        }

        .hamburger .bars {
          width: 28px;
          height: 2px;
          background: #cfe8ff;
          border-radius: 2px;
          position: relative;
          display: block;
        }

        .hamburger .bars::before,
        .hamburger .bars::after {
          content: '';
          position: absolute;
          left: 0;
          width: 28px;
          height: 2px;
          background: #cfe8ff;
          border-radius: 2px;
        }

        .hamburger .bars::before {
          top: -8px;
        }

        .hamburger .bars::after {
          top: 8px;
        }

        @media (max-width:820px) {
          .nav-list {
            display: none;
            position: absolute;
            left: 18px;
            right: 18px;
            top: calc(var(--nav-height) + 8px);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);
            padding: 12px;
            border-radius: 14px;
            flex-direction: column;
            gap: 8px;
          }

          .nav-list.open {
            display: flex;
          }

          .hamburger {
            display: inline-block;
            margin-left: auto;
          }

          .cta {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
