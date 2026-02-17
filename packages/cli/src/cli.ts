#!/usr/bin/env node
import { Command } from "commander";
import { validate } from "./commands/validate.js";
import { init } from "./commands/init.js";
import { check } from "./commands/check.js";

const program = new Command();

program
  .name("safestop")
  .description("Governance protocol for agentic workflows")
  .version("0.1.0");

program
  .command("validate <path>")
  .description("Validate a Safestop artifact")
  .option("--require-deployable", "Exit with error if not deployable")
  .action(async (path: string, options: { requireDeployable?: boolean }) => {
    const code = await validate(path, { requireDeployable: options.requireDeployable });
    process.exit(code);
  });

program
  .command("init <path>")
  .description("Create a new Safestop artifact template")
  .action(async (path: string) => {
    const code = await init(path);
    process.exit(code);
  });

program
  .command("check <path>")
  .description("Lint and suggest improvements for a Safestop artifact")
  .action(async (path: string) => {
    const code = await check(path);
    process.exit(code);
  });

program.parse();
