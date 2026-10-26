"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import clsx from "clsx";

const FLAVOR_EMOJI: Record<string, string> = {
    blackCherry: "🍒",
    grape: "🍇",
    lemonLime: "🍋",
    strawberryLemonade: "🍓",
    watermelon: "🍉",
};

export default function CartDrawer() {
    const {
        items, isOpen, closeCart, removeItem, updateQuantity, clearCart,
        promoCode, promoDiscount, promoError, applyPromo, clearPromo,
    } = useCart();

    const [promoInput, setPromoInput] = useState("");

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discountAmt = subtotal * promoDiscount;
    const total = subtotal - discountAmt;
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    // Bundle discount: 12+ cans → extra 10% off
    const totalCans = items.reduce((s, i) => s + i.quantity, 0);
    const bundleDiscount = totalCans >= 12 ? 0.1 : 0;
    const finalTotal = total * (1 - bundleDiscount);

    function handlePromo(e: React.FormEvent) {
        e.preventDefault();
        applyPromo(promoInput);
    }

    return (
        <>
            <div
                className={clsx(
                    "fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                onClick={closeCart}
            />
            <div
                className={clsx(
                    "fixed right-0 top-0 z-[201] flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ease-in-out dark:bg-sky-950",
                    isOpen ? "translate-x-0" : "translate-x-full",
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-sky-800">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-black uppercase tracking-wide text-sky-950 dark:text-white">Your Cart</span>
                        {totalItems > 0 && (
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">{totalItems}</span>
                        )}
                    </div>
                    <button onClick={closeCart} className="rounded-full p-2 text-sky-800 transition-colors hover:bg-sky-100 dark:text-sky-200 dark:hover:bg-sky-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Bundle badge */}
                {totalCans > 0 && totalCans < 12 && (
                    <div className="mx-4 mt-3 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-2 text-center text-xs font-semibold text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
                        🎁 Add {12 - totalCans} more can{12 - totalCans !== 1 ? "s" : ""} to unlock <strong>10% bundle discount!</strong>
                    </div>
                )}
                {totalCans >= 12 && (
                    <div className="mx-4 mt-3 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-center text-xs font-bold text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300">
                        🎉 Bundle discount unlocked — 10% off!
                    </div>
                )}

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-4 pt-20 text-center">
                            <span className="text-6xl">🥤</span>
                            <p className="text-lg font-semibold text-sky-800 dark:text-sky-200">Your cart is empty</p>
                            <p className="text-sm text-gray-500 dark:text-sky-400">Add a flavor from the carousel below!</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li key={item.flavor} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-sky-800 dark:bg-sky-900">
                                    <span className="text-3xl">{FLAVOR_EMOJI[item.flavor as string] ?? "🥤"}</span>
                                    <div className="flex-1">
                                        <p className="font-bold text-sky-950 dark:text-white">{item.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-sky-400">${item.price.toFixed(2)} each</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => updateQuantity(item.flavor, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-bold text-sky-950 transition-colors hover:bg-orange-200 dark:bg-sky-700 dark:text-white">−</button>
                                        <span className="w-4 text-center font-semibold text-sky-950 dark:text-white">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.flavor, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 font-bold text-sky-950 transition-colors hover:bg-orange-200 dark:bg-sky-700 dark:text-white">+</button>
                                        <button onClick={() => removeItem(item.flavor)} className="ml-2 text-red-400 transition-colors hover:text-red-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <polyline points="3 6 5 6 21 6" strokeLinecap="round" /><path d="M19 6l-1 14H6L5 6" strokeLinecap="round" /><path d="M10 11v6M14 11v6" strokeLinecap="round" /><path d="M9 6V4h6v2" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-gray-100 px-6 py-5 dark:border-sky-800">
                        {/* Promo code */}
                        <form onSubmit={handlePromo} className="mb-4 flex gap-2">
                            <input
                                value={promoInput}
                                onChange={(e) => setPromoInput(e.target.value)}
                                placeholder="Promo code (try FIZZI10)"
                                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-sky-950 outline-none focus:border-orange-400 dark:border-sky-700 dark:bg-sky-900 dark:text-white"
                            />
                            {promoDiscount ? (
                                <button type="button" onClick={clearPromo} className="rounded-xl bg-red-100 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-200">Remove</button>
                            ) : (
                                <button type="submit" className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600">Apply</button>
                            )}
                        </form>
                        {promoError && <p className="mb-2 text-xs text-red-500">{promoError}</p>}
                        {promoDiscount > 0 && (
                            <p className="mb-2 text-xs font-bold text-green-600 dark:text-green-400">
                                ✅ Code <strong>{promoCode}</strong> applied — {Math.round(promoDiscount * 100)}% off!
                            </p>
                        )}

                        {/* Totals */}
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between text-gray-500 dark:text-sky-400">
                                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                            </div>
                            {promoDiscount > 0 && (
                                <div className="flex justify-between text-green-600 dark:text-green-400">
                                    <span>Promo ({Math.round(promoDiscount * 100)}% off)</span>
                                    <span>−${discountAmt.toFixed(2)}</span>
                                </div>
                            )}
                            {bundleDiscount > 0 && (
                                <div className="flex justify-between text-green-600 dark:text-green-400">
                                    <span>Bundle (10% off)</span>
                                    <span>−${(total * bundleDiscount).toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        <div className="my-3 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-sky-800">
                            <span className="text-lg font-semibold text-sky-950 dark:text-white">Total</span>
                            <span className="text-2xl font-black text-orange-500">${finalTotal.toFixed(2)}</span>
                        </div>

                        <button className="w-full animate-pulse-glow rounded-xl bg-orange-500 py-4 text-center text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-orange-600">
                            Checkout →
                        </button>
                        <button onClick={clearCart} className="mt-3 w-full text-center text-sm text-gray-400 hover:text-red-400 dark:text-sky-500">
                            Clear cart
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
