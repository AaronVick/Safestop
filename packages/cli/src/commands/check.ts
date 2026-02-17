import { validateArtifact } from "@safestop/core";
import chalk from "chalk";
import { readFile } from "fs/promises";

export async function check(path: string): Promise<number> {
  try {
    const content = await readFile(path, "utf-8");
    const artifact = JSON.parse(content) as unknown;
    const result = validateArtifact(artifact);

    if (result.valid && result.deployable) {
      console.log(chalk.green("✓ Valid and deployable"));
      return 0;
    }

    if (result.valid && !result.deployable) {
      console.log(chalk.yellow("⚠ Valid schema, but not deployable"));
      if (result.missingRequirements?.length) {
        console.log(chalk.yellow("Suggestions:"));
        result.missingRequirements.forEach((req) => {
          console.log(chalk.yellow(`  - Address: ${req}`));
        });
      }
      return 1;
    }

    console.log(chalk.red("✗ Invalid artifact"));
    result.errors?.forEach((err) => {
      const p = err.instancePath || "(root)";
      console.log(chalk.red(`  ${p}: ${err.message ?? "validation error"}`));
    });
    return 1;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(chalk.red("Error:"), message);
    return 1;
  }
}
