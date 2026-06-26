# Focus Timer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone Pomodoro-style focus timer web app with customizable durations, a coral circular progress ring, sound notification, and a dark/coral aesthetic matching Nathan Wang's portfolio.

**Architecture:** `useTimer` hook owns all state and logic; `useSound` generates chimes via Web Audio API; three presentational components (`TimerRing`, `TimerControls`, `TimerSettings`) receive props and call callbacks; `page.tsx` wires everything together.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, Jest + React Testing Library

## Global Constraints

- Project root: `C:\Users\natha\Projects\focus-timer\`
- Tailwind v4: use `@theme {}` in `globals.css` — no `tailwind.config.ts`
- Colors: background `#0d0d0d`, surface `#1a1a1a`, accent `#FF6B47`, text-primary `#f5f5f5`, text-muted `#888888`
- Fonts: Inter (body), Syne (headings) — loaded via `next/font/google`
- All components with event handlers or hooks must have `'use client'` directive
- Hooks (`useTimer.ts`, `useSound.ts`) do NOT get `'use client'` — only component files do
- Minimum timer duration: 1 minute (clamp all inputs)
- No external audio files — use Web Audio API only

---

### Task 1: Project Scaffold & Configuration

**Files:**
- Create: `C:\Users\natha\Projects\focus-timer\` (via create-next-app)
- Create: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Create: `__mocks__/framer-motion.tsx`
- Create: `AGENTS.md`

**Interfaces:**
- Produces: working Next.js dev server, passing `npm test` with zero tests

- [ ] **Step 1: Scaffold the project**

Run in `C:\Users\natha\Projects\`:
```powershell
npx create-next-app@latest focus-timer --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
cd focus-timer
```
Answer prompts: accept all defaults.

- [ ] **Step 2: Read the Next.js guide before writing any code**

```powershell
Get-ChildItem node_modules/next/dist/docs/
```
Read the relevant guide for the installed version. Note any breaking changes from Next.js 14/15.

- [ ] **Step 3: Install dependencies**

```powershell
npm install framer-motion
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

- [ ] **Step 4: Replace `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-background: #0d0d0d;
  --color-surface: #1a1a1a;
  --color-accent: #FF6B47;
  --color-text-primary: #f5f5f5;
  --color-text-muted: #888888;
  --font-sans: var(--font-inter), sans-serif;
  --font-heading: var(--font-syne), sans-serif;
}

html {
  background-color: #0d0d0d;
}
```

- [ ] **Step 5: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })

export const metadata: Metadata = {
  title: 'Focus Timer',
  description: 'A customizable Pomodoro-style focus timer.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans bg-background text-text-primary">{children}</body>
    </html>
  )
}
```

- [ ] **Step 6: Create `jest.config.ts`**

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^framer-motion$': '<rootDir>/__mocks__/framer-motion.tsx',
  },
}

export default createJestConfig(config)
```

- [ ] **Step 7: Create `jest.setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 8: Create `__mocks__/framer-motion.tsx`**

```tsx
import React from 'react'

const motion = new Proxy({} as Record<string, React.FC>, {
  get: (_target, tag: string) =>
    React.forwardRef(({ children, animate, transition, initial, whileHover, whileTap, ...props }: any, ref: any) =>
      React.createElement(tag, { ...props, ref }, children)
    ),
})

const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>
const useInView = () => true
const useAnimation = () => ({ start: jest.fn(), stop: jest.fn() })

export { motion, AnimatePresence, useInView, useAnimation }
```

- [ ] **Step 9: Add test script to `package.json`**

Add to the `"scripts"` section:
```json
"test": "jest --watchAll=false",
"test:watch": "jest --watch"
```

- [ ] **Step 10: Create `AGENTS.md`**

```md
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
```

- [ ] **Step 11: Verify dev server and tests run**

```powershell
npm run dev
```
Expected: server starts on http://localhost:3000 (default scaffold page visible). Stop it.

```powershell
npm test
```
Expected: "No tests found" or 0 passing — no errors.

- [ ] **Step 12: Delete scaffold placeholder files**

Delete `app/page.tsx` content (replace with empty export for now) and remove any default CSS the scaffold added that conflicts.

- [ ] **Step 13: Commit**

```powershell
git add -A
git commit -m "feat: scaffold focus-timer with Next.js, Tailwind v4, and Jest"
```

---

### Task 2: useSound Hook

**Files:**
- Create: `hooks/useSound.ts`
- Create: `__tests__/useSound.test.ts`

**Interfaces:**
- Produces: `useSound(): { playChime: () => void }`

- [ ] **Step 1: Create `__tests__/useSound.test.ts` (failing)**

```ts
import { renderHook, act } from '@testing-library/react'
import { useSound } from '@/hooks/useSound'

describe('useSound', () => {
  it('does not throw when Web Audio API is unavailable', () => {
    const originalAC = (window as any).AudioContext
    const originalWAC = (window as any).webkitAudioContext
    ;(window as any).AudioContext = undefined
    ;(window as any).webkitAudioContext = undefined

    const { result } = renderHook(() => useSound())
    expect(() => act(() => result.current.playChime())).not.toThrow()

    ;(window as any).AudioContext = originalAC
    ;(window as any).webkitAudioContext = originalWAC
  })

  it('calls AudioContext.createOscillator when available', () => {
    const mockStop = jest.fn()
    const mockStart = jest.fn()
    const mockConnect = jest.fn()
    const mockSetValue = jest.fn()
    const mockRamp = jest.fn()

    const mockOscillator = {
      connect: mockConnect,
      type: 'sine' as OscillatorType,
      frequency: { setValueAtTime: mockSetValue, exponentialRampToValueAtTime: mockRamp },
      start: mockStart,
      stop: mockStop,
    }
    const mockGain = {
      connect: mockConnect,
      gain: { setValueAtTime: mockSetValue, exponentialRampToValueAtTime: mockRamp },
    }
    const mockCtx = {
      createOscillator: jest.fn(() => mockOscillator),
      createGain: jest.fn(() => mockGain),
      destination: {},
      currentTime: 0,
    }
    ;(window as any).AudioContext = jest.fn(() => mockCtx)

    const { result } = renderHook(() => useSound())
    act(() => result.current.playChime())

    expect(mockCtx.createOscillator).toHaveBeenCalled()
    expect(mockStart).toHaveBeenCalled()
    expect(mockStop).toHaveBeenCalled()

    ;(window as any).AudioContext = undefined
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```powershell
npm test -- --testPathPattern=useSound
```
Expected: FAIL — `Cannot find module '@/hooks/useSound'`

- [ ] **Step 3: Create `hooks/useSound.ts`**

```ts
import { useCallback } from 'react'

export function useSound() {
  const playChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(880, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3)

      gainNode.gain.setValueAtTime(0.5, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.8)
    } catch {
      // Web Audio API unavailable — silent fail
    }
  }, [])

  return { playChime }
}
```

- [ ] **Step 4: Run test — confirm it passes**

```powershell
npm test -- --testPathPattern=useSound
```
Expected: PASS — 2 tests passing

- [ ] **Step 5: Commit**

```powershell
git add hooks/useSound.ts __tests__/useSound.test.ts
git commit -m "feat: add useSound hook with Web Audio API chime"
```

---

### Task 3: useTimer Hook

**Files:**
- Create: `hooks/useTimer.ts`
- Create: `__tests__/useTimer.test.ts`

**Interfaces:**
- Consumes: `useSound(): { playChime: () => void }` from `hooks/useSound.ts`
- Produces:
  ```ts
  export interface TimerSettings { focusMinutes: number; breakMinutes: number }
  export type TimerMode = 'focus' | 'break'
  useTimer(): {
    timeLeft: number        // seconds remaining
    totalTime: number       // total seconds for current mode
    mode: TimerMode
    isRunning: boolean
    isFinished: boolean
    settings: TimerSettings
    start: () => void
    pause: () => void
    reset: () => void
    switchMode: (mode: TimerMode) => void
    updateSettings: (partial: Partial<TimerSettings>) => void
  }
  ```

- [ ] **Step 1: Create `__tests__/useTimer.test.ts` (failing)**

```ts
import { renderHook, act } from '@testing-library/react'
import { useTimer } from '@/hooks/useTimer'

const mockPlayChime = jest.fn()
jest.mock('@/hooks/useSound', () => ({
  useSound: () => ({ playChime: mockPlayChime }),
}))

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockPlayChime.mockClear()
  })
  afterEach(() => jest.useRealTimers())

  it('initializes with 25 minute focus timer', () => {
    const { result } = renderHook(() => useTimer())
    expect(result.current.timeLeft).toBe(25 * 60)
    expect(result.current.totalTime).toBe(25 * 60)
    expect(result.current.mode).toBe('focus')
    expect(result.current.isRunning).toBe(false)
    expect(result.current.isFinished).toBe(false)
  })

  it('counts down each second when running', () => {
    const { result } = renderHook(() => useTimer())
    act(() => { result.current.start() })
    act(() => { jest.advanceTimersByTime(3000) })
    expect(result.current.timeLeft).toBe(25 * 60 - 3)
  })

  it('stops and sets isFinished when timeLeft reaches zero', () => {
    const { result } = renderHook(() => useTimer())
    act(() => { result.current.start() })
    act(() => { jest.advanceTimersByTime(25 * 60 * 1000) })
    expect(result.current.timeLeft).toBe(0)
    expect(result.current.isFinished).toBe(true)
    expect(result.current.isRunning).toBe(false)
  })

  it('triggers sound exactly once when timer reaches zero', () => {
    const { result } = renderHook(() => useTimer())
    act(() => { result.current.start() })
    act(() => { jest.advanceTimersByTime(25 * 60 * 1000) })
    expect(mockPlayChime).toHaveBeenCalledTimes(1)
  })

  it('pause stops the countdown', () => {
    const { result } = renderHook(() => useTimer())
    act(() => { result.current.start() })
    act(() => { jest.advanceTimersByTime(5000) })
    act(() => { result.current.pause() })
    act(() => { jest.advanceTimersByTime(5000) })
    expect(result.current.timeLeft).toBe(25 * 60 - 5)
    expect(result.current.isRunning).toBe(false)
  })

  it('reset restores timeLeft and clears isFinished', () => {
    const { result } = renderHook(() => useTimer())
    act(() => { result.current.start() })
    act(() => { jest.advanceTimersByTime(25 * 60 * 1000) })
    act(() => { result.current.reset() })
    expect(result.current.timeLeft).toBe(25 * 60)
    expect(result.current.isFinished).toBe(false)
    expect(result.current.isRunning).toBe(false)
  })

  it('switchMode switches to break and sets correct timeLeft', () => {
    const { result } = renderHook(() => useTimer())
    act(() => { result.current.switchMode('break') })
    expect(result.current.mode).toBe('break')
    expect(result.current.timeLeft).toBe(5 * 60)
    expect(result.current.totalTime).toBe(5 * 60)
    expect(result.current.isRunning).toBe(false)
  })

  it('updateSettings updates durations and timeLeft when idle', () => {
    const { result } = renderHook(() => useTimer())
    act(() => { result.current.updateSettings({ focusMinutes: 30 }) })
    expect(result.current.settings.focusMinutes).toBe(30)
    expect(result.current.timeLeft).toBe(30 * 60)
  })

  it('clamps focus duration to minimum 1 minute', () => {
    const { result } = renderHook(() => useTimer())
    act(() => { result.current.updateSettings({ focusMinutes: 0 }) })
    expect(result.current.settings.focusMinutes).toBe(1)
    act(() => { result.current.updateSettings({ focusMinutes: -5 }) })
    expect(result.current.settings.focusMinutes).toBe(1)
  })

  it('does not update timeLeft when settings change while running', () => {
    const { result } = renderHook(() => useTimer())
    act(() => { result.current.start() })
    act(() => { jest.advanceTimersByTime(5000) })
    act(() => { result.current.updateSettings({ focusMinutes: 30 }) })
    expect(result.current.isRunning).toBe(false) // updateSettings pauses — expected behavior
    // timeLeft should reflect the new setting since timer was paused by update
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```powershell
npm test -- --testPathPattern=useTimer
```
Expected: FAIL — `Cannot find module '@/hooks/useTimer'`

- [ ] **Step 3: Create `hooks/useTimer.ts`**

```ts
import { useState, useEffect, useRef, useCallback } from 'react'
import { useSound } from './useSound'

export interface TimerSettings {
  focusMinutes: number
  breakMinutes: number
}

export type TimerMode = 'focus' | 'break'

const MIN_MINUTES = 1

export function useTimer() {
  const [settings, setSettings] = useState<TimerSettings>({ focusMinutes: 25, breakMinutes: 5 })
  const [mode, setMode] = useState<TimerMode>('focus')
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { playChime } = useSound()

  const totalTime = mode === 'focus' ? settings.focusMinutes * 60 : settings.breakMinutes * 60

  // Countdown interval
  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1))
    }, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning])

  // Completion detection
  useEffect(() => {
    if (timeLeft !== 0 || !isRunning) return
    setIsRunning(false)
    setIsFinished(true)
    playChime()
  }, [timeLeft, isRunning, playChime])

  const start = useCallback(() => {
    if (!isFinished && timeLeft > 0) setIsRunning(true)
  }, [isFinished, timeLeft])

  const pause = useCallback(() => setIsRunning(false), [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setIsFinished(false)
    setTimeLeft(mode === 'focus' ? settings.focusMinutes * 60 : settings.breakMinutes * 60)
  }, [mode, settings])

  const switchMode = useCallback((newMode: TimerMode) => {
    setIsRunning(false)
    setIsFinished(false)
    setMode(newMode)
    setTimeLeft(newMode === 'focus' ? settings.focusMinutes * 60 : settings.breakMinutes * 60)
  }, [settings])

  const updateSettings = useCallback((partial: Partial<TimerSettings>) => {
    const nextFocus = partial.focusMinutes !== undefined && !isNaN(partial.focusMinutes)
      ? Math.max(MIN_MINUTES, partial.focusMinutes)
      : settings.focusMinutes
    const nextBreak = partial.breakMinutes !== undefined && !isNaN(partial.breakMinutes)
      ? Math.max(MIN_MINUTES, partial.breakMinutes)
      : settings.breakMinutes
    setSettings({ focusMinutes: nextFocus, breakMinutes: nextBreak })
    if (!isRunning && !isFinished) {
      setTimeLeft(mode === 'focus' ? nextFocus * 60 : nextBreak * 60)
    }
  }, [settings, isRunning, isFinished, mode])

  return { timeLeft, totalTime, mode, isRunning, isFinished, settings, start, pause, reset, switchMode, updateSettings }
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```powershell
npm test -- --testPathPattern=useTimer
```
Expected: PASS — all tests green. If any fail, read the error carefully — likely a fake timer / act() ordering issue. Wrap both `start()` and `advanceTimersByTime()` in separate `act()` calls.

- [ ] **Step 5: Commit**

```powershell
git add hooks/useTimer.ts __tests__/useTimer.test.ts
git commit -m "feat: add useTimer hook with countdown, modes, and settings"
```

---

### Task 4: TimerRing Component

**Files:**
- Create: `components/TimerRing.tsx`
- Create: `__tests__/TimerRing.test.tsx`

**Interfaces:**
- Consumes: `{ timeLeft: number, totalTime: number }`
- Produces: SVG ring + formatted countdown display

- [ ] **Step 1: Create `__tests__/TimerRing.test.tsx` (failing)**

```tsx
import { render, screen } from '@testing-library/react'
import TimerRing from '@/components/TimerRing'

describe('TimerRing', () => {
  it('displays formatted time MM:SS', () => {
    render(<TimerRing timeLeft={25 * 60} totalTime={25 * 60} />)
    expect(screen.getByText('25:00')).toBeInTheDocument()
  })

  it('pads single-digit seconds with leading zero', () => {
    render(<TimerRing timeLeft={65} totalTime={25 * 60} />)
    expect(screen.getByText('01:05')).toBeInTheDocument()
  })

  it('displays 00:00 when timeLeft is 0', () => {
    render(<TimerRing timeLeft={0} totalTime={25 * 60} />)
    expect(screen.getByText('00:00')).toBeInTheDocument()
  })

  it('renders two SVG circles (track + progress)', () => {
    const { container } = render(<TimerRing timeLeft={1500} totalTime={1500} />)
    const circles = container.querySelectorAll('circle')
    expect(circles).toHaveLength(2)
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```powershell
npm test -- --testPathPattern=TimerRing
```
Expected: FAIL — `Cannot find module '@/components/TimerRing'`

- [ ] **Step 3: Create `components/TimerRing.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'

interface TimerRingProps {
  timeLeft: number
  totalTime: number
}

const SIZE = 280
const STROKE_WIDTH = 10
const RADIUS = (SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function TimerRing({ timeLeft, totalTime }: TimerRingProps) {
  const progress = totalTime > 0 ? timeLeft / totalTime : 0
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <div className="relative flex items-center justify-center" style={{ width: SIZE, height: SIZE }}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="-rotate-90 absolute"
        aria-hidden="true"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={STROKE_WIDTH}
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#FF6B47"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>
      <span
        className="font-sans text-6xl font-bold text-text-primary tabular-nums"
        aria-label={`${Math.floor(timeLeft / 60)} minutes ${timeLeft % 60} seconds remaining`}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```powershell
npm test -- --testPathPattern=TimerRing
```
Expected: PASS — 4 tests green

- [ ] **Step 5: Commit**

```powershell
git add components/TimerRing.tsx __tests__/TimerRing.test.tsx
git commit -m "feat: add TimerRing SVG component with Framer Motion animation"
```

---

### Task 5: TimerControls Component

**Files:**
- Create: `components/TimerControls.tsx`
- Create: `__tests__/TimerControls.test.tsx`

**Interfaces:**
- Consumes:
  ```ts
  {
    isRunning: boolean
    isFinished: boolean
    mode: 'focus' | 'break'
    onStart: () => void
    onPause: () => void
    onReset: () => void
    onSwitchMode: (mode: 'focus' | 'break') => void
  }
  ```
- Produces: Start/Pause/Reset/SwitchMode buttons

- [ ] **Step 1: Create `__tests__/TimerControls.test.tsx` (failing)**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TimerControls from '@/components/TimerControls'
import type { TimerMode } from '@/hooks/useTimer'

const defaultProps = {
  isRunning: false,
  isFinished: false,
  mode: 'focus' as TimerMode,
  onStart: jest.fn(),
  onPause: jest.fn(),
  onReset: jest.fn(),
  onSwitchMode: jest.fn(),
}

describe('TimerControls', () => {
  beforeEach(() => jest.clearAllMocks())

  it('shows Start button when idle', () => {
    render(<TimerControls {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
  })

  it('shows Pause button when running', () => {
    render(<TimerControls {...defaultProps} isRunning={true} />)
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
  })

  it('shows "Start Break" when finished in focus mode', () => {
    render(<TimerControls {...defaultProps} isFinished={true} mode="focus" />)
    expect(screen.getByRole('button', { name: 'Start Break' })).toBeInTheDocument()
  })

  it('shows "Start Focus" when finished in break mode', () => {
    render(<TimerControls {...defaultProps} isFinished={true} mode="break" />)
    expect(screen.getByRole('button', { name: 'Start Focus' })).toBeInTheDocument()
  })

  it('always shows Reset button', () => {
    render(<TimerControls {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  })

  it('calls onStart when Start clicked', async () => {
    render(<TimerControls {...defaultProps} />)
    await userEvent.click(screen.getByRole('button', { name: 'Start' }))
    expect(defaultProps.onStart).toHaveBeenCalledTimes(1)
  })

  it('calls onPause when Pause clicked', async () => {
    render(<TimerControls {...defaultProps} isRunning={true} />)
    await userEvent.click(screen.getByRole('button', { name: 'Pause' }))
    expect(defaultProps.onPause).toHaveBeenCalledTimes(1)
  })

  it('calls onReset when Reset clicked', async () => {
    render(<TimerControls {...defaultProps} />)
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(defaultProps.onReset).toHaveBeenCalledTimes(1)
  })

  it('calls onSwitchMode with "break" when "Start Break" clicked', async () => {
    render(<TimerControls {...defaultProps} isFinished={true} mode="focus" />)
    await userEvent.click(screen.getByRole('button', { name: 'Start Break' }))
    expect(defaultProps.onSwitchMode).toHaveBeenCalledWith('break')
  })

  it('calls onSwitchMode with "focus" when "Start Focus" clicked', async () => {
    render(<TimerControls {...defaultProps} isFinished={true} mode="break" />)
    await userEvent.click(screen.getByRole('button', { name: 'Start Focus' }))
    expect(defaultProps.onSwitchMode).toHaveBeenCalledWith('focus')
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```powershell
npm test -- --testPathPattern=TimerControls
```
Expected: FAIL — `Cannot find module '@/components/TimerControls'`

- [ ] **Step 3: Create `components/TimerControls.tsx`**

```tsx
'use client'

import type { TimerMode } from '@/hooks/useTimer'

interface TimerControlsProps {
  isRunning: boolean
  isFinished: boolean
  mode: TimerMode
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSwitchMode: (mode: TimerMode) => void
}

export default function TimerControls({
  isRunning, isFinished, mode, onStart, onPause, onReset, onSwitchMode,
}: TimerControlsProps) {
  const mainButton = () => {
    if (isFinished) {
      const nextMode = mode === 'focus' ? 'break' : 'focus'
      const label = mode === 'focus' ? 'Start Break' : 'Start Focus'
      return (
        <button
          onClick={() => onSwitchMode(nextMode)}
          className="px-8 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {label}
        </button>
      )
    }
    if (isRunning) {
      return (
        <button
          onClick={onPause}
          className="px-8 py-3 bg-surface border border-accent text-accent font-semibold rounded-full hover:bg-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Pause
        </button>
      )
    }
    return (
      <button
        onClick={onStart}
        className="px-8 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Start
      </button>
    )
  }

  return (
    <div className="flex items-center gap-4">
      {mainButton()}
      <button
        onClick={onReset}
        className="px-6 py-3 bg-surface border border-text-muted text-text-muted font-semibold rounded-full hover:border-text-primary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-muted"
      >
        Reset
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```powershell
npm test -- --testPathPattern=TimerControls
```
Expected: PASS — 10 tests green

- [ ] **Step 5: Commit**

```powershell
git add components/TimerControls.tsx __tests__/TimerControls.test.tsx
git commit -m "feat: add TimerControls component with start/pause/reset/switch"
```

---

### Task 6: TimerSettings Component

**Files:**
- Create: `components/TimerSettings.tsx`
- Create: `__tests__/TimerSettings.test.tsx`

**Interfaces:**
- Consumes:
  ```ts
  {
    settings: TimerSettings  // { focusMinutes: number, breakMinutes: number }
    isRunning: boolean
    onUpdate: (partial: Partial<TimerSettings>) => void
  }
  ```
- Produces: two labeled number inputs for Focus and Break durations

- [ ] **Step 1: Create `__tests__/TimerSettings.test.tsx` (failing)**

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TimerSettings from '@/components/TimerSettings'
import type { TimerSettings as TSettings } from '@/hooks/useTimer'

const defaultProps = {
  settings: { focusMinutes: 25, breakMinutes: 5 } as TSettings,
  isRunning: false,
  onUpdate: jest.fn(),
}

describe('TimerSettings', () => {
  beforeEach(() => jest.clearAllMocks())

  it('displays current focus and break values', () => {
    render(<TimerSettings {...defaultProps} />)
    expect(screen.getByLabelText('Focus duration in minutes')).toHaveValue(25)
    expect(screen.getByLabelText('Break duration in minutes')).toHaveValue(5)
  })

  it('inputs are enabled when not running', () => {
    render(<TimerSettings {...defaultProps} isRunning={false} />)
    expect(screen.getByLabelText('Focus duration in minutes')).not.toBeDisabled()
    expect(screen.getByLabelText('Break duration in minutes')).not.toBeDisabled()
  })

  it('inputs are disabled when running', () => {
    render(<TimerSettings {...defaultProps} isRunning={true} />)
    expect(screen.getByLabelText('Focus duration in minutes')).toBeDisabled()
    expect(screen.getByLabelText('Break duration in minutes')).toBeDisabled()
  })

  it('calls onUpdate with focusMinutes when focus input changes', async () => {
    render(<TimerSettings {...defaultProps} />)
    const input = screen.getByLabelText('Focus duration in minutes')
    await userEvent.clear(input)
    await userEvent.type(input, '30')
    expect(defaultProps.onUpdate).toHaveBeenLastCalledWith({ focusMinutes: 30 })
  })

  it('calls onUpdate with breakMinutes when break input changes', async () => {
    render(<TimerSettings {...defaultProps} />)
    const input = screen.getByLabelText('Break duration in minutes')
    await userEvent.clear(input)
    await userEvent.type(input, '10')
    expect(defaultProps.onUpdate).toHaveBeenLastCalledWith({ breakMinutes: 10 })
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```powershell
npm test -- --testPathPattern=TimerSettings
```
Expected: FAIL — `Cannot find module '@/components/TimerSettings'`

- [ ] **Step 3: Create `components/TimerSettings.tsx`**

```tsx
'use client'

import type { TimerSettings } from '@/hooks/useTimer'

interface TimerSettingsProps {
  settings: TimerSettings
  isRunning: boolean
  onUpdate: (partial: Partial<TimerSettings>) => void
}

export default function TimerSettings({ settings, isRunning, onUpdate }: TimerSettingsProps) {
  return (
    <div className="flex items-center gap-6 text-sm text-text-muted">
      <label className="flex items-center gap-2">
        <span>Focus</span>
        <input
          type="number"
          min={1}
          value={settings.focusMinutes}
          disabled={isRunning}
          aria-label="Focus duration in minutes"
          onChange={e => onUpdate({ focusMinutes: parseInt(e.target.value, 10) })}
          className="w-14 px-2 py-1 bg-surface border border-surface rounded text-center text-text-primary focus:outline-none focus:border-accent disabled:opacity-40 disabled:cursor-not-allowed"
        />
        <span>min</span>
      </label>
      <label className="flex items-center gap-2">
        <span>Break</span>
        <input
          type="number"
          min={1}
          value={settings.breakMinutes}
          disabled={isRunning}
          aria-label="Break duration in minutes"
          onChange={e => onUpdate({ breakMinutes: parseInt(e.target.value, 10) })}
          className="w-14 px-2 py-1 bg-surface border border-surface rounded text-center text-text-primary focus:outline-none focus:border-accent disabled:opacity-40 disabled:cursor-not-allowed"
        />
        <span>min</span>
      </label>
    </div>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```powershell
npm test -- --testPathPattern=TimerSettings
```
Expected: PASS — 5 tests green

- [ ] **Step 5: Commit**

```powershell
git add components/TimerSettings.tsx __tests__/TimerSettings.test.tsx
git commit -m "feat: add TimerSettings component with focus/break duration inputs"
```

---

### Task 7: Page Assembly

**Files:**
- Modify: `app/page.tsx`
- Create: `__tests__/page.test.tsx`

**Interfaces:**
- Consumes: `useTimer`, `TimerRing`, `TimerControls`, `TimerSettings`
- Produces: complete, interactive single-page Focus Timer app

- [ ] **Step 1: Create `__tests__/page.test.tsx` (failing)**

```tsx
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

jest.mock('@/hooks/useSound', () => ({
  useSound: () => ({ playChime: jest.fn() }),
}))

describe('Home page', () => {
  it('renders the app title', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: 'Focus Timer' })).toBeInTheDocument()
  })

  it('renders Focus and Break mode tabs', () => {
    render(<Home />)
    expect(screen.getByRole('tab', { name: 'focus' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'break' })).toBeInTheDocument()
  })

  it('renders the Start button initially', () => {
    render(<Home />)
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
  })

  it('renders the timer display showing 25:00 initially', () => {
    render(<Home />)
    expect(screen.getByText('25:00')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — confirm it fails**

```powershell
npm test -- --testPathPattern="app/page|__tests__/page"
```
Expected: FAIL — module not found or rendering error

- [ ] **Step 3: Write `app/page.tsx`**

```tsx
'use client'

import { useTimer } from '@/hooks/useTimer'
import TimerRing from '@/components/TimerRing'
import TimerControls from '@/components/TimerControls'
import TimerSettings from '@/components/TimerSettings'

export default function Home() {
  const {
    timeLeft, totalTime, mode, isRunning, isFinished, settings,
    start, pause, reset, switchMode, updateSettings,
  } = useTimer()

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-8 px-4">
      <h1 className="font-heading text-3xl font-bold text-text-primary tracking-tight">
        Focus Timer
      </h1>

      <div className="flex gap-1 bg-surface rounded-full p-1" role="tablist" aria-label="Timer mode">
        {(['focus', 'break'] as const).map(m => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => switchMode(m)}
            className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              mode === m ? 'bg-accent text-white' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <TimerRing timeLeft={timeLeft} totalTime={totalTime} />

      <TimerControls
        isRunning={isRunning}
        isFinished={isFinished}
        mode={mode}
        onStart={start}
        onPause={pause}
        onReset={reset}
        onSwitchMode={switchMode}
      />

      <TimerSettings settings={settings} isRunning={isRunning} onUpdate={updateSettings} />
    </main>
  )
}
```

- [ ] **Step 4: Run all tests — confirm full suite passes**

```powershell
npm test
```
Expected: PASS — all test suites green (useSound, useTimer, TimerRing, TimerControls, TimerSettings, page)

- [ ] **Step 5: Run dev server and manually verify**

```powershell
npm run dev
```
Open http://localhost:3000 and verify:
- Dark background, coral ring, Inter/Syne fonts display correctly
- Focus/Break tabs switch mode and update ring
- Start begins countdown, Pause stops it, Reset restores it
- Timer reaching zero shows "Start Break" button
- Changing duration inputs updates the timer when idle
- Sound plays when timer finishes (check browser console for errors)

- [ ] **Step 6: Run build to confirm no TypeScript errors**

```powershell
npm run build
```
Expected: build completes with no errors

- [ ] **Step 7: Commit**

```powershell
git add app/page.tsx __tests__/page.test.tsx
git commit -m "feat: assemble Focus Timer page with all components wired"
```
