# Nathan Wang Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, dark-themed personal branding portfolio for Nathan Wang using Next.js, Tailwind CSS, and Framer Motion with coral accent animations.

**Architecture:** Single Next.js App Router page (`app/page.tsx`) composing all sections (Hero, About, Projects, Contact). Navigation uses anchor-based smooth scroll. All animated components are client components using Framer Motion with scroll-triggered `useInView` hooks.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, react-type-animation, react-icons, Formspree (contact form), Vercel (deployment)

---

### Task 1: Project Scaffold & Configuration

**Files:**
- Create: `C:\Users\natha\Projects\nathan-portfolio\` (via create-next-app)
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

- [ ] **Step 1: Handle existing directory and scaffold Next.js**

The `docs` folder already exists inside `nathan-portfolio` from the spec step. Run these commands in PowerShell:

```powershell
# Move docs folder temporarily
Move-Item "C:\Users\natha\Projects\nathan-portfolio\docs" "C:\Users\natha\Projects\portfolio-docs-temp"

# Remove the now-empty directory
Remove-Item "C:\Users\natha\Projects\nathan-portfolio" -Recurse -Force

# Scaffold fresh Next.js project
cd "C:\Users\natha\Projects"
npx create-next-app@latest nathan-portfolio --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes

# Move docs back in
Move-Item "C:\Users\natha\Projects\portfolio-docs-temp" "C:\Users\natha\Projects\nathan-portfolio\docs"

cd "C:\Users\natha\Projects\nathan-portfolio"
```

Expected: Project created, `package.json` present, `app/` folder exists.

- [ ] **Step 2: Install additional dependencies**

```powershell
npm install framer-motion react-type-animation react-icons
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @types/jest
```

- [ ] **Step 3: Configure Tailwind with custom theme**

Replace `tailwind.config.ts` entirely:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',
        surface: '#1a1a1a',
        accent: '#FF6B47',
        'text-primary': '#f5f5f5',
        'text-muted': '#888888',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-syne)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 4: Replace globals.css**

Replace `app/globals.css` entirely:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #0d0d0d;
}

::-webkit-scrollbar-thumb {
  background: #FF6B47;
  border-radius: 3px;
}
```

- [ ] **Step 5: Set up Jest**

Create `jest.config.ts`:

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

Create `jest.setup.ts`:

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Download avatar image**

Download the avatar image from:
`https://img.freepik.com/premium-photo/web-developer-digital-avatar-generative-ai_934475-9048.jpg`

Save the file as `public/avatar.jpg`.

- [ ] **Step 7: Initialize git and commit**

```powershell
git init
git add .
git commit -m "feat: scaffold Next.js portfolio with Tailwind, Framer Motion, and Jest"
```

---

### Task 2: Global Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update layout with fonts and metadata**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })

export const metadata: Metadata = {
  title: 'Nathan Wang — Frontend Developer',
  description: 'I build interactive, responsive web experiences with React — bringing designs to life through clean code and smooth animations.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add app/layout.tsx
git commit -m "feat: configure global layout with Inter and Syne fonts"
```

---

### Task 3: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`
- Create: `__tests__/Navbar.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Navbar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('Navbar', () => {
  it('renders the name and nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('Nathan')).toBeInTheDocument()
    expect(screen.getByText('Wang')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```powershell
npx jest __tests__/Navbar.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/Navbar'"

- [ ] **Step 3: Create Navbar.tsx**

Create `components/Navbar.tsx`:

```tsx
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-heading font-bold text-xl text-text-primary">
          Nathan <span className="text-accent">Wang</span>
        </span>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-text-muted hover:text-accent transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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

- [ ] **Step 4: Run test — verify it passes**

```powershell
npx jest __tests__/Navbar.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit**

```powershell
git add components/Navbar.tsx __tests__/Navbar.test.tsx
git commit -m "feat: add Navbar with frosted glass scroll effect and mobile hamburger"
```

---

### Task 4: Hero Section

**Files:**
- Create: `components/Hero.tsx`
- Create: `__tests__/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}))

jest.mock('react-type-animation', () => ({
  TypeAnimation: () => <span>Frontend Developer</span>,
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}))

describe('Hero', () => {
  it('renders name, bio, CTA buttons, and social links', () => {
    render(<Hero />)
    expect(screen.getByText('Nathan')).toBeInTheDocument()
    expect(screen.getByText('Wang')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /View My Work/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Contact Me/i })).toBeInTheDocument()
    expect(screen.getByAltText(/Nathan Wang/i)).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```powershell
npx jest __tests__/Hero.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/Hero'"

- [ ] **Step 3: Create Hero.tsx**

Create `components/Hero.tsx`:

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
          <motion.p variants={itemVariants} className="text-accent font-medium tracking-widest uppercase text-sm">
            Hi, I&apos;m
          </motion.p>

          <motion.h1 variants={itemVariants} className="font-heading text-5xl md:text-7xl font-bold text-text-primary leading-tight">
            Nathan <span className="text-accent">Wang</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="text-2xl md:text-3xl font-heading text-text-muted h-10">
            <TypeAnimation
              sequence={['Frontend Developer', 2000, 'React Enthusiast', 2000, 'UI/UX Lover', 2000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p variants={itemVariants} className="text-text-muted text-lg leading-relaxed max-w-lg">
            I build interactive, responsive web experiences with React — bringing designs to life through clean code and smooth animations.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
            <button
              onClick={() => scrollTo('#projects')}
              className="bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors duration-200"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="border border-accent text-accent px-6 py-3 rounded-full font-medium hover:bg-accent/10 transition-colors duration-200"
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
              className="text-text-muted hover:text-accent transition-colors"
            >
              <FiGithub size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-wang-238862243/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <FiLinkedin size={22} />
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

- [ ] **Step 4: Run test — verify it passes**

```powershell
npx jest __tests__/Hero.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit**

```powershell
git add components/Hero.tsx __tests__/Hero.test.tsx
git commit -m "feat: add Hero section with typed animation and staggered entrance"
```

---

### Task 5: Skills Data & About Section

**Files:**
- Create: `lib/skills.ts`
- Create: `components/About.tsx`
- Create: `__tests__/About.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/About.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import About from '@/components/About'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  useInView: () => true,
}))

describe('About', () => {
  it('renders bio and all skill categories', () => {
    render(<About />)
    expect(screen.getByText(/Nathan Wang/)).toBeInTheDocument()
    expect(screen.getByText('Languages')).toBeInTheDocument()
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Tools')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('VS Code')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```powershell
npx jest __tests__/About.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/About'"

- [ ] **Step 3: Create lib/skills.ts**

Create `lib/skills.ts`:

```ts
export const skills: Record<string, string[]> = {
  Languages: ['Java', 'Python', 'SQL', 'JavaScript', 'HTML/CSS'],
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  Tools: ['PyCharm', 'Eclipse', 'VS Code', 'Git', 'GitHub'],
}
```

- [ ] **Step 4: Create About.tsx**

Create `components/About.tsx`:

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/lib/skills'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-16"
        >
          About <span className="text-accent">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-lg leading-relaxed"
          >
            I&apos;m Nathan Wang, a developer from the US with a love for clean UI and expressive code.
            Whether it&apos;s a smooth animation or a responsive layout, I care deeply about the details
            that make a web experience feel right. I build with React, Next.js, and modern web technologies.
          </motion.p>

          <div className="flex flex-col gap-8">
            {Object.entries(skills).map(([category, items], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.1 }}
              >
                <h3 className="text-text-muted uppercase text-xs tracking-widest font-medium mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + catIndex * 0.1 + i * 0.05 }}
                      className="bg-surface border border-white/10 text-text-primary px-3 py-1.5 rounded-lg text-sm font-medium hover:border-accent/50 hover:text-accent transition-colors duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test — verify it passes**

```powershell
npx jest __tests__/About.test.tsx
```

Expected: PASS

- [ ] **Step 6: Commit**

```powershell
git add lib/skills.ts components/About.tsx __tests__/About.test.tsx
git commit -m "feat: add About section with categorized skills grid and scroll animations"
```

---

### Task 6: Projects Data & Section

**Files:**
- Create: `lib/projects.ts`
- Create: `components/Projects.tsx`
- Create: `__tests__/Projects.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Projects.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Projects from '@/components/Projects'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
  useInView: () => true,
}))

describe('Projects', () => {
  it('renders section heading and all project cards', () => {
    render(<Projects />)
    expect(screen.getByText('My')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('My Website')).toBeInTheDocument()
    expect(screen.getByText('Church Site')).toBeInTheDocument()
    expect(screen.getAllByText('Coming Soon').length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```powershell
npx jest __tests__/Projects.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/Projects'"

- [ ] **Step 3: Create lib/projects.ts**

Create `lib/projects.ts`:

```ts
export interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  demo: string | null
  comingSoon?: boolean
}

export const projects: Project[] = [
  {
    title: 'My Website',
    description: 'A personal website built with HTML and CSS, showcasing early frontend development work.',
    tags: ['HTML', 'CSS'],
    github: 'https://github.com/NathanWang01/my-website',
    demo: null,
  },
  {
    title: 'Church Site',
    description: 'A clean, informational website for a church community, built with HTML and CSS.',
    tags: ['HTML', 'CSS'],
    github: 'https://github.com/NathanWang01/church.site',
    demo: null,
  },
  {
    title: 'Coming Soon',
    description: 'More projects are in the works. Stay tuned!',
    tags: [],
    github: '',
    demo: null,
    comingSoon: true,
  },
]
```

- [ ] **Step 4: Create Projects.tsx**

Create `components/Projects.tsx`:

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '@/lib/projects'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 px-6 bg-surface/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-16"
        >
          My <span className="text-accent">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`bg-surface border border-white/10 rounded-2xl p-6 flex flex-col gap-4
                hover:border-accent/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5
                transition-all duration-300 ${project.comingSoon ? 'opacity-50' : ''}`}
            >
              <div className="h-40 rounded-xl bg-white/5 flex items-center justify-center">
                {project.comingSoon ? (
                  <span className="text-text-muted font-heading text-lg">Coming Soon</span>
                ) : (
                  <span className="text-text-muted text-sm">{project.title}</span>
                )}
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold text-text-primary">{project.title}</h3>
                <p className="text-text-muted mt-2 text-sm leading-relaxed">{project.description}</p>
              </div>

              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {!project.comingSoon && (
                <div className="flex gap-4 mt-auto pt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm font-medium"
                    >
                      <FiGithub size={16} /> GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm font-medium"
                    >
                      <FiExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test — verify it passes**

```powershell
npx jest __tests__/Projects.test.tsx
```

Expected: PASS

- [ ] **Step 6: Commit**

```powershell
git add lib/projects.ts components/Projects.tsx __tests__/Projects.test.tsx
git commit -m "feat: add Projects section with card grid and placeholder entries"
```

---

### Task 7: Contact Section

**Files:**
- Create: `components/Contact.tsx`
- Create: `__tests__/Contact.test.tsx`

- [ ] **Step 1: Create a Formspree account**

Go to https://formspree.io, sign up with your email, create a new form named "Portfolio Contact", and copy your form ID (looks like `xpzgabcd`). You'll replace `YOUR_FORM_ID` with it in step 4.

- [ ] **Step 2: Write the failing test**

Create `__tests__/Contact.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Contact from '@/components/Contact'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  useInView: () => true,
}))

describe('Contact', () => {
  it('renders form fields and contact info', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    expect(screen.getByText('nathanwang555@gmail.com')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run test — verify it fails**

```powershell
npx jest __tests__/Contact.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/Contact'"

- [ ] **Step 4: Create Contact.tsx**

Replace `YOUR_FORM_ID` with your actual Formspree ID.

Create `components/Contact.tsx`:

```tsx
'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
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
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4"
        >
          Let&apos;s Work <span className="text-accent">Together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-text-muted text-lg mb-12"
        >
          Have a project in mind or just want to say hi? I&apos;d love to hear from you.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-left"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-accent text-white font-medium py-3 px-8 rounded-xl hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 transition-all duration-200 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && (
            <p className="text-green-400 text-center text-sm">Message sent! I&apos;ll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-center text-sm">Something went wrong. Please try again.</p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-6 mt-12 flex-wrap"
        >
          <a
            href="mailto:nathanwang555@gmail.com"
            className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm"
          >
            <FiMail size={18} /> nathanwang555@gmail.com
          </a>
          <a href="https://github.com/NathanWang01" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-text-muted hover:text-accent transition-colors">
            <FiGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/nathan-wang-238862243/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-muted hover:text-accent transition-colors">
            <FiLinkedin size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test — verify it passes**

```powershell
npx jest __tests__/Contact.test.tsx
```

Expected: PASS

- [ ] **Step 6: Commit**

```powershell
git add components/Contact.tsx __tests__/Contact.test.tsx
git commit -m "feat: add Contact section with Formspree integration"
```

---

### Task 8: Footer

**Files:**
- Create: `components/Footer.tsx`
- Create: `__tests__/Footer.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `__tests__/Footer.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders copyright text and social links', () => {
    render(<Footer />)
    expect(screen.getByText(/Nathan Wang/)).toBeInTheDocument()
    expect(screen.getByText(/2026/)).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```powershell
npx jest __tests__/Footer.test.tsx
```

Expected: FAIL — "Cannot find module '@/components/Footer'"

- [ ] **Step 3: Create Footer.tsx**

Create `components/Footer.tsx`:

```tsx
import { FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-accent/20 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm">
          Designed & Built by <span className="text-accent font-medium">Nathan Wang</span> © 2026
        </p>
        <div className="flex gap-5">
          <a
            href="https://github.com/NathanWang01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-accent transition-colors"
          >
            <FiGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/nathan-wang-238862243/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-accent transition-colors"
          >
            <FiLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Run test — verify it passes**

```powershell
npx jest __tests__/Footer.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit**

```powershell
git add components/Footer.tsx __tests__/Footer.test.tsx
git commit -m "feat: add Footer with social links and copyright"
```

---

### Task 9: Page Assembly & Visual Verification

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Assemble all sections**

Replace `app/page.tsx`:

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-background text-text-primary min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Run all tests**

```powershell
npx jest
```

Expected: All tests PASS

- [ ] **Step 3: Start dev server and visually verify**

```powershell
npm run dev
```

Open http://localhost:3000 and verify each item:

- [ ] Dark `#0d0d0d` background renders
- [ ] Coral accent `#FF6B47` shows on name, buttons, highlights
- [ ] Hero text staggers in on load
- [ ] Typed animation cycles through all three phrases
- [ ] Navbar turns frosted glass after scrolling down
- [ ] Clicking nav links smooth-scrolls to correct section
- [ ] Skills grid renders all three categories with correct items
- [ ] Project cards have hover lift and shadow effect
- [ ] Contact form renders with all three fields
- [ ] Footer renders with social links
- [ ] Mobile view (375px) — navbar collapses to hamburger, sections stack correctly

- [ ] **Step 4: Commit**

```powershell
git add app/page.tsx
git commit -m "feat: assemble all sections into final portfolio page"
```

---

### Task 10: GitHub & Vercel Deployment

- [ ] **Step 1: Create GitHub repository**

Go to https://github.com/new. Name it `nathan-portfolio`, set it to Public, do NOT initialize with README. Click Create.

- [ ] **Step 2: Push to GitHub**

```powershell
git remote add origin https://github.com/NathanWang01/nathan-portfolio.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Deploy to Vercel**

Go to https://vercel.com and sign in with GitHub. Click "Add New Project", select `nathan-portfolio` from your repos, leave all settings as default (Vercel auto-detects Next.js), and click Deploy.

- [ ] **Step 4: Verify live site**

Once deployed, open the Vercel URL (e.g., `https://nathan-portfolio-xyz.vercel.app`) and verify the site looks correct in production. Test on mobile.
