'use client'; import React, { useState, useEffect } from 'react';
import Slider from './Slider/Slider';

// This component is designed to be placed in a 'loading.js' or 'loading.jsx' file
// within any Next.js App Router segment (e.g., app/dashboard/loading.jsx).
export default function Loading() {
    const [loadingText, setLoadingText] = useState("Initializing Application");
    const texts = ["Initializing Application", "Fetching Server Data", "Compiling Assets", "Awaiting Hydration"];
    const progressWidths = [25, 50, 75, 100]; // Progress percentage

    const [progressIndex, setProgressIndex] = useState(0);

    // Custom hook to cycle the loading text and progress
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setProgressIndex(index);
            setLoadingText(texts[index % texts.length]);
            index++;
            if (index >= texts.length) {
                clearInterval(interval);
            }
        }, 2500); // Change every 2.5 seconds

        return () => clearInterval(interval);
    }, []);

    const currentProgress = progressWidths[progressIndex % progressWidths.length];


    return (
        // Full screen container using pure vanilla CSS classes
        <div className="loading-container">
            <style>{`
        /* Import Google Font (Inter) - crucial for the modern look */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');

        /* Base styles */
        .loading-container {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #111827; /* Dark Gray */
            color: #FFFFFF;
            padding: 1.5rem;
            transition: opacity 500ms;
            box-sizing: border-box;
        }

        /* Dot Animation */
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
        }

        .dot-container {
            display: flex;
            gap: 0.75rem; /* space-x-3 */
            margin-bottom: 2rem; /* mb-8 */
        }

        .dot {
            width: 1rem; /* w-4 */
            height: 1rem; /* h-4 */
            background-color: #6366F1; /* Indigo */
            border-radius: 9999px; /* rounded-full */
            animation: bounce 1.4s infinite ease-in-out both;
        }

        .dot-1 { animation-delay: -0.32s; }
        .dot-2 { animation-delay: -0.16s; }
        .dot-3 { animation-delay: 0s; }

        /* Main Content Box */
        .content-box {
            background-color: #1F2937; /* Gray 800 */
            padding: 2rem; /* p-8 */
            border-radius: 0.75rem; /* rounded-xl */
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
            max-width: 32rem;
            width: 100%;
            text-align: center;
            border: 1px solid rgba(79, 70, 229, 0.5); /* Indigo Border */
        }

        /* Responsive padding for larger screens (sm:p-12) */
        @media (min-width: 640px) { 
            .content-box {
                padding: 3rem;
            }
        }

        /* Gradient Text Title */
        .title {
            font-size: 2.25rem; 
            font-weight: 800; 
            margin-bottom: 1rem; 
            letter-spacing: -0.025em; 
            background: linear-gradient(to right, #818CF8, #C084FC);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent; 
        }

        /* Subtitle */
        .subtitle {
            font-size: 1.125rem; 
            color: #9CA3AF; /* Gray 400 */
            margin-bottom: 1.5rem; 
        }

        /* Progress Bar */
        .progress-wrapper {
            margin-top: 1rem; 
        }

        .progress-bar {
            height: 0.5rem; 
            background-color: #374151; /* Gray 700 */
            border-radius: 9999px; 
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background-color: #6366F1; /* Indigo */
            transition: width 1000ms ease-out; 
        }

        .status-text {
            margin-top: 0.75rem; 
            font-size: 0.875rem; 
            font-weight: 500; 
            color: #D1D5DB; /* Gray 300 */
        }

        .footer-text {
            margin-top: 2rem; 
            font-size: 0.75rem; 
            color: #6B7280; /* Gray 500 */
        }
      `}</style>

            {/* Loading animation container */}
            <div className="dot-container">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
            </div>

            {/* Main content box */}
            <div className="content-box">
                <h1 className="title">
                    App are Loading
                </h1>
                <p className="subtitle">
                    A moment while we prepare your page...
                </p>

                {/* Dynamic Loading Status Bar */}
                <div className="progress-wrapper">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${currentProgress}%` }}
                        ></div>
                    </div>
                    <p className="status-text">
                        {loadingText}
                    </p>
                </div>

                <div className="footer-text">
                    Securely serving assets from the edge.
                </div>
            </div>
        </div>
    );
}