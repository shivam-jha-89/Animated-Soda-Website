"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function onScroll() {
            setVisible(window.scrollY > 400);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className={`fixed bottom-24 right-6 z-[998] flex h-12 w-12 items-center justify-center rounded-full bg-sky-800 text-white shadow-lg transition-all duration-300 hover:bg-sky-700 dark:bg-yellow-400 dark:text-sky-950 dark:hover:bg-yellow-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
                }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
}
