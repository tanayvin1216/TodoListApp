import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, it, expect } from "vitest";

const filePath = resolve(__dirname, "UnifiedNav.tsx");
const source = readFileSync(filePath, "utf-8");

describe("UnifiedNav.tsx – file existence and structure", () => {
  it("should export UnifiedNavProps interface with all required props", () => {
    expect(source).toContain("activeCategory");
    expect(source).toContain("onCategoryChange");
    expect(source).toContain("filter");
    expect(source).toContain("onFilterChange");
    expect(source).toContain("completedCount");
    expect(source).toContain("onClearCompleted");
  });

  it("should import Filter type from @/lib/types", () => {
    expect(source).toContain('from "@/lib/types"');
    expect(source).toContain("Filter");
  });

  it("should import CATEGORIES from @/lib/types", () => {
    expect(source).toContain("CATEGORIES");
  });

  it("should define ALL_CATS derived from CATEGORIES", () => {
    expect(source).toContain("ALL_CATS");
    expect(source).toContain('"All"');
  });

  it("should export UnifiedNav function component", () => {
    expect(source).toContain("export function UnifiedNav");
  });

  it("should use px-6 py-3 layout container", () => {
    expect(source).toContain("px-6");
    expect(source).toContain("py-3");
  });
});

describe("UnifiedNav.tsx – category buttons design", () => {
  it("should use 12px font size for category buttons", () => {
    expect(source).toContain("text-[12px]");
  });

  it("should use font-semibold for active category state", () => {
    expect(source).toContain("font-semibold");
  });

  it("should use text-ink for active category color", () => {
    expect(source).toContain("text-ink");
  });

  it("should use text-ink-muted for inactive category color", () => {
    expect(source).toContain("text-ink-muted");
  });

  it("should use gap-4 between category items", () => {
    expect(source).toContain("gap-4");
  });

  it("should NOT use sliding indicator (no absolute/indicator div trick)", () => {
    expect(source).not.toContain("indicatorStyle");
    expect(source).not.toContain("setIndicatorStyle");
  });

  it("should NOT use background pills or segments for categories", () => {
    expect(source).not.toContain("bg-indigo");
    expect(source).not.toContain("bg-surface-warm");
    expect(source).not.toContain("rounded-full");
  });
});

describe("UnifiedNav.tsx – status filter design", () => {
  it("should include Active and Done filter options", () => {
    expect(source).toContain('"Active"');
    expect(source).toContain('"Done"');
  });

  it("should use 11px font size for filter buttons", () => {
    expect(source).toContain("text-[11px]");
  });

  it("should use text-ink-faint for inactive filter state", () => {
    expect(source).toContain("text-ink-faint");
  });

  it("should include a separator dot between filter options", () => {
    expect(source).toContain("·");
  });

  it("should map Active to active filter value and Done to completed", () => {
    expect(source).toContain('"active"');
    expect(source).toContain('"completed"');
  });
});

describe("UnifiedNav.tsx – clear completed button", () => {
  it("should conditionally show Clear button only with completed items and completed filter", () => {
    expect(source).toContain("completedCount");
    expect(source).toContain('"completed"');
    expect(source).toContain("Clear");
  });

  it("should use hover:text-danger on Clear button", () => {
    expect(source).toContain("hover:text-danger");
  });
});

describe("UnifiedNav.tsx – no banned patterns", () => {
  it("should NOT import framer-motion", () => {
    expect(source).not.toContain("framer-motion");
  });

  it("should NOT use motion. components", () => {
    expect(source).not.toContain("motion.");
  });

  it("should NOT use gradient text", () => {
    expect(source).not.toContain("bg-gradient");
    expect(source).not.toContain("bg-clip-text");
  });

  it("should be a use client component", () => {
    expect(source).toContain('"use client"');
  });
});
