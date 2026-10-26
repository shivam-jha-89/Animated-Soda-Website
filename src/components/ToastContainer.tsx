"use client";

import { create } from "zustand";
import { useEffect } from "react";
import clsx from "clsx";

type Toast = {
    id: number;
    message: string;
    emoji?: string;
    type?: "success" | "info" | "error";
};

type ToastStore = {
    toasts: Toast[];
    addToast: (msg: string, emoji?: string, type?: Toast["type"]) => void;
    removeToast: (id: number) => void;
};

export const useToast = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (message, emoji = "✅", type = "success") =>
        set((state) => {
            const id = Date.now();
            setTimeout(
                () => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
                3500,
            );
            return { toasts: [...state.toasts, { id, message, emoji, type }] };
        }),
    removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return (
        <div className="pointer-events-none fixed bottom-20 right-6 z-[500] flex flex-col gap-3">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={clsx(
                        "pointer-events-auto flex animate-fade-in items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl",
                        t.type === "error"
                            ? "bg-red-500 text-white"
                            : "bg-white text-sky-950 dark:bg-sky-900 dark:text-white",
                    )}
                    style={{ minWidth: 240 }}
                >
                    <span className="text-2xl">{t.emoji}</span>
                    <p className="flex-1 text-sm font-semibold">{t.message}</p>
                    <button
                        onClick={() => removeToast(t.id)}
                        className="ml-2 opacity-50 hover:opacity-100"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}
