"use client";

interface EmptyStateProps {
  readonly filter: string;
}

const MESSAGES: Record<string, { title: string; sub: string }> = {
  all: { title: "No tasks yet", sub: "Type above to add one" },
  active: { title: "All done", sub: "Nothing active right now" },
  completed: { title: "Nothing completed yet", sub: "Finished tasks show up here" },
};

function GeometricAccent() {
  return (
    <svg
      width="48"
      height="1"
      viewBox="0 0 48 1"
      className="mb-4"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="0.5"
        x2="48"
        y2="0.5"
        stroke="currentColor"
        strokeWidth="1"
        className="text-ink-faint"
      />
    </svg>
  );
}

export function EmptyState({ filter }: EmptyStateProps) {
  const msg = MESSAGES[filter] ?? MESSAGES.all;

  return (
    <div className="py-16">
      <GeometricAccent />
      <p className="font-serif italic text-[20px] text-ink-muted tracking-tight">
        {msg.title}
      </p>
      <p className="text-[12px] text-ink-faint mt-2">{msg.sub}</p>
    </div>
  );
}
