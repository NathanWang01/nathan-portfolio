# Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Nathan Wang's existing portfolio with improved typography, coral-tinted skill icons, coral uppercase section labels + body text, a vertical snap-scroll projects section, staggered bidirectional animations, and geometric background elements.

**Architecture:** Modify existing components in-place following established patterns. Add two new files: `lib/skillIcons.ts` (icon mapping) and `components/GeometricBackground.tsx` (animated background). All animations use Framer Motion. No new pages or routes.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, react-icons (already installed)

## Global Constraints

- Project root: `C:\Users\natha\Projects\nathan-portfolio\`
- Tailwind v4: use `@theme {}` in `globals.css` — no `tailwind.config.ts`
- Colors: background `#0d0d0d`, surface `#1a1a1a`, accent `#FF6B47`, text-primary `#f5f5f5`, text-muted `#888888`
- Fonts: Inter (`font-sans`) for body, Syne (`font-heading`) for headings
- All components with hooks or event handlers must have `'use client'` directive
- Section labels: uppercase, letter-spaced, coral (`text-accent`), small (`text-sm`), Syne font
- Body text: `text-lg` minimum, `leading-relaxed`, `text-text-muted`
- Section headings: `text-5xl md:text-6xl` minimum, Syne bold
- useInView: `once: false` everywhere (animates on scroll up AND down)
- react-icons Simple Icons prefix: `Si` (e.g. `SiReact`, `SiGit`)
- Read `node_modules/next/dist/docs/` before writing any Next.js code

---

### Task 1: Update Skills Data & Create Icon Mapping

**Files:**
- Modify: `lib/skills.ts`
- Create: `lib/skillIcons.ts`

**Interfaces:**
- Produces:
  ```ts
  // lib/skills.ts
  export const skills: Record<string, string[]>
  // categories: 'Languages' | 'Frontend' | 'Tools'

  // lib/skillIcons.ts
  export const skillIcons: Record<string, IconType>
  // IconType from 'react-icons'
  ```

- [ ] **Step 1: Update `lib/skills.ts`**

Replace the entire file with:
```ts
export const skills: Record<string, string[]> = {
  Languages: ['Java', 'Python', 'SQL', 'JavaScript', 'HTML/CSS'],
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  Tools: ['VS Code', 'Git', 'GitHub'],
}
```

- [ ] **Step 2: Create `lib/skillIcons.ts`**

```ts
import { IconType } from 'react-icons'
import { SiJava, SiPython, SiMysql, SiJavascript, SiHtml5, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVisualstudiocode, SiGit, SiGithub } from 'react-icons/si'

export const skillIcons: Record<string, IconType> = {
  'Java': SiJava,
  'Python': SiPython,
  'SQL': SiMysql,
  'JavaScript': SiJavascript,
  'HTML/CSS': SiHtml5,
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'VS Code': SiVisualstudiocode,
  'Git': SiGit,
  'GitHub': SiGithub,
}
```

- [ ] **Step 3: Verify no TypeScript errors**

```powershell
cd "C:\Users\natha\Projects\nathan-portfolio"
npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 4: Commit**

```powershell
git add lib/skills.ts lib/skillIcons.ts
git commit -m "feat: update skills data and add icon mapping"
```

---

### Task 2: Navbar — Home Link + Logo Scroll

**Files:**
- Modify: `components/Navbar.tsx`

**Interfaces:**
- Consumes: nothing new
- Produces: navbar with Home | About | Projects | Contact links; logo scrolls to top

- [ ] **Step 1: Update `components/Navbar.tsx`**

Replace the entire file with:
```tsx
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-colors duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <button
          onClick={handleLogoClick}
          className="font-heading font-bold text-xl text-text-primary hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          Nathan <span className="text-accent">Wang</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-text-muted hover:text-accent transition-colors duration-200 font-medium text-base"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`w-6 h-0.5 bg-text-primary block transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-text-primary block transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-text-primary block transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-md mt-4 rounded-xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-6 py-4 text-text-muted hover:text-accent hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
```

- [ ] **Step 2: Verify dev server shows updated navbar**

```powershell
npm run dev
```
Open http://localhost:3000 — confirm "Home | About | Projects | Contact" links appear, logo click scrolls to top. Stop server.

- [ ] **Step 3: Run tests**

```powershell
npm test
```
Expected: all existing tests pass (Navbar test may need minor update if it checks navLinks count — update it to expect 4 links instead of 3).

- [ ] **Step 4: Commit**

```powershell
git add components/Navbar.tsx
git commit -m "feat: add Home nav link and logo scroll-to-top"
```

---

### Task 3: GeometricBackground Component

**Files:**
- Create: `components/GeometricBackground.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `<GeometricBackground />` — fixed behind all content, coral geometric shapes drifting slowly

- [ ] **Step 1: Create `components/GeometricBackground.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'

const shapes = [
  { type: 'circle', size: 300, x: '10%', y: '15%', duration: 20, delay: 0 },
  { type: 'triangle', size: 120, x: '80%', y: '10%', duration: 25, delay: 3 },
  { type: 'circle', size: 180, x: '70%', y: '50%', duration: 18, delay: 5 },
  { type: 'triangle', size: 90, x: '15%', y: '60%', duration: 22, delay: 8 },
  { type: 'circle', size: 240, x: '50%', y: '80%', duration: 28, delay: 2 },
  { type: 'triangle', size: 150, x: '85%', y: '75%', duration: 16, delay: 6 },
]

function Triangle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon
        points="50,5 95,95 5,95"
        stroke="#FF6B47"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

function Circle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#FF6B47"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

export default function GeometricBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.06]"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -20, 0, 20, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' ? (
            <Circle size={shape.size} />
          ) : (
            <Triangle size={shape.size} />
          )}
        </motion.div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Update `app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import GeometricBackground from '@/components/GeometricBackground'

export default function Home() {
  return (
    <main className="bg-background text-text-primary min-h-screen relative">
      <GeometricBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify in dev server**

```powershell
npm run dev
```
Open http://localhost:3000 — confirm faint coral circles and triangles are visible in the background, drifting slowly. Content sits on top and is fully readable. Stop server.

- [ ] **Step 4: Commit**

```powershell
git add components/GeometricBackground.tsx app/page.tsx
git commit -m "feat: add geometric background with coral drifting shapes"
```

---

### Task 4: Hero Section — Typography + Label + Body Text

**Files:**
- Modify: `components/Hero.tsx`

**Interfaces:**
- Consumes: nothing new
- Produces: Hero with coral uppercase label, upgraded typography, body text

**Content to implement verbatim:**
- Label: `FRONTEND DEVELOPER`
- Body: `I build interfaces with React, Next.js, and Tailwind — focused on the kind of polish you only notice when it's missing. Clean layouts, careful typography, and details that make a site feel finished instead of functional.`

- [ ] **Step 1: Update `components/Hero.tsx`**

Replace the entire file with:
```tsx
'use client'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Image from 'next/image'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.p variants={itemVariants} className="font-heading text-accent font-semibold tracking-widest uppercase text-sm">
            Frontend Developer
          </motion.p>

          <motion.h1 variants={itemVariants} className="font-heading text-6xl md:text-8xl font-bold text-text-primary leading-tight">
            Nathan <span className="text-accent">Wang</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="text-2xl md:text-4xl font-heading text-text-muted h-12">
            <TypeAnimation
              sequence={['React Developer', 2000, 'Next.js Builder', 2000, 'UI/UX Lover', 2000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p variants={itemVariants} className="text-text-muted text-lg md:text-xl leading-relaxed max-w-lg">
            I build interfaces with React, Next.js, and Tailwind — focused on the kind of polish you only notice when it&apos;s missing. Clean layouts, careful typography, and details that make a site feel finished instead of functional.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
            <button
              onClick={() => scrollTo('#projects')}
              className="bg-accent text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-accent/90 transition-colors duration-200"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="border border-accent text-accent px-8 py-4 rounded-full font-medium text-lg hover:bg-accent/10 transition-colors duration-200"
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-5">
            <a
              href="https://github.com/NathanWang01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <FiGithub size={26} />
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-wang-238862243/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <FiLinkedin size={26} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl animate-pulse z-0" />
            <Image
              src="/avatar.jpg"
              alt="Nathan Wang — Frontend Developer"
              fill
              sizes="(max-width: 768px) 288px, 384px"
              className="rounded-full object-cover z-10 border-2 border-accent/30"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run tests**

```powershell
npm test
```
Expected: all tests pass

- [ ] **Step 3: Commit**

```powershell
git add components/Hero.tsx
git commit -m "feat: upgrade Hero typography, label, and body text"
```

---

### Task 5: About Section — Label, Body Text, Icon Grid, Typography

**Files:**
- Modify: `components/About.tsx`

**Interfaces:**
- Consumes: `skills` from `@/lib/skills`, `skillIcons` from `@/lib/skillIcons`
- Produces: About section with coral label, body text, icon grid (coral-tinted), bidirectional animations

**Content to implement verbatim:**
- Label: `ABOUT ME`
- Body: `I love cooking. There's something satisfying about taking raw ingredients, putting in the care, and ending up with a plate someone genuinely enjoys — and honestly, that's most of why I love building websites too. The craft is the same: thoughtful choices, clean presentation, and a result that feels good to use. I work mostly in React, Next.js, and Tailwind, and when I'm not in front of a screen, I'm either in the kitchen or deep in a game I told myself I'd only play for an hour.`

- [ ] **Step 1: Update `components/About.tsx`**

Replace the entire file with:
```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/lib/skills'
import { skillIcons } from '@/lib/skillIcons'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <section id="about" aria-label="About" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-6 mb-20"
        >
          <motion.p variants={itemVariants} className="font-heading text-accent font-semibold tracking-widest uppercase text-sm">
            About Me
          </motion.p>
          <motion.h2 variants={itemVariants} className="font-heading text-5xl md:text-6xl font-bold text-text-primary">
            Who I <span className="text-accent">Am</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-text-muted text-lg md:text-xl leading-relaxed max-w-3xl">
            I love cooking. There&apos;s something satisfying about taking raw ingredients, putting in the care, and ending up with a plate someone genuinely enjoys — and honestly, that&apos;s most of why I love building websites too. The craft is the same: thoughtful choices, clean presentation, and a result that feels good to use. I work mostly in React, Next.js, and Tailwind, and when I&apos;m not in front of a screen, I&apos;m either in the kitchen or deep in a game I told myself I&apos;d only play for an hour.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {Object.entries(skills).map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 + catIndex * 0.1 }}
            >
              <h3 className="font-heading text-text-muted uppercase text-xs tracking-widest font-semibold mb-6">
                {category}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {items.map((skill, i) => {
                  const Icon = skillIcons[skill]
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: 0.4 + catIndex * 0.1 + i * 0.05 }}
                      className="flex flex-col items-center gap-2 group cursor-default"
                    >
                      {Icon && (
                        <Icon
                          size={36}
                          className="text-accent group-hover:opacity-80 transition-opacity duration-200"
                        />
                      )}
                      <span className="text-text-muted text-xs text-center font-medium group-hover:text-text-primary transition-colors duration-200">
                        {skill}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run tests**

```powershell
npm test
```
Expected: all tests pass

- [ ] **Step 3: Commit**

```powershell
git add components/About.tsx
git commit -m "feat: upgrade About with icon grid, label, body text, and bidirectional animation"
```

---

### Task 6: Projects Section — Vertical Snap Scroll

**Files:**
- Modify: `components/Projects.tsx`

**Interfaces:**
- Consumes: `projects` from `@/lib/projects`
- Produces: vertical snap-scroll section where each project card snaps into view one at a time, next card peeks from below

**Content to implement verbatim:**
- Label: `MY PROJECTS`
- Body: `Each project here started as a problem I wanted to solve or an idea I wanted to try. They're small on purpose — I'd rather ship something focused and polished than something sprawling and half-done. Tap through to see the live version, the code, and a quick breakdown of what I learned along the way.`

- [ ] **Step 1: Update `components/Projects.tsx`**

Replace the entire file with:
```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '@/lib/projects'

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`min-h-[70vh] flex items-center py-16 ${index % 2 === 0 ? '' : 'justify-end'}`}
    >
      <div className={`w-full md:w-4/5 bg-surface border border-white/10 rounded-3xl p-10 flex flex-col gap-6
        hover:border-accent/30 transition-all duration-300 ${project.comingSoon ? 'opacity-50' : ''}`}>

        <div className="h-52 rounded-2xl bg-white/5 flex items-center justify-center">
          {project.comingSoon ? (
            <span className="text-text-muted font-heading text-2xl">Coming Soon</span>
          ) : (
            <span className="text-text-muted text-sm" aria-hidden="true">Preview</span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">{project.title}</h3>
          <p className="text-text-muted text-lg leading-relaxed">{project.description}</p>
        </div>

        {project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
            {project.tags.map((tag) => (
              <li key={tag}>
                <span className="text-sm bg-accent/10 text-accent px-3 py-1.5 rounded-lg font-medium block">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}

        {!project.comingSoon && (
          <div className="flex gap-6 mt-auto pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                <FiGithub size={18} /> GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              >
                <FiExternalLink size={18} /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: false, margin: '-100px' })

  return (
    <section id="projects" aria-label="Projects" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={headerRef}
          className="flex flex-col gap-6 mb-8"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-accent font-semibold tracking-widest uppercase text-sm"
          >
            My Projects
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-5xl md:text-6xl font-bold text-text-primary"
          >
            Things I&apos;ve <span className="text-accent">Built</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-muted text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            Each project here started as a problem I wanted to solve or an idea I wanted to try. They&apos;re small on purpose — I&apos;d rather ship something focused and polished than something sprawling and half-done. Tap through to see the live version, the code, and a quick breakdown of what I learned along the way.
          </motion.p>
        </motion.div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run tests**

```powershell
npm test
```
Expected: all tests pass

- [ ] **Step 3: Commit**

```powershell
git add components/Projects.tsx
git commit -m "feat: replace card grid with vertical snap-scroll project cards"
```

---

### Task 7: Contact Section — Label, Body Text, Typography Upgrade

**Files:**
- Modify: `components/Contact.tsx`

**Interfaces:**
- Consumes: nothing new
- Produces: Contact section with coral label, body text, upgraded typography, bidirectional animation

**Content to implement verbatim:**
- Label: `CONTACT`
- Body: `I'm currently open to frontend roles, freelance work, or just a good conversation about something you're building. Drop a message below or reach out directly — I read everything and reply quickly.`

- [ ] **Step 1: Update `components/Contact.tsx`**

Replace the entire file with:
```tsx
'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.currentTarget)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        e.currentTarget.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" aria-label="Contact" className="py-32 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-4 mb-12"
        >
          <motion.p variants={itemVariants} className="font-heading text-accent font-semibold tracking-widest uppercase text-sm">
            Contact
          </motion.p>
          <motion.h2 variants={itemVariants} className="font-heading text-5xl md:text-6xl font-bold text-text-primary">
            Let&apos;s Work <span className="text-accent">Together</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-text-muted text-lg md:text-xl leading-relaxed">
            I&apos;m currently open to frontend roles, freelance work, or just a good conversation about something you&apos;re building. Drop a message below or reach out directly — I read everything and reply quickly.
          </motion.p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-left"
        >
          <label htmlFor="contact-name" className="sr-only">Your Name</label>
          <input id="contact-name" type="text" name="name" placeholder="Your Name" required
            className="bg-surface border border-white/10 rounded-xl px-5 py-4 text-text-primary text-lg placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors" />
          <label htmlFor="contact-email" className="sr-only">Your Email</label>
          <input id="contact-email" type="email" name="email" placeholder="Your Email" required
            className="bg-surface border border-white/10 rounded-xl px-5 py-4 text-text-primary text-lg placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors" />
          <label htmlFor="contact-message" className="sr-only">Your Message</label>
          <textarea id="contact-message" name="message" placeholder="Your Message" required rows={6}
            className="bg-surface border border-white/10 rounded-xl px-5 py-4 text-text-primary text-lg placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none" />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-accent text-white font-medium text-lg py-4 px-8 rounded-xl hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 transition-all duration-200 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && (
            <p role="status" className="text-green-400 text-center">Message sent! I&apos;ll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p role="alert" className="text-red-400 text-center">Something went wrong. Please try again.</p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6 mt-12 flex-wrap"
        >
          <a
            href="mailto:nathanwang555@gmail.com"
            className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <FiMail size={20} aria-hidden="true" /> nathanwang555@gmail.com
          </a>
          <a
            href="https://github.com/NathanWang01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <FiGithub size={22} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/nathan-wang-238862243/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <FiLinkedin size={22} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Run tests**

```powershell
npm test
```
Expected: all tests pass

- [ ] **Step 3: Commit**

```powershell
git add components/Contact.tsx
git commit -m "feat: upgrade Contact with label, body text, and bidirectional animation"
```

---

### Task 8: Footer Typography & Final Build Verification

**Files:**
- Modify: `components/Footer.tsx`

**Interfaces:**
- Produces: slightly upgraded footer text size, final clean build

- [ ] **Step 1: Update `components/Footer.tsx`**

Replace the entire file with:
```tsx
import { FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-accent/20 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-base">
          Designed & Built by <span className="text-accent font-medium">Nathan Wang</span> © 2026
        </p>
        <div className="flex gap-5">
          <a
            href="https://github.com/NathanWang01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <FiGithub size={20} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/nathan-wang-238862243/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <FiLinkedin size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Run full test suite**

```powershell
npm test
```
Expected: all test suites pass

- [ ] **Step 3: Run build**

```powershell
npm run build
```
Expected: build completes with no TypeScript or build errors

- [ ] **Step 4: Final dev server preview**

```powershell
npm run dev
```
Open http://localhost:3000 and verify:
- Navbar shows Home | About | Projects | Contact; logo scrolls to top
- Geometric background shapes visible (faint coral outlines)
- Hero: coral label, large heading, body text, larger CTA buttons
- About: coral label, body text with cooking/gaming story, icon grid with coral-tinted icons
- Projects: cards snap into view as you scroll, next card peeks from below
- Contact: coral label, body text, larger form fields
- All sections animate on scroll up AND down
- Footer updated

- [ ] **Step 5: Commit**

```powershell
git add components/Footer.tsx
git commit -m "feat: upgrade Footer typography and complete portfolio refresh"
```
