'use client';
import React, { useEffect } from 'react';
import './Contact.css';

const Contact = () => {
    useEffect(() => {
        const card = document.getElementById('tiltCard');
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const dx = (x - rect.width / 2) / rect.width;
            const dy = (y - rect.height / 2) / rect.height;
            card.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg) translateZ(10px)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="contact-body">
            <div className="contact-card" id="tiltCard">
                {/* Left Side */}
                <div className="contact-left">
                    <h1>Contact Us</h1>
                    <p>We’d love to hear from you. Please fill out the form below, and we’ll respond as soon as possible.</p>

                    <form className="contact-form">
                        <div className="input-group">
                            <input type="text" required placeholder=" " />
                            <label>Name</label>
                        </div>
                        <div className="input-group">
                            <input type="email" required placeholder=" " />
                            <label>Email</label>
                        </div>
                        <div className="input-group">
                            <input type="text" required placeholder=" " />
                            <label>Subject</label>
                        </div>
                        <div className="input-group">
                            <textarea required placeholder=" "></textarea>
                            <label>Message</label>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                </div>

                {/* Right Side */}
                <div className="contact-right">
                    <div className="overlay-info">
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <div className="info-text">
                                <h3>Address</h3>
                                <p>123 Premium Street, Dhaka, Bangladesh</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="info-text">
                                <h3>Email</h3>
                                <p>info@example.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="info-text">
                                <h3>Phone</h3>
                                <p>+880 1234 567890</p>
                            </div>
                        </div>
                    </div>

                    <div className="googleLocation">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7298.9601660514445!2d90.36501104206765!3d23.837080364445058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a3366b005%3A0x901b07016468944c!2sMirpur%20DOHS%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1761044073974!5m2!1sen!2sbd"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
