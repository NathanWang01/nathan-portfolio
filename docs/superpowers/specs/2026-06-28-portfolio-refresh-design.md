# Portfolio Refresh — Design Spec
**Date:** 2026-06-28
**Status:** Approved

---

## Overview

A visual and interaction upgrade to Nathan Wang's existing Next.js portfolio. The core structure (Hero, About, Projects, Contact, Footer) stays the same. This refresh improves typography, adds skill icons, upgrades the projects section to a vertical snap-scroll, adds section subtitles, introduces geometric background elements, and polishes animations throughout.

---

## Changes by Area

### 1. Navbar

- Logo "Nathan Wang" on the left becomes a clickable link that scrolls to the top (hero section)
- Nav links updated to: **Home | About | Projects | Contact**
- Home scrolls to hero; others scroll to their respective sections
- Typography and sizing adjusted as part of the global type refresh — whatever looks right as a whole
- Frosted glass on scroll effect stays as-is

---

### 2. Typography & Font Sizing

Fonts stay as Inter (body) and Syne (headings) — the upgrade is sizing, weight, and spacing:

- **Section headings:** larger and bolder — `text-5xl` to `text-7xl` depending on section, more visual weight
- **Section subtitles:** `text-lg` to `text-xl`, muted color (`text-text-muted`), sitting just below the heading with comfortable spacing
- **Body/paragraph text:** bumped to `text-lg` or `text-xl` with generous line spacing
- **Skill chips/labels:** slightly larger with more padding
- **Overall:** more whitespace between elements, nothing cramped
- Adjust any element (including navbar) if the whole looks better for it — goal is a cohesive, professional feel

---

### 3. Skills & Tools — Updated Data + Icons

**Updated `lib/skills.ts`:**
```ts
Languages: ['Java', 'Python', 'SQL', 'JavaScript', 'HTML/CSS']
Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS']
Tools: ['VS Code', 'Git', 'GitHub']
```
(PyCharm and Eclipse removed)

**Icon display:**
- Each skill/tool shows its official icon (from `react-icons/si` — Simple Icons set) tinted coral (`text-accent`)
- Icon above, name below, consistent size
- Laid out in a responsive grid (not the previous chip/tag layout)
- Hover: icon brightens slightly, name stays coral

**Icon mapping** (Simple Icons):
- Java → `SiJava`, Python → `SiPython`, SQL → `SiMysql`, JavaScript → `SiJavascript`, HTML/CSS → `SiHtml5` + `SiCss3`
- React → `SiReact`, Next.js → `SiNextdotjs`, TypeScript → `SiTypescript`, Tailwind → `SiTailwindcss`
- VS Code → `SiVisualstudiocode`, Git → `SiGit`, GitHub → `SiGithub`

---

### 4. Section Subtitles

Each section heading gets a short subtitle beneath it. User will provide the text for each section during implementation. Styled as:
- Font: Inter, `text-lg` to `text-xl`
- Color: `text-text-muted`
- Positioned directly below the heading, above the section content
- Consistent spacing across all sections

Sections that get subtitles: Hero, About, Projects, Contact

---

### 5. Projects Section — Vertical Snap Scroll

Replaces the static 2-column card grid with a vertical snap-scroll experience:

- Cards stack vertically within the Projects section
- As the viewer scrolls down, each card snaps into view one at a time
- The next card always peeks from the bottom edge (~20% visible) hinting there's more
- Once all cards are viewed, scrolling continues naturally to the Contact section — no looping
- Works in both scroll directions (up and down)
- Cards are well-sized, visually rich: project title (large, Syne), description, tag chips, GitHub/demo links
- Styled to match the dark/coral theme — surface background, coral accents, clean hover states
- Implemented using Framer Motion `useScroll` + `useTransform` or CSS `scroll-snap` with Framer Motion entrance animations

---

### 6. Animations

**Staggered section reveal:**
- Triggers on both scroll down and scroll up (no `once: true`)
- Each section: heading animates first, then subtitle, then content — staggered with slight delays
- Fade + slight upward slide per element (`y: 30 → 0`, `opacity: 0 → 1`)
- Duration: ~0.5s per element, stagger: ~0.1–0.15s

**Project card snap:**
- Smooth snap animation as each card comes into view
- Next card peek animates in from below

**General:**
- All existing Framer Motion animations kept and upgraded where needed
- Nothing overdone — every animation has a purpose

---

### 7. Background — Geometric Elements

- Subtle geometric shapes (faint outlines: triangles, circles, partial grid dots) scattered across the page
- Very low opacity (5–10%) so they never compete with content
- Coral-tinted (`#FF6B47` at low opacity) to stay on-brand
- Very slow drift or rotation animation — the page feels alive but not distracting
- Shapes positioned in background (`z-0`), all content sits above (`z-10`)
- Consistent across all sections

---

## Files to Modify

| File | Change |
|---|---|
| `components/Navbar.tsx` | Add Home link, make logo scroll to top |
| `components/Hero.tsx` | Typography upgrade, add subtitle placeholder |
| `components/About.tsx` | Typography upgrade, icon grid, add subtitle |
| `components/Projects.tsx` | Replace card grid with vertical snap-scroll |
| `components/Contact.tsx` | Typography upgrade, add subtitle |
| `components/Footer.tsx` | Typography review |
| `lib/skills.ts` | Remove PyCharm/Eclipse, update Tools |
| `app/globals.css` | Any global typography or background base styles |
| `app/page.tsx` | Add background geometric layer |

---

## What Is NOT Changing

- Color tokens (background, surface, accent, text-primary, text-muted) — unchanged
- Fonts (Inter + Syne) — unchanged, just better sizing
- Overall page structure (Hero → About → Projects → Contact → Footer) — unchanged
- Formspree contact form functionality — unchanged
- Existing project data (My Website, Church Site, Coming Soon) — unchanged for now
