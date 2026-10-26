"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [pct, setPct] = useState(0);

    useEffect(() => {
        function onScroll() {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const total = scrollHeight - clientHeight;
            setPct(total > 0 ? (scrollTop / total) * 100 : 0);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="fixed left-0 top-0 z-[9997] h-1 w-full bg-transparent">
            <div
                className="h-full bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 shadow-[0_0_8px_rgba(255,92,58,0.6)]"
                style={{ width: `${pct}%`, transition: "width 0.1s linear" }}
            />
        </div>
    );
}
