import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { validateArtifact } from "@safestop/core";
import { readFile } from "fs/promises";

const SafestopValidatorSchema = z.object({
  artifactPath: z.string().describe("Path to the Safestop governance artifact JSON file"),
});

export function createSafestopValidatorTool(): DynamicStructuredTool<typeof SafestopValidatorSchema> {
  return new DynamicStructuredTool({
    name: "safestop_validator",
    description: "Validate a Safestop governance artifact for an agentic workflow. Pass the file path to the artifact JSON.",
    schema: SafestopValidatorSchema,
    func: async ({ artifactPath }): Promise<string> => {
      try {
        const content = await readFile(artifactPath, "utf-8");
        const artifact = JSON.parse(content) as unknown;
        const result = validateArtifact(artifact);

        if (result.valid && result.deployable) {
          return "Valid and deployable ✓";
        }
        if (result.valid && !result.deployable) {
          const missing = result.missingRequirements?.join(", ") ?? "see artifact";
          return `Valid schema, but not deployable. Missing: ${missing}`;
        }
        const errors = result.errors?.map((e) => e.message ?? "error").join("; ") ?? "unknown";
        return `Invalid: ${errors}`;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return `Error: ${message}`;
      }
    },
  });
}
