import { describe, it, expect } from "vitest";
import { withSafestop } from "../src/middleware.js";
import { RunnableLambda } from "@langchain/core/runnables";
import { tmpdir } from "os";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync, mkdtempSync, rmSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const validPath = join(__dirname, "../../core/__tests__/fixtures/valid-deployable.json");

describe("withSafestop", () => {
  it("returns same runnable when artifact is valid and deployable", async () => {
    const agent = RunnableLambda.from((x: string) => Promise.resolve(x));
    const wrapped = withSafestop(agent, { artifact: validPath });
    const out = await wrapped.invoke("hello");
    expect(out).toBe("hello");
  });

  it("throws when artifact path is invalid", () => {
    const agent = RunnableLambda.from((x: string) => Promise.resolve(x));
    expect(() => withSafestop(agent, { artifact: "/nonexistent.json" })).toThrow();
  });

  it("throws when artifact is valid but not deployable", async () => {
    const { readFileSync } = await import("fs");
    const validArtifact = JSON.parse(readFileSync(validPath, "utf-8")) as Record<string, unknown>;
    const dir = mkdtempSync(join(tmpdir(), "safestop-mw-"));
    const path = join(dir, "gov.json");
    try {
      writeFileSync(
        path,
        JSON.stringify({ ...validArtifact, deployable: false, missing_requirements: ["Incomplete"] }),
        "utf-8"
      );
      const agent = RunnableLambda.from((x: string) => Promise.resolve(x));
      expect(() => withSafestop(agent, { artifact: path })).toThrow(/not deployable/);
    } finally {
      rmSync(dir, { recursive: true });
    }
  });
});
