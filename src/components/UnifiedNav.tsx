"use client";

import { CATEGORIES } from "@/lib/types";
import type { Filter } from "@/lib/types";

const ALL_CATS = ["All", ...CATEGORIES.map((c) => c.name)];

interface UnifiedNavProps {
  readonly activeCategory: string;
  readonly onCategoryChange: (category: string) => void;
  readonly filter: Filter;
  readonly onFilterChange: (filter: Filter) => void;
  readonly completedCount: number;
  readonly onClearCompleted: () => void;
}

type StatusButton = {
  readonly label: string;
  readonly value: "active" | "completed";
};

const STATUS_BUTTONS: readonly StatusButton[] = [
  { label: "Active", value: "active" },
  { label: "Done", value: "completed" },
];

function handleFilterToggle(
  current: Filter,
  clicked: "active" | "completed",
  onFilterChange: (filter: Filter) => void,
): void {
  onFilterChange(current === clicked ? "all" : clicked);
}

function getCategoryAccent(name: string): string | undefined {
  return CATEGORIES.find((c) => c.name === name)?.accent;
}

export function UnifiedNav({
  activeCategory,
  onCategoryChange,
  filter,
  onFilterChange,
  completedCount,
  onClearCompleted,
}: UnifiedNavProps) {
  const showClear = completedCount > 0 && filter === "completed";

  return (
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        {ALL_CATS.map((cat) => {
          const isActive = activeCategory === cat;
          const accent = getCategoryAccent(cat);
          const activeStyle = isActive && accent
            ? { color: accent }
            : undefined;

          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={[
                "text-[12px] min-h-[32px] transition-colors",
                isActive
                  ? "font-semibold"
                  : "font-medium text-ink-muted",
                isActive && !accent ? "text-ink" : "",
              ].join(" ")}
              style={activeStyle}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        {STATUS_BUTTONS.map((btn, index) => {
          const isActive = filter === btn.value;
          return (
            <span key={btn.value} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-[11px] text-ink-faint select-none">·</span>
              )}
              <button
                onClick={() =>
                  handleFilterToggle(filter, btn.value, onFilterChange)
                }
                className={[
                  "text-[11px] min-h-[32px]",
                  isActive ? "text-ink-muted" : "text-ink-faint",
                ].join(" ")}
              >
                {btn.label}
              </button>
            </span>
          );
        })}

        {showClear && (
          <>
            <span className="text-[11px] text-ink-faint select-none">·</span>
            <button
              onClick={onClearCompleted}
              className="text-[11px] min-h-[32px] text-ink-faint hover:text-danger transition-colors"
            >
              Clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}
