import { describe, it, expect } from "vitest";

// Test that the module exports the expected named export
// Component rendering tests require jsdom; this project uses node environment.
// We test: module shape, and the date formatting logic used inside the component.

describe("MinimalHeader", () => {
  describe("module exports", () => {
    it("should export a MinimalHeader named export", async () => {
      const mod = await import("./MinimalHeader");
      expect(typeof mod.MinimalHeader).toBe("function");
    });
  });

  describe("formatHeaderDate", () => {
    it("should export a formatHeaderDate function", async () => {
      const mod = await import("./MinimalHeader");
      expect(typeof mod.formatHeaderDate).toBe("function");
    });

    it("should format a known date as 'Weekday, Month Day'", async () => {
      const { formatHeaderDate } = await import("./MinimalHeader");
      // March 23 2026 is a Monday
      const date = new Date(2026, 2, 23); // month is 0-indexed
      expect(formatHeaderDate(date)).toBe("Monday, March 23");
    });

    it("should format a different date correctly", async () => {
      const { formatHeaderDate } = await import("./MinimalHeader");
      // January 1 2026 is a Thursday
      const date = new Date(2026, 0, 1);
      expect(formatHeaderDate(date)).toBe("Thursday, January 1");
    });
  });

  describe("formatDoneLabel", () => {
    it("should export a formatDoneLabel function", async () => {
      const mod = await import("./MinimalHeader");
      expect(typeof mod.formatDoneLabel).toBe("function");
    });

    it("should return 'X of Y done' string", async () => {
      const { formatDoneLabel } = await import("./MinimalHeader");
      expect(formatDoneLabel(3, 10)).toBe("3 of 10 done");
    });

    it("should handle zero completed", async () => {
      const { formatDoneLabel } = await import("./MinimalHeader");
      expect(formatDoneLabel(0, 5)).toBe("0 of 5 done");
    });

    it("should handle all completed", async () => {
      const { formatDoneLabel } = await import("./MinimalHeader");
      expect(formatDoneLabel(7, 7)).toBe("7 of 7 done");
    });
  });
});
