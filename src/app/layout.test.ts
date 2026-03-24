import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, it, expect } from "vitest";

const layoutPath = resolve(__dirname, "layout.tsx");
const cssPath = resolve(__dirname, "globals.css");

const layoutContent = readFileSync(layoutPath, "utf-8");
const cssContent = readFileSync(cssPath, "utf-8");

describe("layout.tsx", () => {
  it("should not import Instrument_Serif", () => {
    expect(layoutContent).not.toContain("Instrument_Serif");
  });

  it("should not use instrumentSerif variable in html className", () => {
    expect(layoutContent).not.toContain("instrumentSerif");
  });

  it("should still import DM_Sans", () => {
    expect(layoutContent).toContain("DM_Sans");
  });

  it("should use only dmSans.variable in html className", () => {
    expect(layoutContent).toContain("dmSans.variable");
  });
});

describe("globals.css", () => {
  it("should keep @import tailwindcss", () => {
    expect(cssContent).toContain('@import "tailwindcss"');
  });

  it("should not contain removed color tokens", () => {
    expect(cssContent).not.toContain("--color-navy:");
    expect(cssContent).not.toContain("--color-navy-mid:");
    expect(cssContent).not.toContain("--color-navy-light:");
    expect(cssContent).not.toContain("--color-surface-card:");
    expect(cssContent).not.toContain("--color-indigo-soft:");
    expect(cssContent).not.toContain("--color-teal-soft:");
  });

  it("should keep required color tokens", () => {
    expect(cssContent).toContain("--color-surface: #FAFAF8");
    expect(cssContent).toContain("--color-surface-warm: #F5F4F0");
    expect(cssContent).toContain("--color-ink: #1C1C1E");
    expect(cssContent).toContain("--color-ink-muted: #8E8E93");
    expect(cssContent).toContain("--color-ink-faint: #C7C7CC");
    expect(cssContent).toContain("--color-indigo: #4F46E5");
    expect(cssContent).toContain("--color-teal: #0D9488");
    expect(cssContent).toContain("--color-amber: #D97706");
    expect(cssContent).toContain("--color-rose: #BE185D");
    expect(cssContent).toContain("--color-danger: #DC2626");
    expect(cssContent).toContain("--color-separator: rgba(0, 0, 0, 0.06)");
  });

  it("should not contain --font-serif token", () => {
    expect(cssContent).not.toContain("--font-serif");
  });

  it("should keep --font-sans token", () => {
    expect(cssContent).toContain("--font-sans: var(--font-dm-sans)");
  });

  it("should not have overflow hidden on html or body", () => {
    expect(cssContent).not.toContain("overflow: hidden");
  });

  it("should keep .custom-scroll styles", () => {
    expect(cssContent).toContain(".custom-scroll");
  });

  it("should have simplified .task-check with monochrome checked state", () => {
    expect(cssContent).toContain(".task-check");
    expect(cssContent).toContain("border-radius: 4px");
    // checked state should use --color-ink, not --color-indigo
    expect(cssContent).toContain("background: var(--color-ink)");
  });

  it("should not contain .task-check hover using indigo", () => {
    // hover with indigo was the old style
    expect(cssContent).not.toContain("border-color: var(--color-indigo)");
  });

  it("should not contain .priority-bar styles", () => {
    expect(cssContent).not.toContain(".priority-bar");
  });

  it("should not contain @keyframes slideUp or .stagger-in", () => {
    expect(cssContent).not.toContain("@keyframes slideUp");
    expect(cssContent).not.toContain(".stagger-in");
  });

  it("should not contain .noise-bg::after styles", () => {
    expect(cssContent).not.toContain(".noise-bg");
  });

  it("should contain .progress-bar style with height 2px", () => {
    expect(cssContent).toContain(".progress-bar");
    expect(cssContent).toContain("height: 2px");
    expect(cssContent).toContain("background: var(--color-ink)");
    expect(cssContent).toContain("transition: width 0.3s ease");
  });
});
