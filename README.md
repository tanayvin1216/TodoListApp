# Tasks

A minimal, architecturally clean todo app — built in a single shot by a custom Claude agent system to prove that AI-generated interfaces don't have to look like AI-generated interfaces.

---

## The Experiment

Most AI-generated UIs share the same tell-tale DNA: purple-to-blue gradients, glassmorphism everywhere, pill-shaped buttons, hero sections with centered text, and enough glow effects to light a runway. It's become so predictable there's a term for it — **vibe-coded UI**.

This project is a direct challenge to that.

I built a custom Claude Code agent system — a set of orchestration rules, design policies, quality gates, and routing logic — then pointed it at a blank Next.js 16 scaffold with one instruction:

> Build a todo list app that a human designer would actually ship.

The entire app was generated in **one shot**. No manual code edits. No "fix this, try again" loops. The agent system handled planning, architecture, implementation, testing, and self-review autonomously.

The result is a task manager that looks like it came from a design studio, not a chatbot.

---

## The Agent System

The system behind this project isn't a single prompt. It's a layered architecture of rules and agents:

**Design Policy** enforces a strict banned-patterns list (no gradient text, no glassmorphism, no over-rounded everything, no generic hero layouts) and requires every UI to declare a specific aesthetic direction. "Modern" is not an answer.

**Task Routing** classifies work into tiers (trivial through complex) and matches overhead to complexity. A button change doesn't get a standup. A full feature gets the full cycle.

**Quality Gates** include a design guardian that rejects vibe-coded output, security rules that block hardcoded secrets, and testing rules that enforce TDD.

**Coding Standards** enforce strict TypeScript, immutability by default, 20-line function limits, and no `any` types — ever.

The goal: make Claude produce work that passes the Steve Jobs test. Would he give a raise, or throw it back?

---

## What Got Built

A task manager with an **architectural minimalist** aesthetic, inspired by Things 3 and Linear.

### Design Decisions
- **One continuous surface** — no cards, no sections, no dark hero. `#FAFAF8` warm off-white everywhere
- **Monochrome-first** — color is used only for meaning (priority dots, category accents in nav), never for decoration
- **DM Sans only** — one font family, three sizes (15px / 12px / 11px), weight differentiation instead of size inflation
- **One animation** — delete exit slide. Everything else was cut. No entrance fades, no spring physics, no animated counters

### UX Fixes Over Typical AI Output
- **Inline task creation** — type and press Enter. No FAB, no modal, no bottom sheet
- **Always-visible delete** — no hover-only interactions that break on touch devices
- **Inline editing** — tap task text to edit in place. Enter to save, Escape to cancel
- **Undo for destructive actions** — 5-second toast after clearing completed tasks
- **Due dates** — native date input, relative time display ("2h", "Mar 23")

### Architecture
- **State**: `useReducer` with 7 discriminated union action types, localStorage persistence with schema migration
- **Types**: Strict readonly interfaces, no `any`, derived constants
- **Components**: 7 focused components, each under 170 lines, no inheritance
- **Tests**: Vitest with pure function extraction — tests validate both logic and design constraints (regex checks that banned patterns are absent)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion (delete exit only) |
| Testing | Vitest |
| State | useReducer + localStorage |
| IDs | uuid v13 |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm run lint       # ESLint
npx vitest         # Run tests
```

---

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout, fonts, metadata
    page.tsx            # Home route
    globals.css         # Design tokens, component styles
  lib/
    types.ts            # Todo, Priority, Filter, Category types
    hooks.ts            # todoReducer, useTodos, useRelativeTime
  components/
    TodoApp.tsx         # Root composition, hydration, accent logic
    MinimalHeader.tsx   # Date, progress bar, add button
    UnifiedNav.tsx      # Category + filter navigation
    InlineAddTask.tsx   # Expandable inline input with controls
    TaskRow.tsx         # Task display, checkbox, inline edit
    EmptyState.tsx      # Contextual empty messages
    UndoToast.tsx       # Timed undo notification
```

---

## The Point

AI tools are going to generate more and more of the interfaces people use every day. The question isn't whether AI can write code — it's whether it can produce work with taste.

This project is evidence that with the right system around it, it can. The agent didn't need a human designer reviewing every pixel. It needed clear constraints, banned patterns, a defined aesthetic direction, and quality gates that reject mediocrity.

The code is the proof. Read it, run it, judge it.

---

Built with a custom Claude Code agent system. Zero manual edits. One shot.
