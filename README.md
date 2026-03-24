<div align="center">

# Tasks
### Can AI ship interfaces with taste? This is the proof.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br/>

**One-shot generation** · **Zero manual edits** · **Custom Claude agent system**


<br/>

![GitHub stars](https://img.shields.io/github/stars/tanayvin1216/TodoListApp?style=social)
![GitHub forks](https://img.shields.io/github/forks/tanayvin1216/TodoListApp?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/tanayvin1216/TodoListApp?style=flat-square)

</div>

---
## Screenshot 
<img width="400" height="500" alt="Screenshot 2026-03-23 at 11 34 51 PM" src="https://github.com/user-attachments/assets/ee5953ef-57d6-4c61-8e43-601d7479e47b" />

## The Experiment

Most AI-generated UIs share the same DNA: purple-to-blue gradients, glassmorphism everywhere, pill-shaped buttons, hero sections with centered text, and enough glow effects to light a runway. It's so predictable there's a term for it — **vibe-coded UI**.

This project is a direct challenge to that.

I built a custom Claude Code agent system — a layered architecture of design policies, orchestration rules, quality gates, and task routing — then pointed it at a blank Next.js 16 scaffold with one instruction:

> *Build a todo list app that a human designer would actually ship.*

The entire application was generated in **one shot**. No manual code edits. No "fix this, try again" loops. The agent system handled planning, architecture, implementation, testing, and self-review autonomously.

The result is a task manager that looks like it came from a design studio, not a chatbot.

---

## The Agent System

The system behind this isn't a single prompt. It's a multi-layered architecture:

| Layer | What It Does |
|-------|-------------|
| **Design Policy** | Enforces a banned-patterns list (no gradient text, no glassmorphism, no over-rounded everything) and requires a specific aesthetic direction. "Modern" is not an answer. |
| **Task Routing** | Classifies work into 4 tiers (trivial → complex) and matches overhead to complexity. A button change doesn't get a standup. |
| **Quality Gates** | Design guardian rejects vibe-coded output. Security rules block hardcoded secrets. Testing rules enforce TDD. |
| **Coding Standards** | Strict TypeScript, immutability by default, 20-line function limits, no `any` types — ever. |

The Steve Jobs test: *Would he give a raise, or throw it back?* If the answer is "this is generic" — iterate.

---

## What It Does

- **Inline task creation** — type and press Enter. No FAB, no modal, no bottom sheet
- **Categories & priorities** — organize tasks across Personal, Work, Health, and Ideas with Low / Medium / Urgent priority levels
- **Inline editing** — tap any task to edit in place. Enter to save, Escape to cancel
- **Always-visible delete** — no hover-only interactions that break on touch devices
- **Undo for destructive actions** — 5-second toast after clearing completed tasks
- **Due dates** — native date input with relative time display ("2h", "Mar 23")
- **Persistent storage** — localStorage with automatic schema migration
- **Mobile-first** — 85% of viewport dedicated to tasks on a 375px screen

---

## Design Decisions

**Aesthetic direction:** Architectural Minimalism — inspired by [Things 3](https://culturedcode.com/things/) and [Linear](https://linear.app/)

| Decision | Why |
|----------|-----|
| One continuous `#FAFAF8` surface | No cards, no sections, no dark hero — tasks ARE the interface |
| Monochrome-first palette | Color only for meaning (priority dots, category accents), never decoration |
| DM Sans, three sizes only | 15px / 12px / 11px — weight differentiation replaces size inflation |
| Single animation | Delete exit slide. Everything else was cut — no fades, no springs, no counters |
| No card boundaries | You shouldn't be able to point at where components begin and end |

### What Got Banned

```
Purple-to-blue gradients       Glassmorphism / blur effects
Gradient text                  Pill-shaped buttons on everything
Glow effects                   Hero-text-center-CTA layouts
Hover-only interactions        Noise textures
Animated stat counters         Spring physics on everything
Stagger-in entrance fades      Sliding tab indicators
```

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx              Root layout, DM Sans font, metadata
│   ├── page.tsx                Home route → TodoApp
│   └── globals.css             Design tokens, checkbox, progress bar
├── lib/
│   ├── types.ts                Todo, Priority, Filter, Category (readonly, strict)
│   └── hooks.ts                todoReducer (7 actions), useTodos, useRelativeTime
└── components/
    ├── TodoApp.tsx             Root composition, hydration guard, accent logic
    ├── MinimalHeader.tsx       Date display, progress bar, add trigger
    ├── UnifiedNav.tsx          Category + filter navigation in one row
    ├── InlineAddTask.tsx       Expandable input with category/priority/date controls
    ├── TaskRow.tsx             Checkbox, priority dot, inline edit, delete
    ├── EmptyState.tsx          Contextual messages per filter state
    └── UndoToast.tsx           5-second undo window after clear
```

**State management:** `useReducer` with 7 discriminated union action types — `HYDRATE`, `ADD`, `TOGGLE`, `DELETE`, `EDIT`, `CLEAR_COMPLETED`, `RESTORE_COMPLETED`

**Persistence:** localStorage with hydration guard and `normalizeTodo()` for graceful schema migration

**Testing:** Vitest with pure function extraction — tests validate both reducer logic and design constraints (regex pattern checks that banned styles are absent from source)

---

## Getting Started

```bash
git clone https://github.com/tanayvin1216/TodoListApp.git
cd TodoListApp
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npx vitest` | Run test suite |

---

## Tech Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js (App Router) | 16.2.1 |
| UI | React | 19.2.4 |
| Language | TypeScript (strict mode) | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | 12.x |
| Testing | Vitest | 4.x |
| State | useReducer + localStorage | — |
| IDs | uuid | 13.x |

---

## The Point

AI tools are generating more and more of the interfaces people use every day. The question isn't whether AI can write code — it's whether it can produce work with **taste**.

This project is evidence that with the right system around it, it can. The agent didn't need a human designer reviewing every pixel. It needed clear constraints, banned patterns, a defined aesthetic direction, and quality gates that reject mediocrity.

The code is the proof. Read it, run it, judge it.

---

## Contributing

Bug reports, feature ideas, and PRs are welcome.

---

## Contact

- **GitHub:** [@tanayvin1216](https://github.com/tanayvin1216)
- **Email:** [Vinaykya27T@ncssm.edu](mailto:Vinaykya27T@ncssm.edu)
- **Issues:** [Report a bug or request a feature](https://github.com/tanayvin1216/TodoListApp/issues)

---

<div align="center">

Built with a custom Claude Code agent system · Zero manual edits · One shot

</div>
