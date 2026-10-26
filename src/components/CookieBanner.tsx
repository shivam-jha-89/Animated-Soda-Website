"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("fizzi-cookie-consent");
        if (!consent) setVisible(true);
    }, []);

    function accept() {
        localStorage.setItem("fizzi-cookie-consent", "accepted");
        setVisible(false);
    }

    function decline() {
        localStorage.setItem("fizzi-cookie-consent", "declined");
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[900] border-t border-yellow-200 bg-white/95 backdrop-blur-md dark:border-sky-700 dark:bg-sky-950/95">
            <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">🍪</span>
                    <p className="text-sm text-gray-600 dark:text-sky-300">
                        We use cookies to improve your experience and analyze site traffic.
                        By continuing, you agree to our{" "}
                        <a href="#" className="font-semibold text-orange-500 underline">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <button
                        onClick={decline}
                        className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 dark:border-sky-700 dark:text-sky-400 dark:hover:bg-sky-800"
                    >
                        Decline
                    </button>
                    <button
                        onClick={accept}
                        className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow transition-colors hover:bg-orange-600"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
