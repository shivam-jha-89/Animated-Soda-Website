"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("fizzi-theme");
        if (stored === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        }
    }, []);

    function toggle() {
        const next = !dark;
        setDark(next);
        if (next) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("fizzi-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("fizzi-theme", "light");
        }
    }

    return (
        <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-sky-800 bg-white/20 text-sky-800 backdrop-blur-sm transition-all duration-300 hover:bg-sky-800 hover:text-white dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-300 dark:hover:text-sky-900"
        >
            {dark ? (
                /* Sun */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="5" strokeLinecap="round" />
                    <line x1="12" y1="1" x2="12" y2="3" strokeLinecap="round" />
                    <line x1="12" y1="21" x2="12" y2="23" strokeLinecap="round" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeLinecap="round" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeLinecap="round" />
                    <line x1="1" y1="12" x2="3" y2="12" strokeLinecap="round" />
                    <line x1="21" y1="12" x2="23" y2="12" strokeLinecap="round" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeLinecap="round" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeLinecap="round" />
                </svg>
            ) : (
                /* Moon */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            )}
        </button>
    );
}
