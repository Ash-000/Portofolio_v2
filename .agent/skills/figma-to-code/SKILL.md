---
name: figma-to-code
description: Use whenever implementing a new screen or component for Botani Seed (landing page or dashboard) that has a corresponding frame in the "Botani Seed Website" Figma workspace. Always use this before hand-guessing colors, spacing, or copy from a screenshot. Covers pulling design context, tokens, and doing the screenshot-diff QA loop.
---

# Figma to Code Workflow

Figma is the source of truth for this project (`Design.md` intro). Never eyeball a JPEG export and hand-type hex values — pull real data through the `figma` MCP server.

## Steps

1. **Find the frame.** Check `Design.md §7` (Route ↔ Screen Map) for the frame name matching the route you're building.
2. **Pull design context:** call the Figma MCP tool for design context (`get_design_context`) on that frame/node — this is the primary tool, prefer it over metadata-only calls.
3. **Extract tokens:** call `get_variable_defs` for the frame. Reconcile against `Design.md §3` — if values differ, update `Design.md §3`, don't silently use one-off values in the component.
4. **Check for an existing component mapping** before building from scratch: list published components / Code Connect map for the file. If this component already maps to something in `packages/ui`, reuse it instead of duplicating.
5. **Map to code** per `Design.md §2`'s resolved stack:
   - Dashboard frame → shadcn/ui primitive + Tailwind, placed in `packages/ui` if reusable, otherwise `apps/dashboard`.
   - Landing page frame → SCSS module (+ React Bits component if it's an animated marketing element).
6. **Apply animation** per `Design.md §5` (GSAP+Lenis on the landing page, Motion on the dashboard, Anime.js for isolated polish) — see the matching skill (`gsap-scroll-storytelling`, `motion-dashboard-transitions`, `lenis-smooth-scroll`).
7. **Screenshot-diff QA:** get a screenshot of the source Figma frame, then render the built page and screenshot it (browser MCP tool, or Antigravity's built-in browser subagent). Compare side by side before marking the row in `Design.md §4.3` as done.

## Rules
- If a frame doesn't exist for what you're building (e.g. most data-entry/input screens — per the source notes these were deliberately left to the coding agent, not hand-designed), don't invent a bespoke layout: follow the shared form pattern in `Design.md §4.2` (Preview + Save/Draft/Cancel) instead.
- Don't skip step 6 (visual QA) for anything user-facing — "looks right to me" without a diff is how landing-page/dashboard drift happens between the two tracks.
- If Figma access fails or the workspace/file can't be found, say so explicitly rather than fabricating plausible-looking values and proceeding.
