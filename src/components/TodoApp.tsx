"use client";

import { AnimatePresence } from "framer-motion";
import { useTodos } from "@/lib/hooks";
import { CATEGORIES } from "@/lib/types";
import { MinimalHeader } from "./MinimalHeader";
import { UnifiedNav } from "./UnifiedNav";
import { InlineAddTask } from "./InlineAddTask";
import { TaskRow } from "./TaskRow";
import { EmptyState } from "./EmptyState";
import { UndoToast } from "./UndoToast";

function getActiveCategoryAccent(activeCategory: string): string {
  if (activeCategory === "All") return "#0D9488";
  const found = CATEGORIES.find((c) => c.name === activeCategory);
  return found?.accent ?? "#0D9488";
}

function getActiveCategoryWash(activeCategory: string): string {
  if (activeCategory === "All") return "transparent";
  const found = CATEGORIES.find((c) => c.name === activeCategory);
  return found ? `${found.accent}06` : "transparent";
}

export function TodoApp() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    activeCategory,
    setActiveCategory,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    lastCleared,
    undoClear,
    dismissUndo,
    stats,
    isHydrated,
  } = useTodos();

  if (!isHydrated) {
    return (
      <div className="h-screen flex items-center justify-center bg-surface">
        <div className="w-5 h-5 border-[1.5px] border-ink-faint border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const accentColor = getActiveCategoryAccent(activeCategory);
  const washColor = getActiveCategoryWash(activeCategory);

  return (
    <div className="h-screen flex flex-col bg-surface max-w-lg mx-auto relative">
      <div
        className="accent-top-line"
        style={{ backgroundColor: accentColor }}
      />

      <MinimalHeader
        completed={stats.completed}
        total={stats.total}
        completionRate={stats.completionRate}
        accentColor={accentColor}
        onAddClick={() => {
          const input = document.querySelector<HTMLInputElement>(
            'input[placeholder="Add a task..."]'
          );
          input?.focus();
        }}
      />

      <UnifiedNav
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        filter={filter}
        onFilterChange={setFilter}
        completedCount={stats.completed}
        onClearCompleted={() => clearCompleted(allTodos)}
      />

      <div className="border-t border-separator" />

      <div
        className="flex-1 overflow-y-auto custom-scroll px-6 pb-8 category-wash"
        style={{ backgroundColor: washColor }}
      >
        <InlineAddTask
          activeCategory={activeCategory}
          onAdd={addTodo}
          accentColor={accentColor}
        />

        {todos.length > 0 ? (
          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {todos.map((todo) => (
                <TaskRow
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState filter={filter} />
        )}
      </div>

      {lastCleared && (
        <UndoToast
          count={lastCleared.length}
          onUndo={undoClear}
          onDismiss={dismissUndo}
          accentColor={accentColor}
        />
      )}
    </div>
  );
}
