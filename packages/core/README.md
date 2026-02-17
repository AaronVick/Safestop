# @safestop/core

Schema, validator, and TypeScript types for Safestop governance artifacts (v1.2).

## Install

```bash
npm install @safestop/core
```

## Usage

```ts
import { validateArtifact, type SafestopArtifact } from "@safestop/core";

const artifact: SafestopArtifact = { /* ... */ };
const result = validateArtifact(artifact);

if (result.valid && result.deployable) {
  console.log("Ready to deploy");
} else if (result.valid) {
  console.log("Missing:", result.missingRequirements);
} else {
  console.error("Validation errors:", result.errors);
}
```

## API

- **validateArtifact(artifact)** – Validates against the v1.2 JSON Schema. Returns `{ valid, errors?, deployable?, missingRequirements? }`.
- **SafestopArtifact** – TypeScript type for a valid artifact (generated from the schema).

## Schema

The canonical schema is in `schema/v1.2.json` and is included in the package.
