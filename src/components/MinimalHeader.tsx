"use client";

interface MinimalHeaderProps {
  readonly completed: number;
  readonly total: number;
  readonly completionRate: number;
  readonly accentColor: string;
  readonly onAddClick: () => void;
}

export function formatHeaderDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatDoneLabel(completed: number, total: number): string {
  return `${completed} of ${total} done`;
}

export function MinimalHeader({
  completed,
  total,
  completionRate,
  accentColor,
  onAddClick,
}: MinimalHeaderProps) {
  const progressWidth = `${completionRate}%`;
  const dateLabel = formatHeaderDate(new Date());
  const doneLabel = formatDoneLabel(completed, total);

  return (
    <header className="px-6 pt-10 pb-4">
      <p className="font-serif italic text-[22px] text-ink tracking-tight leading-tight">
        {dateLabel}
      </p>

      <div className="mt-3 bg-separator rounded-full overflow-hidden h-[2px]">
        <div
          className="h-[2px] rounded-full transition-[width] duration-300 ease-out"
          style={{ width: progressWidth, backgroundColor: accentColor }}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-[12px] text-ink-muted">{doneLabel}</span>
        <button
          type="button"
          onClick={onAddClick}
          className="w-7 h-7 flex items-center justify-center rounded-full text-[16px] font-medium text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: accentColor }}
          aria-label="Add task"
        >
          +
        </button>
      </div>
    </header>
  );
}
