"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { Todo } from "@/lib/types";
import { useRelativeTime } from "@/lib/hooks";

interface TaskRowProps {
  readonly todo: Todo;
  readonly onToggle: (id: string) => void;
  readonly onDelete: (id: string) => void;
  readonly onEdit: (id: string, text: string) => void;
}

export function getPriorityColor(priority: string): string {
  const map: Record<string, string> = {
    high: "#DC2626",
    medium: "#D97706",
    low: "#0D9488",
  };
  return map[priority] ?? "#8E8E93";
}

interface EditInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSave: () => void;
  readonly onCancel: () => void;
}

function EditInput({ value, onChange, onSave, onCancel }: EditInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") onSave();
    if (event.key === "Escape") onCancel();
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={onSave}
      className="flex-1 min-w-0 bg-transparent border-none outline-none text-[15px] text-ink p-0 m-0"
    />
  );
}

export function TaskRow({ todo, onToggle, onDelete, onEdit }: TaskRowProps) {
  const timeAgo = useRelativeTime(todo.createdAt);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleTextClick() {
    setEditText(todo.text);
    setIsEditing(true);
  }

  function handleSave() {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setIsEditing(false);
  }

  return (
    <motion.div
      exit={{ opacity: 0, x: -40, transition: { duration: 0.15 } }}
      className="flex items-center gap-3 py-3 border-b border-separator hover:bg-surface-warm/50 transition-colors -mx-2 px-2 rounded-sm"
    >
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onToggle(todo.id)}
        className="task-check flex-shrink-0"
      />

      <div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: getPriorityColor(todo.priority) }}
      />

      {isEditing ? (
        <EditInput
          value={editText}
          onChange={setEditText}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <span
          onClick={handleTextClick}
          className={[
            "flex-1 min-w-0 text-[15px] cursor-text transition-colors",
            todo.isCompleted
              ? "text-ink-muted task-text-completed"
              : "text-ink",
          ].join(" ")}
        >
          {todo.text}
        </span>
      )}

      <span className="text-[12px] text-ink-faint ml-auto flex-shrink-0">
        {timeAgo}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="p-1 text-ink-faint hover:text-danger transition-colors flex-shrink-0"
        aria-label="Delete task"
      >
        <span className="text-[12px]">&times;</span>
      </button>
    </motion.div>
  );
}
