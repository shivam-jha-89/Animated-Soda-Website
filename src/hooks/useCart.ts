"use client";

import { create } from "zustand";
import { SodaCanProps } from "@/components/SodaCan";

export type CartItem = {
    flavor: SodaCanProps["flavor"];
    name: string;
    price: number;
    quantity: number;
};

const PROMO_CODES: Record<string, number> = {
    FIZZI10: 0.1,
    GUTSY20: 0.2,
    WELCOME: 0.15,
};

type CartStore = {
    items: CartItem[];
    isOpen: boolean;
    promoCode: string;
    promoDiscount: number; // 0–1
    promoError: string;
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (flavor: SodaCanProps["flavor"]) => void;
    updateQuantity: (flavor: SodaCanProps["flavor"], qty: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    applyPromo: (code: string) => void;
    clearPromo: () => void;
};

export const useCart = create<CartStore>((set) => ({
    items: [],
    isOpen: false,
    promoCode: "",
    promoDiscount: 0,
    promoError: "",
    addItem: (item) =>
        set((state) => {
            const existing = state.items.find((i) => i.flavor === item.flavor);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.flavor === item.flavor ? { ...i, quantity: i.quantity + 1 } : i,
                    ),
                    isOpen: true,
                };
            }
            return { items: [...state.items, { ...item, quantity: 1 }], isOpen: true };
        }),
    removeItem: (flavor) =>
        set((state) => ({
            items: state.items.filter((i) => i.flavor !== flavor),
        })),
    updateQuantity: (flavor, qty) =>
        set((state) => ({
            items:
                qty <= 0
                    ? state.items.filter((i) => i.flavor !== flavor)
                    : state.items.map((i) =>
                        i.flavor === flavor ? { ...i, quantity: qty } : i,
                    ),
        })),
    clearCart: () => set({ items: [], promoCode: "", promoDiscount: 0, promoError: "" }),
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    applyPromo: (code) => {
        const upper = code.toUpperCase().trim();
        const discount = PROMO_CODES[upper];
        if (discount) {
            set({ promoCode: upper, promoDiscount: discount, promoError: "" });
        } else {
            set({ promoError: "Invalid promo code", promoCode: "", promoDiscount: 0 });
        }
    },
    clearPromo: () => set({ promoCode: "", promoDiscount: 0, promoError: "" }),
}));
