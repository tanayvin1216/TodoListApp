"use client";

import { useState, useRef, useCallback } from "react";
import type { Priority } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface InlineAddTaskProps {
  readonly activeCategory: string;
  readonly accentColor: string;
  readonly onAdd: (
    text: string,
    category: string,
    priority: Priority,
    dueDate: string | null
  ) => void;
}

const PRIORITIES: { key: Priority; label: string }[] = [
  { key: "low", label: "Low" },
  { key: "medium", label: "Med" },
  { key: "high", label: "Urgent" },
];

function resolveDefaultCategory(activeCategory: string): string {
  if (activeCategory === "All") return CATEGORIES[0].name;
  return activeCategory;
}

function CategoryDots({
  category,
  onSelect,
}: {
  readonly category: string;
  readonly onSelect: (name: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {CATEGORIES.map((cat) => {
        const isActive = category === cat.name;
        return (
          <button
            key={cat.name}
            type="button"
            onClick={() => onSelect(cat.name)}
            className="flex items-center gap-1.5"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: isActive ? cat.accent : "transparent",
                border: isActive ? "none" : `1.5px solid ${cat.accent}`,
              }}
            />
            {isActive && (
              <span className="text-[11px] text-ink-muted">{cat.name}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function PrioritySelector({
  priority,
  onSelect,
}: {
  readonly priority: Priority;
  readonly onSelect: (p: Priority) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {PRIORITIES.map((p) => {
        const isActive = priority === p.key;
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => onSelect(p.key)}
            className={`text-[11px] transition-colors ${
              isActive ? "text-ink font-medium" : "text-ink-faint"
            }`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}

function DueDateInput({
  dueDate,
  onChange,
}: {
  readonly dueDate: string | null;
  readonly onChange: (value: string | null) => void;
}) {
  return (
    <input
      type="date"
      value={dueDate ?? ""}
      onChange={(e) => onChange(e.target.value || null)}
      className="text-[11px] text-ink-faint bg-transparent outline-none border-none"
    />
  );
}

export function InlineAddTask({ activeCategory, accentColor, onAdd }: InlineAddTaskProps) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState<string>(() =>
    resolveDefaultCategory(activeCategory)
  );
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showControls = isFocused || text.length > 0;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const trimmed = text.trim();
        if (!trimmed) return;
        onAdd(trimmed, category, priority, dueDate);
        setText("");
        setDueDate(null);
      } else if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    },
    [text, category, priority, dueDate, onAdd]
  );

  const wrapClass = [
    "pb-4 border-b border-separator relative",
    "add-input-wrap",
    isFocused ? "is-focused" : "",
  ].join(" ");

  return (
    <div
      className={wrapClass}
      style={{ "--accent-underline": accentColor } as React.CSSProperties}
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Add a task..."
        className="text-[15px] text-ink placeholder:text-ink-faint bg-transparent outline-none w-full pt-4"
      />
      {showControls && (
        <div className="mt-2 flex items-center gap-4">
          <CategoryDots category={category} onSelect={setCategory} />
          <PrioritySelector priority={priority} onSelect={setPriority} />
          <DueDateInput dueDate={dueDate} onChange={setDueDate} />
        </div>
      )}
    </div>
  );
}
