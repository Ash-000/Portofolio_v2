# frontend-rules.md

> These rules are mandatory.
> Never invent design decisions.
> Follow this file before generating any component.

---

# Design Philosophy

Every page should feel:

- Premium
- Scientific
- Calm
- Minimal
- Modern
- High-end SaaS

Avoid anything that looks:

- Template-like
- Bootstrap
- AI-generated
- Corporate
- Cartoonish
- Colorful
- Over-designed

Think:

Linear
Vercel
Integrated Bio
Apple
Stripe
Raycast

---

# Design Priority

Priority order:

1. Spacing
2. Typography
3. Layout
4. Animation
5. Color
6. Decoration

Spacing is more important than gradients.

---

# Layout Rules

Maximum width

1280px

Content width

720px

Never stretch text across the screen.

Every section needs breathing room.

Desktop

140px vertical spacing

Tablet

100px

Mobile

72px

Never place two large sections closer than 120px.

---

# Grid

Desktop

12 columns

Tablet

6 columns

Mobile

1 column

Never hardcode widths.

Always use responsive containers.

---

# Typography

Headings

Manrope

Weight

800

Tracking

-0.04em

Body

Inter

Weight

400-500

Maximum paragraph width

65 characters

Never center long paragraphs.

Use left alignment.

---

# Heading Scale

Hero

72px

Section title

48px

Card title

24px

Subtitle

20px

Body

16px

Caption

14px

Label

12px

Use clamp() whenever possible.

Example

Hero:

clamp(3rem,6vw,5rem)

---

# Colors

Background

#050505

Surface

#0E0E0E

Card

#121212

Border

rgba(255,255,255,.08)

Primary text

#F5F5F5

Secondary text

#A5A5A5

Muted

#777777

Accent

#74C0FC

Never introduce additional colors.

---

# Shadows

Avoid obvious shadows.

Preferred:

0 0 40px rgba(255,255,255,.03)

Never use

shadow-xl

shadow-2xl

Huge glows

---

# Radius

Cards

24px

Buttons

16px

Inputs

18px

Images

24px

Never mix radius values.

---

# Borders

Use

1px rgba(255,255,255,.08)

No thick borders.

---

# Buttons

Height

52px

Padding

24px horizontal

Primary

White background

Black text

Secondary

Transparent

White border

Hover

Scale

1.03

Duration

250ms

Never animate background colors aggressively.

---

# Cards

Glass

rgba(255,255,255,.03)

Blur

20px

Padding

32px

Gap

24px

Hover

translateY(-8px)

Never rotate cards.

Never bounce.

---

# Images

Large.

Minimal.

Rounded.

High contrast.

Never use tiny illustrations.

---

# Icons

Lucide

Stroke

1.75

24px

Never use emoji.

Never mix icon libraries.

---

# Motion Philosophy

Motion should communicate.

Never distract.

Everything should feel expensive.

---

# Animation Timing

Fast

200ms

Normal

400ms

Slow

700ms

Hero

1200ms

Never exceed 1400ms.

---

# Easing

easeOut

or

cubic-bezier(.22,1,.36,1)

Never use bounce.

---

# Page Load

Navbar

↓

Fade

Hero

↓

Blur

↓

Fade

↓

Slide Up

↓

Buttons

↓

Hero image

↓

Background animation

---

# Scroll Animations

Every section:

opacity

0→1

y

40→0

duration

0.8s

delay

stagger

0.08s

Never animate from more than 60px.

---

# Hover Animations

Cards

translateY(-8px)

Buttons

scale(1.03)

Images

scale(1.02)

Icons

rotate 3°

Never use:

bounce

flip

spin

elastic

---

# Scroll Behavior

Use Lenis.

No native scrolling.

No scroll jacking.

No snap scrolling unless explicitly required.

---

# GSAP Usage

Only use GSAP for:

Pinned sections

Horizontal scroll

SVG path drawing

Mask reveals

Complex timelines

Everything else uses Framer Motion.

---

# Component Rules

Every component must have:

Loading state

Empty state

Responsive layout

Accessible labels

Keyboard navigation

ARIA attributes

Reduced motion support

---

# Accessibility

Minimum contrast

WCAG AA

Visible focus rings

Keyboard accessible

Respect prefers-reduced-motion

---

# Responsive Rules

Desktop First

1440

↓

1280

↓

1024

↓

768

↓

480

↓

375

Never let cards overflow.

Never reduce padding below 16px.

---

# Section Structure

Every section follows:

Eyebrow

↓

Heading

↓

Description

↓

Content

↓

CTA (optional)

Never skip spacing between these elements.

---

# Whitespace Rules

Whitespace is content.

Increase spacing before adding decoration.

If a section feels crowded:

Increase padding.

Never shrink text first.

---

# Component Naming

Good

HeroSection

TechnologyGrid

ResearchTimeline

MetricsSection

FAQSection

Bad

Section1

Card2

ContainerNew

HeroFinal

---

# File Structure

/components

/ui

/layout

/sections

/animations

/hooks

/lib

/styles

Never place section components inside ui.

---

# Tailwind Rules

Prefer utilities.

Avoid inline styles.

Avoid arbitrary values unless necessary.

Extract repeated styles into reusable components.

---

# Code Quality

No duplicated JSX.

No duplicated animations.

No magic numbers.

Reuse spacing tokens.

Reuse animation variants.

---

# Animation Variants

Always import shared variants.

Never redefine fadeUp 20 times.

Example:

animations/

fade.ts

stagger.ts

scale.ts

hero.ts

---

# Performance

Lighthouse

95+

CLS

<0.05

LCP

<2.5s

60fps animation

No layout shift.

Lazy load images.

Optimize fonts.

---

# AI Guardrails

Before creating a component, ask:

Does this increase clarity?

Does this increase trust?

Does this improve hierarchy?

Would Apple ship this?

Would Linear ship this?

If the answer is "no", simplify it.

---

# Final Rule

When in doubt:

Remove elements instead of adding them.

Premium design comes from restraint, not decoration.