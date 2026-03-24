# LEARNINGS.md

## Initial Observations

- The app uses a `useReducer` pattern with discriminated unions for actions -- clean foundation, easy to extend with EDIT and RESTORE_COMPLETED actions
- localStorage persistence is already handled with hydration guard (`isHydrated`) -- adding `dueDate` as optional field means no migration needed, just handle `undefined` gracefully
- Framer Motion is used heavily: layout animations on every TaskRow, spring physics on the bottom sheet, animated SVG circle in hero, stagger-in CSS animations. Most of this gets cut but the dependency stays for delete exit animation
- `ViewMode` type exists in types.ts but is never used anywhere -- leave it alone per scope
- The AGENTS.md warns about Next.js 16 breaking changes and points to `node_modules/next/dist/docs/` -- must read before touching layout.tsx
- No test files exist anywhere in the project -- testing rules apply to new code but there is no test infrastructure to build on
- CategoryTabs uses DOM measurement (`offsetLeft`, `offsetWidth`) for the sliding indicator -- all of this gets deleted in the merge to UnifiedNav
- AddTaskSheet always defaults to `CATEGORIES[0].name` ("Personal") -- the redesign should pre-select the active category from UnifiedNav instead
- Delete button uses `opacity-0 group-hover:opacity-100` -- completely inaccessible on touch devices, confirmed UX issue
- The `clearCompleted` action in the reducer is destructive with no recovery path -- undo requires storing the cleared todos temporarily

## Mistakes Log

### Step 1
- `clearCompleted` was changed to accept `currentTodos: readonly Todo[]` so it can snapshot completed todos for undo. The existing `FilterBar` component typed `onClearCompleted: () => void` — the fix was to wrap the call at the `TodoApp` level: `() => clearCompleted(allTodos)`. This keeps the component prop signature unchanged while giving the hook what it needs.
- No test runner existed in the project. Installed vitest and added `vitest.config.ts`. Tests co-located at `src/lib/hooks.test.ts`.
- `todoReducer` is private by default in the module. Exported it under the alias `todoReducerForTest` to test pure reducer logic without needing React hooks. This avoids the complexity of `renderHook` and jsdom setup for logic-only tests.

## Pattern Library

### Step 3 — MinimalHeader
- Node test environment cannot render React components. Extract pure helper functions (`formatHeaderDate`, `formatDoneLabel`) and export them so logic can be tested without jsdom.
- Component tests in node env focus on: module exports exist (typeof === "function"), and pure function behavior. This keeps the test meaningful without a full DOM setup.
