---
name: gsap-scroll-storytelling
description: Use whenever building or editing a Botani Seed landing-page (Track A / apps/web) section that needs scroll-triggered animation — hero parallax, pinned-scroll reveals, staged timelines (About page team reveal, Service page step-through, Visi & Misi pinned section). Do not use for dashboard (Track B) UI transitions — that's Motion's job, see motion-dashboard-transitions.
---

# GSAP Scroll Storytelling

GSAP + ScrollTrigger owns the landing page's narrative scroll sequences per `Design.md §5`. It does not own micro-interactions (that's Anime.js) or dashboard state transitions (that's Motion).

## When to reach for this
- Hero section parallax/reveal on load or first scroll.
- Any section described in Figma as a "pinned" or "staged" reveal (Visi & Misi's three-column reveal, About page's scientific-advisory-board list animating in, Service page's 01/02/03 step reveal).
- Anything where the animation should be **tied to scroll position**, not a click/hover/state change.

## Setup
```bash
pnpm add gsap --filter web
```
```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

## Pattern: pinned staged reveal
```ts
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: 1,
      },
    })
      .from(".step-01", { opacity: 0, y: 40 })
      .from(".step-02", { opacity: 0, y: 40 })
      .from(".step-03", { opacity: 0, y: 40 });
  }, sectionRef);
  return () => ctx.revert();
}, []);
```

## Rules
1. **Always scope with `gsap.context()`** and revert on unmount — React StrictMode double-invokes effects and leaked ScrollTriggers double-fire.
2. **Combine with Lenis, don't fight it.** If Lenis is active on the page (it is, site-wide per `Design.md §5`), sync ScrollTrigger to Lenis's scroll event instead of the native scroll event, or ScrollTrigger's positions will be wrong:
   ```ts
   lenis.on("scroll", ScrollTrigger.update);
   gsap.ticker.add((time) => lenis.raf(time * 1000));
   gsap.ticker.lagSmoothing(0);
   ```
3. **Check Context7** (`context7` MCP server) for the current ScrollTrigger API before writing a pin/scrub sequence you're not 100% sure of — GSAP's plugin API has changed shape across major versions.
4. Don't use GSAP for anything a CSS transition or Motion variant could do more simply — reserve it for genuinely scroll-driven sequences.
