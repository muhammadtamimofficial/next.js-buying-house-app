'use client';
import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
    {
        question: "What services does your company provide?",
        answer: "We offer web and mobile application development, including UI/UX design, backend integration, and deployment solutions.",
    },
    {
        question: "How can I contact your support team?",
        answer: "You can reach us through the contact form on our website or email support@example.com. We respond within 24 hours.",
    },
    {
        question: "Do you offer custom development for businesses?",
        answer: "Yes! We specialize in building fully customized solutions tailored to your business needs.",
    },
    {
        question: "What technologies do you use?",
        answer: "We primarily work with React, Next.js, Node.js, and MongoDB — but we can adapt based on your project requirements.",
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on complexity, but we provide clear milestones and regular updates throughout the process.",
    },
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-container">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                    >
                        <button className="faq-question" onClick={() => toggleFAQ(index)}>
                            {faq.question}
                            <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9662;</span>
                        </button>
                        <div
                            className="faq-answer"
                            style={{
                                maxHeight: activeIndex === index ? '200px' : '0px',
                                opacity: activeIndex === index ? 1 : 0,
                            }}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
