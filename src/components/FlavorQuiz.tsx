"use client";

import { useState } from "react";
import clsx from "clsx";

const QUESTIONS = [
    {
        q: "Pick your vibe:",
        options: [
            { label: "🌊 Chill & refreshing", value: "watermelon" },
            { label: "🔥 Bold & intense", value: "blackCherry" },
            { label: "☀️ Bright & sunny", value: "lemonLime" },
            { label: "🌸 Sweet & fruity", value: "strawberryLemonade" },
        ],
    },
    {
        q: "Your ideal Saturday:",
        options: [
            { label: "🏖️ Beach day", value: "watermelon" },
            { label: "🎸 Live concert", value: "blackCherry" },
            { label: "🚴 Bike ride", value: "lemonLime" },
            { label: "🛍️ Brunch with friends", value: "strawberryLemonade" },
        ],
    },
    {
        q: "Choose a color palette:",
        options: [
            { label: "🟢 Greens & nature", value: "watermelon" },
            { label: "🔴 Deep reds & burgundy", value: "blackCherry" },
            { label: "🟡 Yellows & citrus", value: "lemonLime" },
            { label: "🩷 Pinks & pastels", value: "strawberryLemonade" },
        ],
    },
];

const RESULTS: Record<string, { name: string; emoji: string; desc: string; color: string }> = {
    watermelon: {
        name: "Watermelon Crush",
        emoji: "🍉",
        desc: "You're cool, calm, and everyone loves your energy. Summer is your season.",
        color: "from-green-400 to-emerald-600",
    },
    blackCherry: {
        name: "Black Cherry",
        emoji: "🍒",
        desc: "Intense, passionate, and unforgettable. You make every room more interesting.",
        color: "from-red-700 to-rose-900",
    },
    lemonLime: {
        name: "Lemon Lime",
        emoji: "🍋",
        desc: "Sharp, energetic, and always on the move. You live life at full speed.",
        color: "from-yellow-400 to-lime-500",
    },
    strawberryLemonade: {
        name: "Strawberry Lemonade",
        emoji: "🍓",
        desc: "Sweet, social, and vibrant. You bring joy wherever you go.",
        color: "from-pink-400 to-rose-500",
    },
    grape: {
        name: "Grape Goodness",
        emoji: "🍇",
        desc: "Sophisticated and unique. You're the one who discovers things before they're cool.",
        color: "from-violet-500 to-purple-800",
    },
};

export default function FlavorQuiz() {
    const [step, setStep] = useState(0);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [result, setResult] = useState<string | null>(null);

    function answer(value: string) {
        const newScores = { ...scores, [value]: (scores[value] ?? 0) + 1 };
        setScores(newScores);

        const nextStep = step + 1;
        if (nextStep >= QUESTIONS.length) {
            // Pick winner
            const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
            setResult(winner);
        } else {
            setStep(nextStep);
        }
    }

    function reset() {
        setStep(0);
        setScores({});
        setResult(null);
    }

    const resultData = result ? RESULTS[result] : null;

    return (
        <section className="bg-gradient-to-br from-yellow-300 to-orange-200 py-20 dark:from-sky-950 dark:to-sky-900">
            <div className="mx-auto max-w-xl px-4">
                <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                    Find your match
                </p>
                <h2 className="mb-10 text-center text-5xl font-black uppercase text-sky-950 dark:text-white">
                    What Fizzi Are You? 🧪
                </h2>

                {!result ? (
                    <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-sky-900">
                        <p className="mb-6 text-center text-lg font-semibold text-sky-950 dark:text-white">
                            {QUESTIONS[step].q}
                        </p>
                        <div className="space-y-3">
                            {QUESTIONS[step].options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => answer(opt.value)}
                                    className="w-full rounded-xl border-2 border-transparent bg-gray-50 px-5 py-4 text-left font-semibold text-sky-950 transition-all duration-200 hover:border-orange-400 hover:bg-orange-50 dark:bg-sky-800 dark:text-white dark:hover:border-orange-400 dark:hover:bg-sky-700"
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-center gap-2">
                            {QUESTIONS.map((_, i) => (
                                <div
                                    key={i}
                                    className={clsx(
                                        "h-2 rounded-full transition-all duration-300",
                                        i <= step ? "w-8 bg-orange-500" : "w-2 bg-gray-200 dark:bg-sky-700",
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div
                        className={`rounded-3xl bg-gradient-to-br p-1 shadow-2xl ${resultData?.color}`}
                    >
                        <div className="rounded-[calc(1.5rem-4px)] bg-white p-8 text-center dark:bg-sky-900">
                            <span className="text-7xl">{resultData?.emoji}</span>
                            <h3 className="mt-4 text-3xl font-black text-sky-950 dark:text-white">
                                {resultData?.name}
                            </h3>
                            <p className="mt-3 text-gray-600 dark:text-sky-300">{resultData?.desc}</p>
                            <div className="mt-6 flex flex-col gap-3">
                                <button className="w-full rounded-xl bg-orange-500 py-3 font-bold uppercase text-white hover:bg-orange-600">
                                    🛒 Add {resultData?.name} to Cart
                                </button>
                                <button
                                    onClick={reset}
                                    className="text-sm text-gray-400 hover:text-orange-500 dark:text-sky-500"
                                >
                                    Retake quiz
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
