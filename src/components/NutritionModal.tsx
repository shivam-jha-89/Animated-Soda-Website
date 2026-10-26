"use client";

import { useState } from "react";
import clsx from "clsx";

const NUTRITION = {
    blackCherry: { calories: 35, sugar: 4, fiber: 9, protein: 0, sodium: 20, probiotics: "1B CFU", vitamin_c: "15%" },
    grape: { calories: 30, sugar: 3, fiber: 9, protein: 0, sodium: 20, probiotics: "1B CFU", vitamin_c: "10%" },
    lemonLime: { calories: 25, sugar: 3, fiber: 9, protein: 0, sodium: 15, probiotics: "1B CFU", vitamin_c: "20%" },
    strawberryLemonade: { calories: 35, sugar: 5, fiber: 9, protein: 0, sodium: 20, probiotics: "1B CFU", vitamin_c: "25%" },
    watermelon: { calories: 30, sugar: 4, fiber: 9, protein: 0, sodium: 15, probiotics: "1B CFU", vitamin_c: "12%" },
};

const FLAVOR_NAMES: Record<string, string> = {
    blackCherry: "Black Cherry",
    grape: "Grape Goodness",
    lemonLime: "Lemon Lime",
    strawberryLemonade: "Strawberry Lemonade",
    watermelon: "Watermelon Crush",
};

type Flavor = keyof typeof NUTRITION;

type Props = {
    flavor: Flavor;
    onClose: () => void;
};

export function NutritionModal({ flavor, onClose }: Props) {
    const info = NUTRITION[flavor];

    return (
        <div
            className="fixed inset-0 z-[800] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative mx-4 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl dark:bg-sky-900"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-orange-500"
                >✕</button>

                <h3 className="mb-1 text-center text-2xl font-black text-sky-950 dark:text-white">
                    Nutrition Facts
                </h3>
                <p className="mb-4 text-center text-sm text-orange-500 font-semibold">
                    {FLAVOR_NAMES[flavor]} — 12 fl oz (355ml)
                </p>

                <div className="rounded-xl border-4 border-sky-950 p-4 dark:border-sky-300">
                    <div className="border-b-8 border-sky-950 pb-1 dark:border-sky-300">
                        <p className="text-4xl font-black text-sky-950 dark:text-white">Nutrition Facts</p>
                        <p className="text-xs text-gray-600 dark:text-sky-400">1 serving per container · Serving size 12 fl oz (355ml)</p>
                    </div>

                    <div className="mt-2 border-b-4 border-sky-950 dark:border-sky-300">
                        <p className="text-xs font-semibold text-gray-600 dark:text-sky-400">Amount per serving</p>
                        <div className="flex items-baseline justify-between">
                            <span className="text-lg font-black text-sky-950 dark:text-white">Calories</span>
                            <span className="text-4xl font-black text-sky-950 dark:text-white">{info.calories}</span>
                        </div>
                    </div>

                    {[
                        { label: "Total Fat", value: "0g", dv: "0%" },
                        { label: "Sodium", value: `${info.sodium}mg`, dv: "1%" },
                        { label: "Total Carb.", value: `${info.sugar + info.fiber}g`, dv: "5%" },
                        { label: "  Dietary Fiber", value: `${info.fiber}g`, dv: "32%" },
                        { label: "  Total Sugars", value: `${info.sugar}g`, dv: "" },
                        { label: "Protein", value: `${info.protein}g`, dv: "0%" },
                    ].map((row) => (
                        <div
                            key={row.label}
                            className="flex items-center justify-between border-b border-gray-200 py-1 dark:border-sky-700"
                        >
                            <span className={clsx("text-xs text-sky-950 dark:text-sky-200", row.label.startsWith("  ") && "pl-3")}>
                                <strong>{row.label.trim()}</strong>
                            </span>
                            <div className="flex gap-4">
                                <span className="text-xs text-sky-950 dark:text-sky-200">{row.value}</span>
                                {row.dv && <span className="text-xs font-bold text-sky-950 dark:text-sky-200">{row.dv}</span>}
                            </div>
                        </div>
                    ))}

                    <div className="mt-2 rounded-lg bg-green-50 p-2 dark:bg-green-900/20">
                        <p className="text-xs font-bold text-green-700 dark:text-green-400">🌟 Probiotics: {info.probiotics}</p>
                        <p className="text-xs font-bold text-green-700 dark:text-green-400">🍊 Vitamin C: {info.vitamin_c} DV</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
