import { describe, it, expect } from "vitest";
import { validateArtifact } from "../src/validator.js";
import validDeployable from "./fixtures/valid-deployable.json";

describe("validateArtifact", () => {
  it("should validate a complete artifact as deployable", () => {
    const result = validateArtifact(validDeployable);
    expect(result.valid).toBe(true);
    expect(result.deployable).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it("should flag valid schema but not deployable when deployable is false", () => {
    const artifact = { ...validDeployable, deployable: false, missing_requirements: ["Complete all six artifacts"] };
    const result = validateArtifact(artifact);
    expect(result.valid).toBe(true);
    expect(result.deployable).toBe(false);
    expect(result.missingRequirements).toEqual(["Complete all six artifacts"]);
  });

  it("should return valid false and errors for invalid payload", () => {
    const artifact = { version: "1.2", mode: "standard", deployable: false };
    const result = validateArtifact(artifact);
    expect(result.valid).toBe(false);
    expect(Array.isArray(result.errors)).toBe(true);
    expect((result.errors?.length ?? 0) > 0).toBe(true);
  });
});
