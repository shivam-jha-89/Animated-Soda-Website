"use client";

/**
 * Fizzi Analytics — lightweight event tracker.
 * Logs events to console in dev; swap `track` body for a real analytics
 * service (Plausible, Mixpanel, PostHog, GA4 etc.) in production.
 */
export type FizziEvent =
    | { name: "page_view"; path: string }
    | { name: "add_to_cart"; flavor: string; price: number }
    | { name: "promo_applied"; code: string; discount: number }
    | { name: "contact_form_submitted" }
    | { name: "newsletter_subscribed"; email: string }
    | { name: "quiz_completed"; result: string }
    | { name: "scroll_depth"; depth: 25 | 50 | 75 | 100 };

export function track(event: FizziEvent) {
    if (process.env.NODE_ENV === "development") {
        console.info("[Fizzi Analytics]", event.name, event);
    }
    // 🔌 Production: replace with your analytics SDK
    // plausible(event.name, { props: event });
    // mixpanel.track(event.name, event);
    // window.gtag?.("event", event.name, event);
}

// Scroll depth tracker — call once on mount
export function initScrollDepthTracking() {
    if (typeof window === "undefined") return;
    const fired = new Set<number>();

    function onScroll() {
        const docEl = document.documentElement;
        const pct = (docEl.scrollTop / (docEl.scrollHeight - docEl.clientHeight)) * 100;
        ([25, 50, 75, 100] as const).forEach((depth) => {
            if (pct >= depth && !fired.has(depth)) {
                fired.add(depth);
                track({ name: "scroll_depth", depth });
            }
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
}
