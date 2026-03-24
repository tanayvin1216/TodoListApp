export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "active" | "completed";
export type ViewMode = "list" | "board";

export interface Todo {
  readonly id: string;
  readonly text: string;
  readonly isCompleted: boolean;
  readonly priority: Priority;
  readonly createdAt: string;
  readonly completedAt: string | null;
  readonly category: string;
  readonly dueDate: string | null;
}

export interface TodoCategory {
  readonly name: string;
  readonly accent: string;
  readonly muted: string;
}

export const CATEGORIES: readonly TodoCategory[] = [
  { name: "Personal", accent: "#4F46E5", muted: "#EEF2FF" },
  { name: "Work", accent: "#0D9488", muted: "#F0FDFA" },
  { name: "Health", accent: "#D97706", muted: "#FFFBEB" },
  { name: "Ideas", accent: "#BE185D", muted: "#FDF2F8" },
] as const;

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "Urgent",
} as const;
