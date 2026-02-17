import type { Runnable } from "@langchain/core/runnables";
import { validateArtifact, type SafestopArtifact } from "@safestop/core";
import { readFileSync } from "fs";

export interface SafestopConfig {
  artifact: string | SafestopArtifact;
  enforceQuantifiedLimits?: boolean;
  logReceiptsTo?: string;
}

/**
 * Wraps an agent (or any Runnable) with Safestop: loads and validates the governance
 * artifact at construction time. If invalid or not deployable, throws.
 * Runtime enforcement of quantified limits can be added in a future version.
 */
export function withSafestop<T extends Runnable>(agent: T, config: SafestopConfig): T {
  const artifact: SafestopArtifact =
    typeof config.artifact === "string"
      ? (JSON.parse(readFileSync(config.artifact, "utf-8")) as SafestopArtifact)
      : config.artifact;

  const validation = validateArtifact(artifact);
  if (!validation.valid) {
    const messages = validation.errors?.map((e) => `${e.instancePath}: ${e.message}`).join("; ");
    throw new Error(`Safestop artifact invalid: ${messages ?? "validation failed"}`);
  }
  if (!validation.deployable) {
    const missing = validation.missingRequirements?.join(", ") ?? "not deployable";
    throw new Error(`Safestop artifact not deployable: ${missing}`);
  }

  return agent;
}
