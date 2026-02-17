import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { validate } from "../src/commands/validate.js";
import { init } from "../src/commands/init.js";
import { check } from "../src/commands/check.js";
import { readFile, mkdtemp, rm } from "fs/promises";
import { tmpdir } from "os";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(__dirname, "../../core/__tests__/fixtures/valid-deployable.json");

describe("validate", () => {
  it("returns 0 for valid deployable artifact", async () => {
    const code = await validate(fixturePath, {});
    expect(code).toBe(0);
  });

  it("returns 1 when --require-deployable and not deployable", async () => {
    const dir = await mkdtemp(join(tmpdir(), "safestop-cli-"));
    const path = join(dir, "gov.json");
    try {
      await init(path);
      const code = await validate(path, { requireDeployable: true });
      expect(code).toBe(1);
    } finally {
      await rm(dir, { recursive: true });
    }
  });
});

describe("init", () => {
  let dir: string;
  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), "safestop-init-"));
  });
  afterEach(async () => {
    await rm(dir, { recursive: true }).catch(() => {});
  });

  it("creates a file that validates as valid schema", async () => {
    const path = join(dir, "governance.json");
    const code = await init(path);
    expect(code).toBe(0);
    const content = await readFile(path, "utf-8");
    const artifact = JSON.parse(content);
    expect(artifact.version).toBe("1.2");
    expect(artifact.deployable).toBe(false);
    const checkCode = await validate(path, {});
    expect(checkCode).toBe(0);
  });
});

describe("check", () => {
  it("returns 0 for valid deployable artifact", async () => {
    const code = await check(fixturePath);
    expect(code).toBe(0);
  });

  it("returns 1 for invalid artifact", async () => {
    const dir = await mkdtemp(join(tmpdir(), "safestop-check-"));
    const path = join(dir, "bad.json");
    try {
      await require("fs/promises").writeFile(path, '{"version":"1.2","deployable":false}', "utf-8");
      const code = await check(path);
      expect(code).toBe(1);
    } finally {
      await rm(dir, { recursive: true }).catch(() => {});
    }
  });
});
