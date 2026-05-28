# Nathan Wang — Frontend Developer Portfolio Design Spec
**Date:** 2026-05-27  
**Status:** Approved

---

## Overview

A personal branding portfolio website for Nathan Wang, a frontend developer based in the US. The goal is to establish a strong online presence, showcase projects, and make a memorable first impression with a distinctive dark + coral aesthetic and expressive animations.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js (App Router) | Performance, image optimization, Vercel deployment |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Animation | Framer Motion | React-native, scroll-triggered animations |
| Form | Formspree | No backend needed for contact form |
| Deployment | Vercel | Free tier, pairs perfectly with Next.js |

---

## Visual Design

### Color Tokens
- **Background:** `#0d0d0d` (near black)
- **Surface:** `#1a1a1a` (card backgrounds)
- **Accent:** `#FF6B47` (coral/orange)
- **Text Primary:** `#f5f5f5`
- **Text Muted:** `#888888`

### Typography
- **Headings:** Syne — bold, modern, editorial
- **Body:** Inter — clean, readable

### Theme
Dark background with coral accent pops. Expressive but not overwhelming — scroll-triggered animations, staggered reveals, hover effects. Reference aesthetic: [tajmirul.site](https://www.tajmirul.site/)

---

## Project Structure

```
C:\Users\natha\Projects\nathan-portfolio\
├── app/
│   ├── page.tsx          ← single page, all sections
│   ├── layout.tsx        ← global fonts, metadata, navbar
│   └── globals.css       ← Tailwind base + CSS custom properties
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── public/
    └── avatar.jpg        ← developer avatar image
```

---

## Sections

### 1. Navbar
- Fixed at top of viewport
- Logo: "Nathan Wang" (left)
- Nav links: About, Projects, Contact (right) — anchor scroll to sections
- On scroll: transparent → frosted glass dark blur effect
- Mobile: hamburger menu

### 2. Hero
- Full viewport height (`100vh`)
- Avatar image (right or centered on mobile)
- Content (left):
  - Small label: `"Hi, I'm"`
  - Large heading: `"Nathan Wang"` — oversized, coral accent on name
  - Typed animation subtitle cycling: `"Frontend Developer"` → `"React Enthusiast"` → `"UI/UX Lover"`
  - Bio: *"I build interactive, responsive web experiences with React — bringing designs to life through clean code and smooth animations."*
  - CTA buttons: `"View My Work"` (scrolls to Projects) + `"Contact Me"` (scrolls to Contact)
  - Social icons: GitHub (`https://github.com/NathanWang01`), LinkedIn (`https://www.linkedin.com/in/nathan-wang-238862243/`)
- Avatar: `https://img.freepik.com/premium-photo/web-developer-digital-avatar-generative-ai_934475-9048.jpg`
- **Animations:** Staggered entrance on load (name → subtitle → bio → buttons), typed text cycling

### 3. About / Skills
- Two-column layout on desktop, stacked on mobile
- **Left — About blurb:**
  > *"I'm Nathan Wang, a developer from the US with a love for clean UI and expressive code. Whether it's a smooth animation or a responsive layout, I care deeply about the details that make a web experience feel right. I build with React, Next.js, and modern web technologies."*
- **Right — Skills grid** (tech logos + labels, organized by category):
  - Languages: Java, Python, SQL, JavaScript, HTML/CSS
  - Frontend: React, Next.js, TypeScript, Tailwind CSS
  - Tools: PyCharm, Eclipse, VS Code, Git, GitHub
- **Animations:** Section header slides up on scroll; skill logos stagger fade-in on scroll entry

### 4. Projects
- 2-column card grid on desktop, 1-column on mobile
- Each card contains:
  - Project thumbnail/screenshot
  - Project name
  - Short description (1-2 sentences)
  - Tech stack tags
  - Two buttons: `"Live Demo"` + `"GitHub"`
- **Initial content:** Placeholder cards for `my-website` and `church.site` (existing GitHub repos) + one "Coming Soon" card
- **Future:** Cards replaced with real built projects (planned for a separate session)
- **Animations:** Cards stagger fade-in on scroll; subtle hover lift + shadow effect

### 5. Contact
- Centered layout
- Heading: `"Let's Work Together"`
- Subtext: `"Have a project in mind or just want to say hi? I'd love to hear from you."`
- Form fields: Name, Email, Message, Send button (coral accent)
- Form backend: Formspree (free, no server needed)
- Below form: email `nathanwang555@gmail.com` + GitHub + LinkedIn icons
- **Animations:** Form slides up on scroll; Send button coral glow on hover

### 6. Footer
- Centered: `"Designed & Built by Nathan Wang"`
- Copyright: `© 2026`
- Social icons: GitHub, LinkedIn
- Top border in coral accent

---

## Animation Strategy

| Element | Animation | Trigger |
|---|---|---|
| Hero text | Staggered slide-up + fade | Page load |
| Typed subtitle | Typing effect, cycling | Page load |
| Section headers | Slide up + fade | Scroll entry |
| Skill logos | Stagger fade-in | Scroll entry |
| Project cards | Stagger fade-in | Scroll entry |
| Card hover | Lift + shadow | Hover |
| Contact form | Slide up | Scroll entry |
| Send button | Coral glow | Hover |
| Navbar | Transparent → frosted glass | Scroll |

---

## Responsiveness

- Mobile-first Tailwind breakpoints (`sm`, `md`, `lg`)
- Navbar collapses to hamburger on mobile
- Hero switches to single column on mobile
- About section stacks vertically on mobile
- Projects grid drops to 1 column on mobile

---

## Content Notes

- **Projects section** will be fully built out in a separate session where real projects are created and added
- Avatar image sourced from Freepik (placeholder — may be replaced with personal photo later)
- Location set to "US" — can be made more specific later
