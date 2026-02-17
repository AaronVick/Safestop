import { describe, it, expect } from "vitest";
import { createSafestopValidatorTool } from "../src/tools.js";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(__dirname, "../../core/__tests__/fixtures/valid-deployable.json");

describe("createSafestopValidatorTool", () => {
  it("returns Valid and deployable for valid deployable artifact", async () => {
    const tool = createSafestopValidatorTool();
    const result = await tool.invoke({ artifactPath: fixturePath });
    expect(result).toContain("Valid and deployable");
  });

  it("returns Invalid for bad path", async () => {
    const tool = createSafestopValidatorTool();
    const result = await tool.invoke({ artifactPath: "/nonexistent/file.json" });
    expect(result).toMatch(/Error:|Invalid:/);
  });
});
