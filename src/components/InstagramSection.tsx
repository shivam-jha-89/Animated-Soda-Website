"use client";

const POSTS = [
    { emoji: "🍒", caption: "Morning ritual unlocked 🔐 #Fizzi #BlackCherry", likes: 4821, color: "bg-red-900" },
    { emoji: "🍉", caption: "Summer in a can 🌊 #WatermelonCrush", likes: 7243, color: "bg-green-700" },
    { emoji: "🍋", caption: "Gym fuel of champions ⚡ #LemonLime #Fizzi", likes: 3102, color: "bg-yellow-500" },
    { emoji: "🍓", caption: "Brunch just got better 🌸 #StrawberryLemonade", likes: 5890, color: "bg-pink-600" },
    { emoji: "🍇", caption: "Sophisticated sip ✨ #GrapeGoodness", likes: 2744, color: "bg-violet-700" },
    { emoji: "🥤", caption: "The whole squad 🎉 #FizziFamily #AllFlavors", likes: 12310, color: "bg-orange-500" },
];

export default function InstagramSection() {
    return (
        <section className="bg-white py-20 dark:bg-sky-950">
            <div className="mx-auto max-w-5xl px-4">
                <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-orange-500">
                    @drinkfizzi
                </p>
                <h2 className="mb-10 text-center text-5xl font-black uppercase text-sky-950 dark:text-white">
                    Fizzi on Instagram 📸
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {POSTS.map((post, i) => (
                        <div
                            key={i}
                            className={`group relative aspect-square overflow-hidden rounded-2xl ${post.color} cursor-pointer`}
                        >
                            <div className="flex h-full flex-col items-center justify-center">
                                <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                                    {post.emoji}
                                </span>
                            </div>
                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <p className="px-4 text-center text-xs font-semibold text-white">
                                    {post.caption}
                                </p>
                                <div className="flex items-center gap-1 text-white">
                                    <span>❤️</span>
                                    <span className="text-sm font-bold">{post.likes.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block rounded-full border-2 border-orange-500 px-8 py-3 font-bold uppercase tracking-wide text-orange-500 transition-all hover:bg-orange-500 hover:text-white dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400 dark:hover:text-sky-950"
                    >
                        Follow Us on Instagram
                    </a>
                </div>
            </div>
        </section>
    );
}
