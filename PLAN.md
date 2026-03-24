# PLAN.md

## Vision

Strip this todo app down to its structural bones. The current version has a dark hero section, circular progress ring, card-based task rows, a bottom sheet for adding tasks, and decorative animations -- all hallmarks of "vibe-coded" UI. The redesign transforms it into an architectural minimalist tool inspired by Things 3 and Linear: one continuous surface, tasks as the interface, zero decoration. Every pixel earns its place or gets cut.

## User Problem

The current UI prioritizes visual impression over usability. The hero section wastes vertical space on a phone. The FAB + bottom sheet adds friction to the most common action (adding a task). Delete is hover-only (inaccessible on touch). There is no way to edit tasks, no due dates, and no undo for destructive "Clear completed." Power users bounce because the tool feels slow; casual users bounce because it looks like every other AI-generated todo app.

## Success Metrics

- Time to add a task: from ~3 taps (FAB > type > submit) to 1 tap + type + Enter
- Touch accessibility: from 0 touch-accessible destructive actions to 100%
- Vertical space for tasks (mobile viewport): from ~55% to ~85%
- Animation count: from 8+ decorative animations to 1 functional (delete exit)
- Font families loaded: from 2 to 1
- Typography scale: from 5+ sizes to 3

## Kill Criteria

If the redesigned layout feels cramped or loses scannability on a 375px-wide viewport, revisit spacing before proceeding further.

## Acceptance Criteria

1. Zero card boundaries, zero background color changes between sections -- one continuous surface
2. Inline add-task input works: type, pick category/priority, press Enter -- no modal/sheet/FAB
3. Delete button is visible on every task row on touch devices (no hover dependency)
4. Inline editing works: tap task text to edit, Enter to save, Escape to cancel
5. Undo toast appears after "Clear completed" with a 5-second window to restore

## Scope

### In Scope
- Complete visual redesign to architectural minimalism
- Type system changes (dueDate field, edit action, undo support)
- All 7 design changes from the design director brief
- All 5 critical UX fixes
- Stripping Instrument Serif, noise textures, stagger animations, spring physics

### Explicitly Out of Scope
- Board/Kanban view mode (ViewMode type exists but is unused -- leave it)
- Drag-to-reorder tasks
- Backend/API integration
- Date picker UI for dueDate (add the field to the type and a simple native date input; no custom calendar widget)
- Dark mode
- Onboarding or tutorial flows
- PWA/offline support
- Keyboard shortcut system

## User Stories (INVEST-Compliant)

### Story 1: Stripped Foundation
As a user, I want the app to load on a single continuous surface with no hero section or dark areas, so that I see my tasks immediately without scrolling past decoration.
- Points: 3
- Priority: P1

### Story 2: Inline Task Creation
As a user, I want to type a new task directly at the top of the list and press Enter, so that adding a task is instant and frictionless.
- Points: 5
- Priority: P1

### Story 3: Flat Task Rows
As a user, I want tasks displayed as clean text rows separated by thin lines with a small priority dot, so that the interface feels like a sharp tool, not a dashboard.
- Points: 3
- Priority: P1

### Story 4: Unified Navigation
As a user, I want categories and filter (active/completed) in one navigation row, so that I can switch context without visual clutter.
- Points: 2
- Priority: P1

### Story 5: Touch-Accessible Delete
As a user on a touch device, I want a visible delete button on each task row, so that I can delete tasks without relying on hover.
- Points: 1
- Priority: P1

### Story 6: Inline Task Editing
As a user, I want to tap a task to edit its text inline, so that I can fix typos or update tasks without deleting and recreating them.
- Points: 3
- Priority: P2

### Story 7: Undo Clear Completed
As a user, I want an undo toast after clearing completed tasks, so that I can recover from accidental bulk deletion.
- Points: 3
- Priority: P2

### Story 8: Due Date Support
As a user, I want to set a due date when creating a task, so that I can track deadlines.
- Points: 2
- Priority: P2

## Steps

- [x] Step 1: Update type system and reducer -- Add `dueDate` to `Todo`, add `EDIT` and `RESTORE_COMPLETED` actions to reducer, update `useTodos` hook to expose `editTodo`, undo state, and due date handling. Files: `src/lib/types.ts`, `src/lib/hooks.ts`

- [x] Step 2: Strip global styles and layout -- Remove Instrument Serif from `layout.tsx`. Remove noise texture, stagger animations, and priority-bar styles from `globals.css`. Remove `--font-serif` and `--color-surface-card` theme tokens. Simplify checkbox to match new aesthetic. Files: `src/app/globals.css`, `src/app/layout.tsx`

- [x] Step 3: Replace HeroStats with MinimalHeader -- Delete hero section entirely. New component: date (top-left), "+" text button (top-right), and a 1px progress bar at the very top of the viewport. Inline "X of Y done" text next to date. Files: `src/components/HeroStats.tsx` (rewrite or replace with `MinimalHeader.tsx`)

- [x] Step 4: Merge CategoryTabs and FilterBar into UnifiedNav -- Single row: categories as primary text nav (no sliding indicator), small secondary "Active/Completed" toggle on the right. Kill segmented control pattern. Files: `src/components/CategoryTabs.tsx`, `src/components/FilterBar.tsx` (merge into `UnifiedNav.tsx`)

- [x] Step 5: Redesign TaskRow -- Strip card boundaries (no bg, no border, no rounded corners). Priority = 4px colored dot, not a bar. Remove category tag from row (redundant with nav). Make delete button always visible (not hover-only). Add inline edit mode (tap text to edit, Enter to save, Escape to cancel). Typography: 15px task text, 12px metadata. Files: `src/components/TaskRow.tsx`

- [x] Step 6: Convert AddTaskSheet to InlineInput -- Kill bottom sheet + FAB. Inline input at top of task list. Category and priority as small inline controls below input (dot selectors or minimal buttons). Pre-select active category. Native date input for dueDate. Files: `src/components/AddTaskSheet.tsx` (rewrite as `InlineAddTask.tsx`)

- [x] Step 7: Add UndoToast component -- Floating toast at bottom, appears after "Clear completed", shows count of cleared tasks, "Undo" button, auto-dismisses after 5 seconds. Files: new `src/components/UndoToast.tsx`

- [x] Step 8: Simplify EmptyState -- Remove geometric illustration. Text only: short message, no icon, matches new typography scale (15px/12px). Files: `src/components/EmptyState.tsx`

- [x] Step 9: Recompose TodoApp -- Wire all new components together. Remove FAB, sheet state, stagger-in class. New layout: MinimalHeader > InlineAddTask > UnifiedNav > task list > UndoToast. Strip all non-functional animations (keep only delete exit). Files: `src/components/TodoApp.tsx`

- [x] Step 10: Visual QA and polish -- Verify on 375px viewport. Check that typography uses only 3 sizes. Confirm no card boundaries, no gradients, no decorative animations remain. Test touch delete, inline edit, undo flow, due date. Run `npm run build` and `npm run lint`. Files: all

## Design Requirements

- Aesthetic direction: Architectural Minimalism (Things 3 + Linear)
- Color approach: Near-monochrome. `#FAFAF8` surface, `#1C1C1E` ink, `#8E8E93` muted. Priority colors (red/amber/teal) used only as 4px dots. Category accent colors used only in nav active state as text color, never as backgrounds.
- Typography: DM Sans only. Three sizes: 15px (task text, 400/500 weight), 12px (metadata, 400), 11px (labels/caps, 500/600). Weight differentiation replaces size differentiation.
- Animation: Functional only. Keep Framer Motion delete exit (`opacity:0, x:-60`). Kill everything else: no stagger-in, no y:8 fade, no spring physics, no animated stat counters, no layout animations on rows.
- Anti-patterns: No card boundaries. No dark hero section. No circular progress ring. No FAB. No bottom sheet. No sliding tab indicators. No noise textures. No gradient text. No Instrument Serif. No hover-only interactions.

## Token Budget

- Estimated complexity: High (full UI redesign, 10+ files, new features)
- Recommended model allocation: Sonnet for Steps 1-8 (each is a focused file change), Sonnet for Step 9 (composition), Sonnet for Step 10 (QA)
- Team mode needed: No -- steps are sequential with dependencies

## Dependencies

- Step 1 (types/hooks): None -- foundation, must go first
- Step 2 (globals/layout): None -- can parallel with Step 1
- Steps 3-8: Depend on Step 1 (new types) and Step 2 (new styles)
- Step 9: Depends on Steps 3-8 (all components ready)
- Step 10: Depends on Step 9

## Risks

- Next.js 16 breaking changes: Medium probability, High impact. Mitigation: Read `node_modules/next/dist/docs/` before modifying layout.tsx per AGENTS.md warning.
- localStorage schema migration: Low probability, Medium impact. Adding `dueDate` field to Todo means existing stored todos lack it. Mitigation: Make `dueDate` optional (`string | null`), handle missing field gracefully in hydration.
- Framer Motion removal side effects: Low probability, Low impact. Removing most animations but keeping delete exit. Mitigation: Test AnimatePresence still works with simplified motion props.
