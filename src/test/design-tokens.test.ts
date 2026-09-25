import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import resolveConfig from "tailwindcss/resolveConfig";
import defaultColors from "tailwindcss/colors";
import tailwindConfig from "../../tailwind.config";

const theme = resolveConfig(tailwindConfig).theme;
const colors = theme.colors as unknown as Record<string, unknown>;

const SRC_DIR = path.resolve(__dirname, "..");

const listSourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listSourceFiles(full);
    return /\.(ts|tsx|css)$/.test(entry.name) ? [full] : [];
  });

describe("design tokens", () => {
  it("exposes the primary color family backed by CSS variables", () => {
    expect(colors.primary).toMatchObject({
      DEFAULT: "hsl(var(--primary))",
      light: "hsl(var(--primary-light))",
      dark: "hsl(var(--primary-dark))",
    });
  });

  it("does not override Tailwind's native rose palette", () => {
    expect(colors.rose).toEqual(defaultColors.rose);
  });

  it("defines the primary CSS variables in the global stylesheet", () => {
    const css = fs.readFileSync(path.join(SRC_DIR, "index.css"), "utf8");
    expect(css).toMatch(/--primary:\s*182 20% 68%;/);
    expect(css).toMatch(/--primary-light:\s*182 35% 92%;/);
    expect(css).toMatch(/--primary-dark:\s*182 20% 58%;/);
  });

  it("has no references to the legacy rosé tokens in src/", () => {
    const offenders = listSourceFiles(SRC_DIR)
      .filter((file) => file !== __filename)
      .filter((file) => /--ros[eé]|\brose-light\b/.test(fs.readFileSync(file, "utf8")))
      .map((file) => path.relative(SRC_DIR, file));

    expect(offenders).toEqual([]);
  });
});
