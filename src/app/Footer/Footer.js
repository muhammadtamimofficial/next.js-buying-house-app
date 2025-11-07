'use client';
import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                {/* Company Info */}
                <div className="footer-logo-section">
                    <h2 className="footer-logo">PrimeSoft</h2>
                    <p>
                        We deliver innovative software solutions that empower businesses and individuals
                        worldwide. Excellence, creativity, and trust are at the heart of everything we do.
                    </p>
                    <div className="footer-socials">
                        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/mission">Our Mission</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/about">About Us</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="footer-newsletter">
                    <h3>Newsletter</h3>
                    <p>Subscribe to our newsletter to get the latest updates.</p>
                    <form>
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} PrimeSoft Innovation. All rights reserved.</p>
            </div>
        </footer>
    );
}
