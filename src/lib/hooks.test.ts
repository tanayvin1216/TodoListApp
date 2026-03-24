import { describe, it, expect } from "vitest";
import type { Todo } from "./types";

// We test the reducer directly by importing it. Because it's not exported,
// we test the observable behavior through the exported hook — but since hooks
// require React, we test the reducer logic by extracting it. For now we
// duplicate the minimal reducer call surface via dynamic import tricks.
// Instead, we test the pure functions / type contracts at the module level.

// ---------------------------------------------------------------------------
// Helper to build a minimal Todo fixture
// ---------------------------------------------------------------------------
function makeTodo(overrides: Partial<Todo> = {}): Todo {
  return {
    id: "test-id",
    text: "Buy milk",
    isCompleted: false,
    priority: "medium",
    createdAt: new Date().toISOString(),
    completedAt: null,
    category: "Personal",
    dueDate: null,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Type-level tests: dueDate field must exist on Todo
// ---------------------------------------------------------------------------
describe("Todo type", () => {
  it("should have a dueDate field of type string | null", () => {
    const todo = makeTodo();
    // dueDate defaults to null
    expect(todo.dueDate).toBeNull();

    const todoWithDate = makeTodo({ dueDate: "2026-04-01" });
    expect(todoWithDate.dueDate).toBe("2026-04-01");
  });
});

// ---------------------------------------------------------------------------
// Reducer behaviour tests via a thin re-export shim
// We call the reducer indirectly through a helper that mirrors the
// module's internal logic — this file will FAIL until we add the
// EDIT and RESTORE_COMPLETED cases.
// ---------------------------------------------------------------------------
import { todoReducerForTest } from "./hooks";

describe("todoReducer – EDIT action", () => {
  it("should update text of the matching todo and leave others untouched", () => {
    const todos: readonly Todo[] = [
      makeTodo({ id: "a", text: "Original" }),
      makeTodo({ id: "b", text: "Other" }),
    ];

    const result = todoReducerForTest(todos, {
      type: "EDIT",
      id: "a",
      text: "Updated",
    });

    expect(result[0].text).toBe("Updated");
    expect(result[1].text).toBe("Other");
  });

  it("should return a new array reference (immutability)", () => {
    const todos: readonly Todo[] = [makeTodo({ id: "a" })];
    const result = todoReducerForTest(todos, {
      type: "EDIT",
      id: "a",
      text: "Changed",
    });
    expect(result).not.toBe(todos);
  });
});

describe("todoReducer – RESTORE_COMPLETED action", () => {
  it("should prepend restored todos back into state", () => {
    const active = makeTodo({ id: "active", isCompleted: false });
    const restored = makeTodo({ id: "restored", isCompleted: true });

    const result = todoReducerForTest([active], {
      type: "RESTORE_COMPLETED",
      todos: [restored],
    });

    expect(result[0].id).toBe("restored");
    expect(result[1].id).toBe("active");
    expect(result).toHaveLength(2);
  });
});

describe("todoReducer – ADD action dueDate", () => {
  it("should include dueDate: null on newly added todos", () => {
    const result = todoReducerForTest([], {
      type: "ADD",
      text: "New task",
      category: "Work",
      priority: "low",
      dueDate: null,
    });

    expect(result[0].dueDate).toBeNull();
  });
});
