'use client';
import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Company Info */}
                <div className="footer-brand">
                    <h2>Company Name </h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta,
                        eum quaerat ad laboriosam iste </p>
                </div>

                {/* Contact Info */}
                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <div className="contact-item"><FaMapMarkerAlt className="contact-icon" /> 123 Premium Street, Dhaka, Bangladesh</div>
                    <div className="contact-item"><FaEnvelope className="contact-icon" /> info@example.com</div>
                    <div className="contact-item"><FaPhoneAlt className="contact-icon" /> +880 1234 567890</div>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="footer-socials">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <a className='developer' href="https://www.linkedin.com/in/muhammadtamimofficial" target="_blank" rel="noopener noreferrer">
                    <p>&copy; {2025} Muhammad Tamim. All rights reserved.</p>
                </a>
            </div>
        </footer>
    );
}
