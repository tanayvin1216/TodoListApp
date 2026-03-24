import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const filePath = resolve(__dirname, "EmptyState.tsx");
const source = readFileSync(filePath, "utf-8");

describe("EmptyState.tsx – simplified text-only redesign", () => {
  describe("no illustrations or decorative elements", () => {
    it("should not contain any SVG elements", () => {
      expect(source).not.toMatch(/<svg/);
    });

    it("should not contain the geometric box illustration", () => {
      expect(source).not.toMatch(/rotate-6/);
      expect(source).not.toMatch(/-rotate-3/);
    });

    it("should not import or use framer-motion", () => {
      expect(source).not.toMatch(/framer-motion/);
    });
  });

  describe("container layout", () => {
    it("should use py-16 container", () => {
      expect(source).toMatch(/py-16/);
    });

    it("should not use py-20", () => {
      expect(source).not.toMatch(/py-20/);
    });
  });

  describe("typography", () => {
    it("should use text-[15px] for title", () => {
      expect(source).toMatch(/text-\[15px\]/);
    });

    it("should use text-ink-muted for title", () => {
      expect(source).toMatch(/text-ink-muted/);
    });

    it("should use text-[12px] for subtitle", () => {
      expect(source).toMatch(/text-\[12px\]/);
    });

    it("should use text-ink-faint for subtitle", () => {
      expect(source).toMatch(/text-ink-faint/);
    });

    it("should use mt-1 gap between title and subtitle", () => {
      expect(source).toMatch(/mt-1/);
    });
  });

  describe("message content", () => {
    it("should use MESSAGES constant (uppercase)", () => {
      expect(source).toMatch(/MESSAGES/);
    });

    it("should have 'No tasks yet' for all filter", () => {
      expect(source).toMatch(/No tasks yet/);
    });

    it("should have 'Type above to add one' as subtitle for all filter", () => {
      expect(source).toMatch(/Type above to add one/);
    });

    it("should have 'All done' for active filter", () => {
      expect(source).toMatch(/All done/);
    });

    it("should have 'Nothing active right now' as subtitle for active filter", () => {
      expect(source).toMatch(/Nothing active right now/);
    });

    it("should have 'Nothing completed yet' for completed filter", () => {
      expect(source).toMatch(/Nothing completed yet/);
    });

    it("should have 'Finished tasks show up here' as subtitle for completed filter", () => {
      expect(source).toMatch(/Finished tasks show up here/);
    });
  });

  describe("exports", () => {
    it("should export EmptyState as a named export", async () => {
      const mod = await import("./EmptyState");
      expect(typeof mod.EmptyState).toBe("function");
    });
  });
});
