"use client";

import React from "react";
import { FizziLogo } from "./FizziLogo";
import CircleText from "./CircleText";

export default function Footer() {
  return (
    <footer className="bg-[#FEE832] text-[#FE6334] dark:bg-sky-950 dark:text-orange-400">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 py-12 pt-20">
        <div className="absolute right-16 top-0 size-24 origin-center -translate-y-12 md:size-40 md:-translate-y-20">
          <CircleText />
        </div>

        <FizziLogo className="h-16 text-[#FE6334] dark:text-orange-400" />

        {/* Social links */}
        <div className="flex items-center gap-5">
          {[
            {
              label: "Instagram",
              href: "https://instagram.com",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              label: "Twitter",
              href: "https://twitter.com",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ),
            },
            {
              label: "TikTok",
              href: "https://tiktok.com",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" />
                </svg>
              ),
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-current transition-all duration-200 hover:bg-[#FE6334] hover:text-[#FEE832] dark:hover:bg-orange-400 dark:hover:text-sky-950"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Newsletter */}
        <div className="w-full max-w-md">
          <p className="mb-3 text-center text-sm font-bold uppercase tracking-widest">
            Stay refreshed — get news & offers
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 overflow-hidden rounded-xl border-2 border-[#FE6334] bg-white/30 backdrop-blur-sm dark:border-orange-400 dark:bg-sky-900/30"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-3 text-sm font-medium text-[#FE6334] placeholder-[#FE6334]/60 outline-none dark:text-orange-300 dark:placeholder-orange-400/50"
            />
            <button
              type="submit"
              className="bg-[#FE6334] px-5 py-3 text-sm font-bold uppercase text-[#FEE832] transition-colors hover:bg-[#e04420] dark:bg-orange-500 dark:text-sky-950 dark:hover:bg-orange-600"
            >
              Subscribe
            </button>
          </form>
        </div>

        <p className="text-center text-xs opacity-60">
          © {new Date().getFullYear()} Fizzi. All rights reserved. Made with 🥤
        </p>
      </div>
    </footer>
  );
}
