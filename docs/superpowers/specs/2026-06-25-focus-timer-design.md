# Focus Timer — Design Spec
**Date:** 2026-06-25
**Status:** Approved

---

## Overview

A standalone Pomodoro-style focus timer web app built for Nathan Wang's developer portfolio. Customizable focus and break durations, a coral circular progress ring, sound notification on completion, and a polished dark/coral aesthetic matching the portfolio's design system.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Audio | Web Audio API (no external files) |
| Testing | Jest + React Testing Library |
| Deployment | Vercel |

---

## Visual Design

### Color Tokens
Matches the portfolio exactly:
- **Background:** `#0d0d0d`
- **Surface:** `#1a1a1a` (card/panel backgrounds)
- **Accent:** `#FF6B47` (coral — ring, active tab, buttons)
- **Text Primary:** `#f5f5f5`
- **Text Muted:** `#888888`

### Typography
- **Headings / Mode labels:** Syne
- **Countdown digits / Body:** Inter

### Layout
Single centered page (full viewport height). Top to bottom:
1. App title ("Focus Timer") in Syne
2. Mode tabs — **Focus** | **Break** (active tab in coral)
3. Large SVG circular progress ring (coral) with countdown digits inside
4. Controls — Start/Pause button + Reset button
5. Settings — two number inputs for Focus and Break durations (minutes)

When the timer reaches zero: sound plays, Start button becomes a **"Start Break"** (or **"Start Focus"**) prompt.

---

## Architecture

### Hook: `useTimer`
Owns all timer state and logic. Exposes:
- **State:** `timeLeft`, `totalTime`, `mode` (`'focus' | 'break'`), `isRunning`, `isFinished`, `settings`
- **Actions:** `start()`, `pause()`, `reset()`, `switchMode()`, `updateSettings()`
- **Side effect:** triggers `useSound` chime when `timeLeft` hits 0

### Component: `TimerRing`
SVG circular progress ring. Receives `timeLeft` and `totalTime`, computes `stroke-dashoffset`, animates drain with Framer Motion.

### Component: `TimerControls`
Start/Pause and Reset buttons. Receives `isRunning`, `isFinished`, and action callbacks.
- Default: shows Start or Pause depending on `isRunning`
- When `isFinished`: shows "Start Break" or "Start Focus" button

### Component: `TimerSettings`
Two number inputs for Focus and Break durations. Disabled while timer is running. Calls `updateSettings()` on change.

### Utility: `useSound`
Generates a chime using the Web Audio API. No audio file — pure code synthesis. Silently fails if Web Audio API is unavailable.

### Page: `page.tsx`
Assembles all components, wires `useTimer` state and actions to each component.

---

## Data Flow

```
useTimer (state + actions)
    ├── TimerRing      ← timeLeft, totalTime
    ├── TimerControls  ← isRunning, isFinished, start, pause, reset, switchMode
    └── TimerSettings  ← settings, isRunning, updateSettings
```

One-directional. No context, no global state.

---

## File Structure

```
C:\Users\natha\Projects\focus-timer\
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── TimerRing.tsx
│   ├── TimerControls.tsx
│   └── TimerSettings.tsx
├── hooks/
│   ├── useTimer.ts
│   └── useSound.ts
└── __tests__/
    ├── useTimer.test.ts
    ├── TimerRing.test.tsx
    ├── TimerControls.test.tsx
    └── TimerSettings.test.tsx
```

---

## Testing

### `useTimer` (unit — `renderHook`)
- Countdown ticks correctly each second
- Stops at zero and sets `isFinished: true`
- `switchMode()` toggles between focus and break
- `reset()` restores `timeLeft` to `totalTime`, clears `isFinished`
- `updateSettings()` updates durations; does not restart timer
- Sound triggers exactly once when `timeLeft` hits 0

### `TimerRing`
- SVG stroke value reflects `timeLeft / totalTime` ratio correctly
- Full ring when `timeLeft === totalTime`
- Empty ring when `timeLeft === 0`

### `TimerControls`
- Shows Start when paused, Pause when running
- Shows "Start Break" when `isFinished` in focus mode
- Shows "Start Focus" when `isFinished` in break mode
- Reset button always visible

### `TimerSettings`
- Inputs are disabled when `isRunning: true`
- Inputs are enabled when `isRunning: false`
- Changing a value calls `updateSettings` with correct args

---

## Edge Cases

- Duration set to 0 or negative → clamped to minimum 1 minute
- Settings changed while paused → saved, timer does not auto-restart
- Web Audio API unavailable → sound silently fails, timer functions normally

---

## Deployment

- Separate GitHub repo: `focus-timer`
- Deployed to Vercel with a live demo URL
- Linked in portfolio Projects section with GitHub + demo links
