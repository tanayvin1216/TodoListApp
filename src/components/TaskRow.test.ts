import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const filePath = resolve(__dirname, "TaskRow.tsx");
const source = readFileSync(filePath, "utf-8");

describe("TaskRow.tsx – redesign requirements", () => {
  describe("props interface", () => {
    it("should accept an onEdit prop", () => {
      expect(source).toMatch(/onEdit/);
    });

    it("should define onEdit as (id: string, text: string) => void", () => {
      expect(source).toMatch(/onEdit\s*:\s*\([^)]*id\s*:\s*string[^)]*text\s*:\s*string[^)]*\)\s*=>\s*void/);
    });
  });

  describe("visual design – no card boundaries", () => {
    it("should not use bg-surface-card", () => {
      expect(source).not.toMatch(/bg-surface-card/);
    });

    it("should not use rounded-r-lg or rounded-l-lg", () => {
      expect(source).not.toMatch(/rounded-[rl]-lg/);
    });

    it("should use border-b border-separator for row separation", () => {
      expect(source).toMatch(/border-b\s+border-separator/);
    });

    it("should not render category tag (no category text output in JSX)", () => {
      expect(source).not.toMatch(/todo\.category/);
    });

    it("should not render priority text label (PRIORITY_LABELS removed)", () => {
      expect(source).not.toMatch(/PRIORITY_LABELS/);
    });
  });

  describe("priority dot", () => {
    it("should use a small dot element with w-1 h-1", () => {
      expect(source).toMatch(/w-1\s+h-1/);
    });

    it("should use getPriorityColor for inline background style", () => {
      expect(source).toMatch(/getPriorityColor/);
      expect(source).toMatch(/background[\s\S]*?getPriorityColor|getPriorityColor[\s\S]*?background/);
    });
  });

  describe("delete button – always visible", () => {
    it("should not use opacity-0 or group-hover:opacity", () => {
      expect(source).not.toMatch(/opacity-0/);
      expect(source).not.toMatch(/group-hover:opacity/);
    });

    it("should render delete button without hover-reveal pattern", () => {
      // Button must be always visible — no opacity hiding
      expect(source).toMatch(/onDelete/);
    });
  });

  describe("inline editing", () => {
    it("should import useState", () => {
      expect(source).toMatch(/useState/);
    });

    it("should have isEditing state", () => {
      expect(source).toMatch(/isEditing/);
    });

    it("should have editText state", () => {
      expect(source).toMatch(/editText/);
    });

    it("should call onEdit when editing is saved", () => {
      expect(source).toMatch(/onEdit\s*\(/);
    });
  });

  describe("animation – no entrance animation", () => {
    it("should not have initial prop on motion.div", () => {
      // initial={{ opacity: 0 ... }} entrance animations are banned
      expect(source).not.toMatch(/initial=\{\{/);
    });

    it("should not have animate prop on motion.div", () => {
      expect(source).not.toMatch(/animate=\{\{/);
    });

    it("should keep exit animation", () => {
      expect(source).toMatch(/exit=\{\{/);
    });

    it("should not have layout prop", () => {
      expect(source).not.toMatch(/\blayout\b/);
    });
  });

  describe("exports", () => {
    it("should export TaskRow as a named export", async () => {
      const mod = await import("./TaskRow");
      expect(typeof mod.TaskRow).toBe("function");
    });

    it("should export getPriorityColor as a named export", async () => {
      const mod = await import("./TaskRow") as Record<string, unknown>;
      expect(typeof mod.getPriorityColor).toBe("function");
    });
  });

  describe("getPriorityColor helper", () => {
    it("should return red for high priority", async () => {
      const mod = await import("./TaskRow") as Record<string, unknown>;
      const fn = mod.getPriorityColor as (p: string) => string;
      expect(fn("high")).toBe("#DC2626");
    });

    it("should return amber for medium priority", async () => {
      const mod = await import("./TaskRow") as Record<string, unknown>;
      const fn = mod.getPriorityColor as (p: string) => string;
      expect(fn("medium")).toBe("#D97706");
    });

    it("should return teal for low priority", async () => {
      const mod = await import("./TaskRow") as Record<string, unknown>;
      const fn = mod.getPriorityColor as (p: string) => string;
      expect(fn("low")).toBe("#0D9488");
    });

    it("should return fallback for unknown priority", async () => {
      const mod = await import("./TaskRow") as Record<string, unknown>;
      const fn = mod.getPriorityColor as (p: string) => string;
      expect(fn("unknown")).toBe("#8E8E93");
    });
  });
});
