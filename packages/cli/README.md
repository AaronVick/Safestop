# @safestop/cli

Command-line tool for validating, scaffolding, and linting Safestop governance artifacts.

## Install

```bash
npm install @safestop/cli
```

## Commands

- **safestop validate &lt;path&gt;** – Validate an artifact against the v1.2 schema. Use `--require-deployable` to fail when not deployable.
- **safestop init &lt;path&gt;** – Create a new artifact template (e.g. `governance.json`).
- **safestop check &lt;path&gt;** – Lint and suggest improvements; exits 1 if invalid or not deployable.

## Example

```bash
safestop init governance.json
# Edit governance.json ...
safestop validate governance.json --require-deployable
```
