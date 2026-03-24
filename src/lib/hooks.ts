import { useState, useCallback, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Todo, Filter, Priority } from "./types";

const STORAGE_KEY = "tasks-editorial-v1";

type TodoAction =
  | { type: "HYDRATE"; todos: readonly Todo[] }
  | { type: "ADD"; text: string; category: string; priority: Priority; dueDate: string | null }
  | { type: "TOGGLE"; id: string }
  | { type: "DELETE"; id: string }
  | { type: "CLEAR_COMPLETED" }
  | { type: "EDIT"; id: string; text: string }
  | { type: "RESTORE_COMPLETED"; todos: readonly Todo[] };

function todoReducer(state: readonly Todo[], action: TodoAction): readonly Todo[] {
  switch (action.type) {
    case "HYDRATE":
      return action.todos;
    case "ADD":
      return [
        {
          id: uuidv4(),
          text: action.text,
          isCompleted: false,
          priority: action.priority,
          createdAt: new Date().toISOString(),
          completedAt: null,
          category: action.category,
          dueDate: action.dueDate,
        },
        ...state,
      ];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
              completedAt: !todo.isCompleted ? new Date().toISOString() : null,
            }
          : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.isCompleted);
    case "EDIT":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
    case "RESTORE_COMPLETED":
      return [...action.todos, ...state];
  }
}

// Exported for unit testing only — not part of the public hook API
export { todoReducer as todoReducerForTest };

function normalizeTodo(raw: Record<string, unknown>): Todo {
  return {
    id: raw.id as string,
    text: raw.text as string,
    isCompleted: raw.isCompleted as boolean,
    priority: raw.priority as Priority,
    createdAt: raw.createdAt as string,
    completedAt: (raw.completedAt as string | null) ?? null,
    category: raw.category as string,
    dueDate: (raw.dueDate as string | null) ?? null,
  };
}

function loadFromStorage(): readonly Todo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Record<string, unknown>[];
    return parsed.map(normalizeTodo);
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [filter, setFilter] = useState<Filter>("all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [hydrated, setHydrated] = useState(false);
  const [lastCleared, setLastCleared] = useState<readonly Todo[] | null>(null);

  useEffect(() => {
    const stored = loadFromStorage();
    dispatch({ type: "HYDRATE", todos: stored });
    // Deferred to avoid synchronous setState in effect body
    queueMicrotask(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, hydrated]);

  const addTodo = useCallback(
    (text: string, category: string, priority: Priority, dueDate: string | null = null) => {
      dispatch({ type: "ADD", text, category, priority, dueDate });
    },
    []
  );

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: "TOGGLE", id });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: "DELETE", id });
  }, []);

  const editTodo = useCallback((id: string, text: string) => {
    dispatch({ type: "EDIT", id, text });
  }, []);

  const clearCompleted = useCallback((currentTodos: readonly Todo[]) => {
    const completed = currentTodos.filter((t) => t.isCompleted);
    setLastCleared(completed.length > 0 ? completed : null);
    dispatch({ type: "CLEAR_COMPLETED" });
  }, []);

  const undoClear = useCallback(() => {
    if (lastCleared) {
      dispatch({ type: "RESTORE_COMPLETED", todos: lastCleared });
    }
    setLastCleared(null);
  }, [lastCleared]);

  const dismissUndo = useCallback(() => {
    setLastCleared(null);
  }, []);

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.isCompleted) ||
      (filter === "completed" && todo.isCompleted);
    const matchesCategory =
      activeCategory === "All" || todo.category === activeCategory;
    return matchesFilter && matchesCategory;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.isCompleted).length,
    active: todos.filter((t) => !t.isCompleted).length,
    completionRate:
      todos.length > 0
        ? Math.round(
            (todos.filter((t) => t.isCompleted).length / todos.length) * 100
          )
        : 0,
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    activeCategory,
    setActiveCategory,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    editTodo,
    lastCleared,
    undoClear,
    dismissUndo,
    stats,
    isHydrated: hydrated,
  };
}

export function useRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
