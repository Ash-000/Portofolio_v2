---
name: lenis-smooth-scroll
description: Use when setting up or debugging site-wide smooth scroll on the Botani Seed landing page (apps/web), or when GSAP ScrollTrigger positions seem wrong/laggy on a scroll-driven section. Lenis is the scroll-physics wrapper, not an animation library — pair with gsap-scroll-storytelling for actual animations.
---

# Lenis Smooth Scroll

Lenis wraps the whole page's scroll container once, site-wide, per `Design.md §5`. It is not used per-element and it does not animate anything by itself — it just makes native scroll feel smoother and gives GSAP/Motion a consistent scroll signal to hook into.

## Setup (once, at the app root of apps/web)
```bash
pnpm add lenis --filter web
```
```ts
import Lenis from "lenis";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

## Required: sync with GSAP ScrollTrigger
If you set up Lenis but skip this, every pinned/scrubbed GSAP section on the landing page (see `gsap-scroll-storytelling`) will desync or jitter:
```ts
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

## Rules
1. **One Lenis instance per app**, mounted at the root layout of `apps/web` only — the Dashboard (`apps/dashboard`) does not use Lenis; its scroll areas are ordinary contained panels (sidebar, table body), and smooth-scrolling those would feel wrong for a data-entry tool.
2. If a form or modal inside the landing page needs native scroll (e.g. a scrollable dropdown), stop Lenis propagation on that element rather than fighting it globally.
3. Check Context7 for the current Lenis API if it's been a while — the constructor options have changed across versions (e.g. `smoothTouch` was deprecated).
