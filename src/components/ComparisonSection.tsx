"use client";

const COMPARISON = [
    { feature: "Sugar", fizzi: "3–5g", regular: "35–45g", better: true },
    { feature: "Calories", fizzi: "35 kcal", regular: "150 kcal", better: true },
    { feature: "Prebiotic Fiber", fizzi: "9g", regular: "0g", better: true },
    { feature: "Probiotics", fizzi: "1 Billion CFU", regular: "None", better: true },
    { feature: "Artificial Flavors", fizzi: "Zero", regular: "Yes", better: true },
    { feature: "Preservatives", fizzi: "None", regular: "Yes", better: true },
    { feature: "Non-GMO", fizzi: "✅ Yes", regular: "❌ No", better: true },
    { feature: "Gut Health Benefit", fizzi: "✅ Yes", regular: "❌ No", better: true },
];

export default function ComparisonSection() {
    return (
        <section
            id="about"
            className="bg-gradient-to-b from-yellow-50 to-white py-20 dark:from-sky-950 dark:to-sky-900"
        >
            <div className="mx-auto max-w-3xl px-4">
                <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-orange-500">
                    The numbers don&apos;t lie
                </p>
                <h2 className="mb-12 text-center text-5xl font-black uppercase text-sky-950 dark:text-white">
                    Fizzi vs Regular Soda
                </h2>

                <div className="overflow-hidden rounded-3xl border border-yellow-200 shadow-xl dark:border-sky-700">
                    {/* Header */}
                    <div className="grid grid-cols-3 bg-sky-950 px-6 py-4 dark:bg-sky-800">
                        <span className="font-bold text-yellow-300">Feature</span>
                        <span className="text-center font-bold text-orange-400">Fizzi 🥤</span>
                        <span className="text-center font-bold text-gray-400">Regular Soda</span>
                    </div>

                    {/* Rows */}
                    {COMPARISON.map((row, i) => (
                        <div
                            key={row.feature}
                            className={`grid grid-cols-3 items-center px-6 py-4 ${i % 2 === 0
                                ? "bg-white dark:bg-sky-900"
                                : "bg-yellow-50 dark:bg-sky-950"
                                }`}
                        >
                            <span className="font-semibold text-sky-950 dark:text-sky-200">
                                {row.feature}
                            </span>
                            <span className="text-center font-bold text-green-600 dark:text-green-400">
                                {row.fizzi}
                            </span>
                            <span className="text-center text-gray-400 line-through">
                                {row.regular}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="mt-6 text-center text-sm text-gray-400 dark:text-sky-500">
                    * Comparison based on average 12oz serving of leading cola brands.
                </p>
            </div>
        </section>
    );
}
