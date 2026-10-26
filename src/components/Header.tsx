"use client";

import React, { useState } from "react";
import { FizziLogo } from "@/components/FizziLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { useCart } from "@/hooks/useCart";
import clsx from "clsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, openCart } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const navLinks = [
    { label: "Flavors", href: "#flavors" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="relative z-[100] flex items-center justify-between px-6 py-4">
      <FizziLogo className="h-14 cursor-pointer text-sky-800 dark:text-yellow-300" />

      {/* Desktop nav */}
      <nav className="hidden items-center gap-6 md:flex">
        {navLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-sm font-bold uppercase tracking-wide text-sky-800 transition-colors hover:text-orange-500 dark:text-yellow-200 dark:hover:text-orange-400"
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {/* Cart button */}
        <button
          onClick={openCart}
          aria-label="Open cart"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-sky-800 bg-white/20 text-sky-800 backdrop-blur-sm transition-all duration-300 hover:bg-sky-800 hover:text-white dark:border-yellow-300 dark:text-yellow-300 dark:hover:bg-yellow-300 dark:hover:text-sky-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11" />
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
              {totalItems}
            </span>
          )}
        </button>

        {/* Hamburger (mobile) */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-sky-800 bg-white/20 text-sky-800 backdrop-blur-sm md:hidden dark:border-yellow-300 dark:text-yellow-300"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={clsx(
          "absolute left-0 top-full w-full overflow-hidden bg-yellow-100/90 backdrop-blur-md transition-all duration-300 dark:bg-sky-950/90 md:hidden",
          menuOpen ? "max-h-60 border-b border-sky-200" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-base font-bold uppercase tracking-wide text-sky-800 transition-colors hover:text-orange-500 dark:text-yellow-200"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
