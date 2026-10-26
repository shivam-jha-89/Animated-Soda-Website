"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const bubblesRef = useRef<HTMLDivElement[]>([]);
    const posRef = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const animRef = useRef<number>(0);

    useEffect(() => {
        const isMobile = window.matchMedia("(pointer: coarse)").matches;
        if (isMobile) return;

        // Hide default cursor
        document.documentElement.style.cursor = "none";

        function onMove(e: MouseEvent) {
            posRef.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
            }
            spawnBubble(e.clientX, e.clientY);
        }

        let lastBubble = 0;
        function spawnBubble(x: number, y: number) {
            const now = Date.now();
            if (now - lastBubble < 60) return;
            lastBubble = now;

            const bubble = document.createElement("div");
            const size = 6 + Math.random() * 10;
            bubble.style.cssText = `
        position: fixed;
        z-index: 9998;
        border-radius: 50%;
        pointer-events: none;
        background: rgba(255, 200, 100, 0.6);
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        transition: all 0.8s ease-out;
        transform: scale(1);
        opacity: 0.8;
      `;
            document.body.appendChild(bubble);

            requestAnimationFrame(() => {
                bubble.style.transform = `translate(${(Math.random() - 0.5) * 40}px, ${-30 - Math.random() * 40}px) scale(0)`;
                bubble.style.opacity = "0";
            });

            setTimeout(() => bubble.remove(), 900);
        }

        function animate() {
            // Smooth ring follow
            ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12;
            ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
            }
            animRef.current = requestAnimationFrame(animate);
        }

        window.addEventListener("mousemove", onMove);
        animRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(animRef.current);
            document.documentElement.style.cursor = "";
        };
    }, []);

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-orange-500"
                style={{ transition: "transform 0.05s linear" }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border-2 border-orange-400 opacity-60"
            />
        </>
    );
}
