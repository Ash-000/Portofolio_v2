# agent-checklist.md

> This checklist is mandatory.
>
> Before completing ANY frontend task, verify every item below.
>
> If any check fails, continue improving the implementation.
>
> Never stop after the page merely "works."

---

# Design Review

## First Impression

Within 3 seconds, ask yourself:

Can someone immediately tell:

- what this company does?
- what the product is?
- what action they should take?

If not:

Improve hierarchy.

---

## Visual Quality

Does this page feel comparable to:

✓ Apple

✓ Stripe

✓ Linear

✓ Vercel

✓ Integrated Bio

✓ Notion

If not:

Simplify.

Improve spacing.

Improve typography.

Reduce clutter.

---

## Layout

✓ Sections aligned

✓ Consistent gutters

✓ Consistent container width

✓ No awkward empty space

✓ No cramped sections

✓ No stretched paragraphs

✓ No random component widths

---

## Typography

Check:

✓ Heading hierarchy is obvious

✓ Maximum 3 font sizes visible together

✓ Line height comfortable

✓ Paragraph width under 65 characters

✓ No centered long paragraphs

✓ No inconsistent font weights

---

## Spacing

Every spacing value should come from the spacing system.

Check:

✓ Equal card padding

✓ Equal section spacing

✓ Equal button spacing

✓ Equal grid gaps

✓ Equal margins

Never eyeball spacing.

---

## Colors

Check:

✓ One accent color

✓ Background consistent

✓ Borders consistent

✓ Text contrast passes WCAG AA

✓ No random gradients

✓ No unnecessary colorful elements

---

## Components

Every component should answer:

Why does this exist?

If it has no purpose:

Delete it.

---

# Hero Section

Checklist

✓ Strong headline

✓ Short supporting text

✓ Primary CTA

✓ Secondary CTA (optional)

✓ One visual focus

✓ No clutter

✓ Fits without scrolling on desktop

---

# Cards

Every card should have:

✓ Equal height when appropriate

✓ Equal padding

✓ Equal radius

✓ Equal border

✓ Equal hover animation

✓ Clear hierarchy

If two cards look different without a reason:

Fix them.

---

# Buttons

Check

✓ Same height

✓ Same radius

✓ Same animation

✓ Same typography

✓ Hover feels smooth

✓ Focus visible

---

# Motion Review

Animation should feel expensive.

Check

✓ No bouncing

✓ No spinning

✓ No elastic effects

✓ No unnecessary movement

✓ Motion communicates hierarchy

✓ Motion lasts under 1.2s

✓ Stagger under 120ms

---

# Scroll Review

Scroll entire page.

Ask:

Does scrolling feel smooth?

Does every section appear naturally?

Does anything feel abrupt?

Does any animation repeat unnecessarily?

If yes:

Improve it.

---

# Hover Review

Hover every interactive element.

Check

✓ Same easing

✓ Same duration

✓ Same lift amount

✓ Cursor changes correctly

✓ No flickering

---

# Mobile Review

Test

375px

390px

430px

768px

Check

✓ No overflow

✓ No clipped text

✓ Comfortable spacing

✓ Buttons easy to tap

✓ Images resize correctly

✓ Navigation usable

---

# Responsive Review

Resize continuously.

Watch for:

Broken grids

Large empty gaps

Tiny text

Huge text

Overflow

Misaligned cards

Broken hero

Fix everything.

---

# Accessibility Review

Check

✓ Keyboard navigation

✓ Tab order

✓ Focus rings

✓ aria-labels

✓ Alt text

✓ Semantic HTML

✓ Contrast

✓ prefers-reduced-motion

---

# Performance Review

Verify

✓ Lighthouse >95

✓ No layout shift

✓ Lazy loaded images

✓ Font optimization

✓ Minimal bundle size

✓ No duplicate libraries

---

# Code Review

Check

✓ No duplicated components

✓ No duplicated animations

✓ No duplicated Tailwind classes

✓ Reusable hooks

✓ Reusable utilities

✓ Reusable variants

✓ Proper folder structure

---

# Animation Review

Hero

✓ Headline enters first

✓ Subtitle follows

✓ CTA follows

✓ Image follows

✓ Background moves slowly

Sections

✓ Fade Up

✓ Small translateY

✓ Opacity only

Cards

✓ Lift

✓ Scale 1.02 max

Never

✗ Rotate

✗ Bounce

✗ Shake

✗ Flash

---

# AI Smell Detection

Look for signs this page was AI-generated.

Examples:

✗ Too many gradients

✗ Too many shadows

✗ Too many floating cards

✗ Every section looks identical

✗ Random icon colors

✗ Random border radius

✗ Overuse of glassmorphism

✗ Giant padding everywhere

✗ Huge empty hero

✗ Every animation identical

If any are found:

Remove them.

---

# Content Review

Read the page aloud.

Ask:

Does this sound like a real company?

Or

Does it sound like AI marketing?

If AI marketing:

Rewrite.

Avoid words like:

Revolutionary

Cutting-edge

Game-changing

Best-in-class

Next-generation

World-class

Prefer:

Clear

Specific

Honest

Technical

---

# Final Polish

Zoom out to 50%.

Look only at spacing.

Nothing else.

If anything feels "off,"

Fix spacing first.

Never typography first.

Never color first.

---

# Senior Designer Test

Pretend this PR is reviewed by:

- Apple Design Team
- Linear Design Team
- Vercel Design Team

Would they approve it?

If not:

Continue refining.

---

# Ship Criteria

A task is COMPLETE only if:

✓ Visual quality is premium

✓ Code is maintainable

✓ Performance is excellent

✓ Responsive on all devices

✓ Accessible

✓ Motion is polished

✓ Components reusable

✓ Design system respected

✓ No AI-generated smell

Only then may the task be marked as finished.

---

# Golden Rule

Working software is NOT finished software.

Beautiful software is NOT enough.

Maintainable software is NOT enough.

A feature is complete only when it is:

Beautiful

Fast

Accessible

Consistent

Maintainable

Responsive

Delightful

All seven are required.