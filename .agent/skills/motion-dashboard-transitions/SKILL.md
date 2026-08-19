---
name: motion-dashboard-transitions
description: Use whenever building or editing a Botani Seed Dashboard (Track B / apps/dashboard) UI transition — modal/drawer open-close, tab switching (Overview/Activity/Manage/Program/Report/Settings pill bar), the Save/Save Draft/Cancel confirmation modals, sidebar collapse/expand, list reorder, page transitions. Do not use for the landing page's scroll-driven storytelling — that's GSAP's job, see gsap-scroll-storytelling.
---

# Motion Dashboard Transitions

Motion (Framer Motion successor) owns every stateful UI transition inside the Dashboard SPA, per `Design.md §5`.

## When to reach for this
- Any transition triggered by **state change**, not scroll position: opening/closing a modal, switching a tab, collapsing the sidebar, a row appearing/disappearing from a table after a filter.
- The three-button confirmation modals (Save/Save Draft/Cancel) — each needs a color-matched entrance (blue/green/red per `Design.md §3`) and should feel snappy, not scroll-tied.

## Setup
```bash
pnpm add motion --filter dashboard
```

## Pattern: confirmation modal entrance (color per action)
```tsx
import { motion, AnimatePresence } from "motion/react";

const colorByAction = { save: "border-blue-500", draft: "border-green-500", cancel: "border-red-500" };

<AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`rounded-lg border-2 ${colorByAction[action]}`}
    >
      {/* modal content */}
    </motion.div>
  )}
</AnimatePresence>
```

## Pattern: sidebar collapse (icon-rail ↔ full label)
Animate `width` and stagger label `opacity` — don't just toggle `display: none`, it looks broken:
```tsx
<motion.aside animate={{ width: collapsed ? 72 : 240 }} transition={{ duration: 0.2 }}>
  <motion.span animate={{ opacity: collapsed ? 0 : 1 }}>{label}</motion.span>
</motion.aside>
```

## Rules
1. Keep dashboard transitions **fast** (150–250ms) — this is a data-entry tool used all day, not a marketing showcase. Resist the urge to make things as expressive as the landing page.
2. Use `AnimatePresence` for anything that mounts/unmounts (modals, toasts, conditional table rows) or exit animations silently won't fire.
3. Check Context7 (`context7` MCP server) before using an API you're not sure is current — Motion's package name and import path (`motion/react` vs the older `framer-motion`) have changed.
4. RBAC-hidden nav items (per `PRD.md §3.1`) should be absent from the DOM, not animated to `opacity: 0` and left focusable — that's an accessibility/security leak, not a style choice.
