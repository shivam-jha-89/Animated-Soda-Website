"use client";

export function spawnConfetti(x: number, y: number) {
    const COLORS = [
        "#FF5C3A", "#FEE832", "#FDE047", "#72d672",
        "#60a5fa", "#f472b6", "#a78bfa", "#fb923c",
    ];
    const count = 60;

    for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        const size = 6 + Math.random() * 8;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const angle = Math.random() * Math.PI * 2;
        const velocity = 120 + Math.random() * 180;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 100;
        const rotation = Math.random() * 720 - 360;

        el.style.cssText = `
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      width: ${size}px;
      height: ${size}px;
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      background: ${color};
      left: ${x}px;
      top: ${y}px;
    `;
        document.body.appendChild(el);

        const startTime = performance.now();
        const duration = 900 + Math.random() * 600;

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const t = elapsed / duration;
            if (t >= 1) {
                el.remove();
                return;
            }
            const cx = x + vx * t;
            const cy = y + vy * t + 0.5 * 400 * t * t;
            el.style.left = `${cx}px`;
            el.style.top = `${cy}px`;
            el.style.opacity = `${1 - t}`;
            el.style.transform = `rotate(${rotation * t}deg) scale(${1 - t * 0.5})`;
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }
}
