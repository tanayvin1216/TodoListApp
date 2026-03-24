import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const filePath = resolve(__dirname, "UndoToast.tsx");
const source = readFileSync(filePath, "utf-8");

describe("UndoToast.tsx – requirements", () => {
  describe("module exports", () => {
    it("should export UndoToast as a named export", async () => {
      const mod = await import("./UndoToast");
      expect(typeof mod.UndoToast).toBe("function");
    });
  });

  describe("props interface", () => {
    it("should define a count prop of type number", () => {
      expect(source).toMatch(/count\s*:\s*number/);
    });

    it("should define an onUndo prop as () => void", () => {
      expect(source).toMatch(/onUndo\s*:\s*\(\s*\)\s*=>\s*void/);
    });

    it("should define an onDismiss prop as () => void", () => {
      expect(source).toMatch(/onDismiss\s*:\s*\(\s*\)\s*=>\s*void/);
    });

    it("should use readonly for all props", () => {
      expect(source).toMatch(/readonly\s+count/);
      expect(source).toMatch(/readonly\s+onUndo/);
      expect(source).toMatch(/readonly\s+onDismiss/);
    });
  });

  describe("auto-dismiss timer", () => {
    it("should import useEffect", () => {
      expect(source).toMatch(/useEffect/);
    });

    it("should use setTimeout with 5000ms", () => {
      expect(source).toMatch(/setTimeout.*5000|5000.*setTimeout/);
    });

    it("should clear the timer on cleanup via clearTimeout", () => {
      expect(source).toMatch(/clearTimeout/);
    });
  });

  describe("design constraints", () => {
    it("should use fixed bottom-6 positioning", () => {
      expect(source).toMatch(/fixed/);
      expect(source).toMatch(/bottom-6/);
    });

    it("should center horizontally with left-1/2 -translate-x-1/2", () => {
      expect(source).toMatch(/left-1\/2/);
      expect(source).toMatch(/-translate-x-1\/2/);
    });

    it("should use z-50 for layering", () => {
      expect(source).toMatch(/z-50/);
    });

    it("should use bg-ink background", () => {
      expect(source).toMatch(/bg-ink/);
    });

    it("should use subtle rounding (not pill-shaped)", () => {
      expect(source).toMatch(/rounded[ "]/);
    });

    it("should not use any shadow classes", () => {
      expect(source).not.toMatch(/shadow-/);
    });

    it("should not use any blur or glass effects", () => {
      expect(source).not.toMatch(/backdrop-blur|backdrop-filter|blur-/);
    });

    it("should not use Framer Motion", () => {
      expect(source).not.toMatch(/framer-motion/);
    });

    it("should not have entrance animation (no initial prop)", () => {
      expect(source).not.toMatch(/initial=\{\{/);
    });
  });

  describe("content", () => {
    it("should display count and cleared text", () => {
      expect(source).toMatch(/cleared/);
      expect(source).toMatch(/count/);
    });

    it("should handle singular task (count !== 1 check)", () => {
      expect(source).toMatch(/count\s*!==\s*1/);
    });

    it("should render an Undo button that calls onUndo", () => {
      expect(source).toMatch(/onClick.*onUndo|onUndo.*onClick/);
    });

    it("should label the undo button as 'Undo'", () => {
      expect(source).toMatch(/Undo/);
    });
  });
});
