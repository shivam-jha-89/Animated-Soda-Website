"use client";

import { useState } from "react";
import clsx from "clsx";

const FAQS = [
    {
        q: "What makes Fizzi different from regular soda?",
        a: "Fizzi has only 3–5g of sugar, 9g of prebiotic fiber, and 1 billion probiotics — all with zero artificial ingredients. Regular sodas have 35–45g of sugar and zero nutritional benefit.",
    },
    {
        q: "Do I need to refrigerate Fizzi?",
        a: "Nope! Fizzi is shelf-stable until opened. Once open, keep it refrigerated and enjoy within 24 hours for maximum fizziness.",
    },
    {
        q: "Are Fizzi drinks vegan and gluten-free?",
        a: "Yes! All Fizzi flavors are 100% vegan, gluten-free, and non-GMO. We believe everyone deserves great-tasting gut health.",
    },
    {
        q: "How many cans can I drink per day?",
        a: "We recommend 1–2 cans per day. With 9g of prebiotic fiber per can, drinking more than 2 might cause some extra gut activity as your microbiome adjusts.",
    },
    {
        q: "Is the probiotic in Fizzi heat-stable?",
        a: "Yes! We use a specially encapsulated probiotic strand that survives the canning process. 1 billion CFU delivered directly to your gut.",
    },
    {
        q: "What is your return/refund policy?",
        a: "We offer a 30-day satisfaction guarantee. If you're not happy with your order for any reason, contact us and we'll make it right — no questions asked.",
    },
    {
        q: "Do you ship internationally?",
        a: "Currently we ship to the US and Canada. International shipping is coming soon — sign up for our newsletter to be the first to know!",
    },
];

export default function FAQSection() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="faq" className="bg-white py-20 dark:bg-sky-900">
            <div className="mx-auto max-w-2xl px-4">
                <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-orange-500">
                    Got questions?
                </p>
                <h2 className="mb-12 text-center text-5xl font-black uppercase text-sky-950 dark:text-white">
                    FAQ 🤔
                </h2>

                <div className="space-y-3">
                    {FAQS.map((faq, i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-2xl border border-gray-100 dark:border-sky-700"
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="flex w-full items-center justify-between bg-gray-50 px-6 py-5 text-left font-bold text-sky-950 transition-colors hover:bg-yellow-50 dark:bg-sky-800 dark:text-white dark:hover:bg-sky-700"
                            >
                                <span>{faq.q}</span>
                                <span
                                    className={clsx(
                                        "ml-4 flex-shrink-0 text-orange-500 transition-transform duration-300",
                                        open === i ? "rotate-45" : "rotate-0",
                                    )}
                                >
                                    ✚
                                </span>
                            </button>
                            <div
                                className={clsx(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    open === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
                                )}
                            >
                                <p className="px-6 py-5 text-gray-600 dark:text-sky-300">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
