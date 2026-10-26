"use client";

import { useState } from "react";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { name, email, message } = form;
        const subject = encodeURIComponent(`Fizzi Message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:hello@fizzi.com?subject=${subject}&body=${body}`;
        setSent(true);
        setTimeout(() => setSent(false), 5000);
    }

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-sky-950 px-4 py-20 text-white dark:bg-sky-900"
        >
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
                <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-orange-400">
                    Get in touch
                </p>
                <h2 className="mb-10 text-center text-5xl font-black uppercase leading-tight text-white lg:text-6xl">
                    Say Hello 👋
                </h2>

                {sent ? (
                    <div className="animate-fade-in rounded-2xl border border-orange-400/30 bg-orange-500/10 p-10 text-center">
                        <p className="text-3xl">🎉</p>
                        <p className="mt-3 text-xl font-bold text-orange-300">
                            Message sent! We&apos;ll get back to you soon.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div className="group">
                            <label className="mb-1.5 block text-sm font-medium text-sky-300">
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Your name"
                                className="w-full rounded-xl border border-sky-700 bg-sky-900/50 px-5 py-3.5 text-white placeholder-sky-600 outline-none transition-all duration-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 dark:bg-sky-800/50"
                            />
                        </div>

                        {/* Email */}
                        <div className="group">
                            <label className="mb-1.5 block text-sm font-medium text-sky-300">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="your@email.com"
                                className="w-full rounded-xl border border-sky-700 bg-sky-900/50 px-5 py-3.5 text-white placeholder-sky-600 outline-none transition-all duration-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 dark:bg-sky-800/50"
                            />
                        </div>

                        {/* Message */}
                        <div className="group">
                            <label className="mb-1.5 block text-sm font-medium text-sky-300">
                                Message
                            </label>
                            <textarea
                                required
                                rows={5}
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                placeholder="Tell us about your favorite Fizzi flavor..."
                                className="w-full resize-none rounded-xl border border-sky-700 bg-sky-900/50 px-5 py-3.5 text-white placeholder-sky-600 outline-none transition-all duration-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 dark:bg-sky-800/50"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-orange-500 py-4 text-lg font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-200 hover:animate-pulse-glow hover:bg-orange-600 hover:shadow-orange-500/30"
                        >
                            Send Message 🥤
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
