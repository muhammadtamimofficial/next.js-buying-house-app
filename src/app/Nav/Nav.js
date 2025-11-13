"use client";
import Head from "next/head";
import { useRef, useState } from "react";

// Components
import Slider from '../Slider/Slider';
import Overview from '../Overview/Overview';
import ProductCategory from '../ProductCategory/ProductCategory';
import OurMission from '../OurMission/OurMission';
import FAQ from '../FAQ/FAQ';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';

export default function Home() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", id: "slider" },
    { label: "Overview", id: "overview" },
    { label: "Product Category", id: "productcategory" },
    { label: "Our Mission", id: "ourmission" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  const scrollToSection = (id, e) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setMenuOpen(false);
  };

  return (
    <>
      <Head>
        <title>My Page</title>
      </Head>

      {/* NAV */}
      <header className="nav-wrap" ref={navRef}>
        <nav className="navbar" role="navigation" aria-label="Primary">
          <div className="logo">Logo</div>

          {/* Desktop Menu */}
          <ul className="nav-list" role="menubar">
            {menuItems.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="nav-item"
                  onClick={(e) => scrollToSection(id, e)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            className="cta"
            onClick={(e) => scrollToSection("contact", e)}
          >
            Sign up
          </button>

          {/* Mobile Hamburger */}
          <button
            className="hamburger"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {menuItems.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="mobile-item"
                onClick={(e) => scrollToSection(id, e)}
              >
                {label}
              </a>
            ))}
            <a
              className="mobile-item"
              onClick={(e) => scrollToSection("contact", e)}
            >
              Sign Up
            </a>
          </div>
        )}
      </header>

      {/* MAIN SECTIONS */}
      <main className="page">
        <section id="slider" className="slider-section"><Slider /></section>
        <section id="overview" className="page-section"><Overview /></section>
        <section id="productcategory" className="page-section"><ProductCategory /></section>
        <section id="ourmission" className="page-section"><OurMission /></section>
        <section id="faq" className="page-section"><FAQ /></section>
        <section id="contact" className="page-section"><Contact /></section>
        <Footer />
      </main>

      {/* STYLES */}
      <style jsx global>{`
        :root {
          --nav-height: 72px;
          --bg: #0f1724;
        }

        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          background: var(--bg);
          color: #e6eef8;
          font-family: Inter, system-ui;
        }

        /* NAV */
        .nav-wrap {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 48px);
          max-width: 1200px;
          z-index: 1000;
          padding: 0 24px;
        }

        nav.navbar {
          height: var(--nav-height);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(6px);
        }

        .logo { font-weight: 700; margin-right: 8px; }

        .nav-list {
          display: flex;
          gap: 8px;
          flex: 1;
          list-style: none;
        }

        .nav-item {
          padding: 10px 14px;
          border-radius: 10px;
          color: #9aa8bf;
          text-decoration: none;
          font-weight: 600;
        }

        .nav-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.02);
        }

        .cta {
          padding: 8px 12px;
          border-radius: 10px;
          background: linear-gradient(90deg, #7b61ff, #00e0ff);
          color: #051025;
          border: none;
          cursor: pointer;
          font-weight: 700;
        }

        .hamburger {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 26px;
          margin-left: auto;
          cursor: pointer;
        }

        .mobile-menu {
          margin-top: 8px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(6px);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .mobile-item {
          color: #e6eef8;
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 10px;
          font-weight: 600;
        }
        .mobile-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        /* PAGE SECTIONS */
        .page {
          padding-top: calc(var(--nav-height) + 70px);
        }

        .page-section {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 48px 24px;
          scroll-margin-top: calc(var(--nav-height) + 20px);
        }

        /* Slider section fix */
        .slider-section {
          display: block !important;
          min-height: 100vh;
          position: relative;
          overflow: visible;
        }

        @media (max-width: 820px) {
          .nav-list { display: none; }
          .cta { display: none; }
          .hamburger { display: block; }
        }
      `}</style>
    </>
  );
}
