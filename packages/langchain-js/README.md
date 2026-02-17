# @safestop/langchain

LangChain integration for Safestop: validation tool and enforcement wrapper for agentic workflows.

## Install

```bash
npm install @safestop/langchain @langchain/core
```

## Usage

### Validation tool

Use the validator as a LangChain tool so agents can check governance artifacts:

```ts
import { createSafestopValidatorTool } from "@safestop/langchain";

const tool = createSafestopValidatorTool();
const result = await tool.invoke({ artifactPath: "./governance/invoice-approval.json" });
// "Valid and deployable ✓" or error message
```

### Middleware

Wrap an agent with Safestop so it only runs when the artifact is valid and deployable:

```ts
import { withSafestop } from "@safestop/langchain";

const agent = /* your LangChain agent or runnable */;
const wrapped = withSafestop(agent, {
  artifact: "./governance/invoice-approval.json",
  enforceQuantifiedLimits: true,
  logReceiptsTo: "postgres://receipts-db",
});
// Throws if artifact invalid or not deployable; returns same runnable
```

Runtime enforcement of quantified limits (e.g. money_limit, record_limit) can be added in a future version.
