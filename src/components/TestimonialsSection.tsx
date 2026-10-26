"use client";

const REVIEWS = [
    {
        name: "Sarah M.",
        avatar: "🧑‍🦰",
        rating: 5,
        flavor: "Black Cherry",
        text: "I've tried every soda on the market and Fizzi absolutely wrecks the competition. Black Cherry tastes like real fruit, not candy.",
    },
    {
        name: "Jake T.",
        avatar: "🧔",
        rating: 5,
        flavor: "Watermelon Crush",
        text: "My gym buddy got me hooked. Zero sugar, actual probiotics, and it tastes AMAZING. Watermelon Crush is my daily ritual now.",
    },
    {
        name: "Priya K.",
        avatar: "👩‍🦱",
        rating: 5,
        flavor: "Strawberry Lemonade",
        text: "Finally a soda that doesn't make me feel guilty. Strawberry Lemonade is so refreshing I've replaced my morning OJ with it!",
    },
    {
        name: "Carlos R.",
        avatar: "🧑",
        rating: 5,
        flavor: "Lemon Lime",
        text: "The Lemon Lime flavor brought me back to childhood — but WAY healthier. My whole office is obsessed with Fizzi now.",
    },
    {
        name: "Emily W.",
        avatar: "👩",
        rating: 5,
        flavor: "Grape Goodness",
        text: "I'm not normally a grape soda person but Grape Goodness changed everything. It's sophisticated, not cloyingly sweet. Love it.",
    },
    {
        name: "Raj D.",
        avatar: "👨‍💼",
        rating: 4,
        flavor: "Black Cherry",
        text: "Great taste and my gut feels noticeably better after a month of drinking Fizzi daily. Will be ordering in bulk from now on!",
    },
];

function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300"}>★</span>
            ))}
        </div>
    );
}

export default function TestimonialsSection() {
    return (
        <section
            id="reviews"
            className="overflow-hidden bg-yellow-50 py-20 dark:bg-sky-950"
        >
            <div className="mx-auto max-w-6xl px-4">
                <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-orange-500">
                    What people say
                </p>
                <h2 className="mb-12 text-center text-5xl font-black uppercase text-sky-950 dark:text-white">
                    They Love It 🥤
                </h2>

                {/* Marquee row 1 */}
                <div className="overflow-hidden">
                    <div className="flex animate-marquee gap-6 pb-6" style={{ width: "max-content" }}>
                        {[...REVIEWS, ...REVIEWS].map((r, idx) => (
                            <ReviewCard key={idx} review={r} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ReviewCard({
    review,
}: {
    review: (typeof REVIEWS)[0];
}) {
    return (
        <div className="w-72 flex-shrink-0 rounded-2xl border border-yellow-200 bg-white p-6 shadow-md dark:border-sky-800 dark:bg-sky-900">
            <div className="mb-3 flex items-center gap-3">
                <span className="text-3xl">{review.avatar}</span>
                <div>
                    <p className="font-bold text-sky-950 dark:text-white">{review.name}</p>
                    <p className="text-xs text-orange-500">{review.flavor}</p>
                </div>
            </div>
            <Stars count={review.rating} />
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-sky-300">
                &ldquo;{review.text}&rdquo;
            </p>
        </div>
    );
}
