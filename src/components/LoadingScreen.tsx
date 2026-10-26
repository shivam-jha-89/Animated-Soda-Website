"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFading(true);
            setTimeout(() => setVisible(false), 700);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-yellow-300"
            style={{
                transition: "opacity 0.7s ease-out",
                opacity: fading ? 0 : 1,
                pointerEvents: fading ? "none" : "all",
            }}
        >
            {/* Animated can */}
            <div
                className="relative flex h-32 w-16 flex-col items-center"
                style={{ animation: "fizz-bounce 0.6s ease-in-out infinite alternate" }}
            >
                <div className="h-3 w-12 rounded-t-lg bg-gray-400" />
                <div className="flex flex-1 w-full flex-col items-center justify-center rounded-b-xl bg-gradient-to-b from-orange-400 to-orange-600">
                    <span className="text-2xl font-black italic text-white">fizzi</span>
                </div>
                {/* Bubbles */}
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/60"
                        style={{
                            width: `${6 + i * 2}px`,
                            height: `${6 + i * 2}px`,
                            bottom: `${90 + i * 20}px`,
                            left: `${20 + (i % 2 === 0 ? -8 : 8)}px`,
                            animation: `bubble-rise 1s ease-out ${i * 0.2}s infinite`,
                        }}
                    />
                ))}
            </div>

            <p className="mt-8 text-xl font-black uppercase tracking-[0.3em] text-orange-500">
                Loading Fizzi...
            </p>

            <style>{`
        @keyframes fizz-bounce {
          from { transform: translateY(0); }
          to   { transform: translateY(-12px); }
        }
        @keyframes bubble-rise {
          0%   { opacity: 0.8; transform: translateY(0) scale(1); }
          100% { opacity: 0;   transform: translateY(-60px) scale(0.3); }
        }
      `}</style>
        </div>
    );
}
