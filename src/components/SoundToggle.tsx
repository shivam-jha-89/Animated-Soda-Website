"use client";

import { useEffect, useRef, useState } from "react";

export default function SoundToggle() {
    const [playing, setPlaying] = useState(false);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const nodesRef = useRef<OscillatorNode[]>([]);

    function startAmbient() {
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;
        const nodes: OscillatorNode[] = [];

        // Create subtle fizzy bubble sound via multiple low-freq oscillators
        const frequencies = [60, 120, 200, 340];
        frequencies.forEach((freq) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            osc.frequency.setTargetAtTime(
                freq + Math.random() * 20,
                ctx.currentTime,
                2,
            );

            filter.type = "bandpass";
            filter.frequency.value = freq;
            filter.Q.value = 0.5;

            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 1);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            nodes.push(osc);
        });

        nodesRef.current = nodes;
    }

    function stopAmbient() {
        nodesRef.current.forEach((n) => {
            try {
                n.stop();
            } catch { }
        });
        audioCtxRef.current?.close();
        nodesRef.current = [];
        audioCtxRef.current = null;
    }

    function toggle() {
        if (playing) {
            stopAmbient();
            setPlaying(false);
        } else {
            startAmbient();
            setPlaying(true);
        }
    }

    useEffect(() => () => stopAmbient(), []);

    return (
        <button
            onClick={toggle}
            aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
            title={playing ? "Mute sound" : "Play ambient sound"}
            className="fixed bottom-6 right-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-all duration-300 hover:animate-pulse-glow hover:scale-110 hover:bg-orange-600"
        >
            {playing ? (
                /* Speaker with waves */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" strokeLinecap="round" />
                </svg>
            ) : (
                /* Speaker muted */
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" strokeLinecap="round" />
                    <line x1="17" y1="9" x2="23" y2="15" strokeLinecap="round" />
                </svg>
            )}
        </button>
    );
}
