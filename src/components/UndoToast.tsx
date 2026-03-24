"use client";

import { useEffect } from "react";

interface UndoToastProps {
  readonly count: number;
  readonly onUndo: () => void;
  readonly onDismiss: () => void;
  readonly accentColor: string;
}

export function UndoToast({ count, onUndo, onDismiss, accentColor }: UndoToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink text-white text-[12px] rounded px-4 py-2.5 flex items-center gap-3"
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      <span>{count} task{count !== 1 ? "s" : ""} cleared</span>
      <button
        onClick={onUndo}
        className="font-semibold text-white/70 hover:text-white transition-colors"
      >
        Undo
      </button>
    </div>
  );
}
