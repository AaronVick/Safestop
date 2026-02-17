# Safestop Skill for OpenClaw

This package contains the **Safestop** skill for OpenClaw. Use it to design agentic workflows that are explainable, contestable, and reversible.

## Installation

### From ClawHub (once published)

```bash
clawd skill install safestop
```

### Manual installation

1. Clone this repo.
2. Copy the `safestop/` directory to your OpenClaw skills directory:
   - Workspace: `~/clawd/skills/safestop/`
   - User-wide: `~/.openclaw/skills/safestop/`

## Usage

Ask OpenClaw:

- "Design a Safestop-compliant workflow for auto-approving vendor invoices under $5k."
- "Design an agentic workflow that triages inbound vendor invoices and can auto-approve under $5,000. Include human review, appeals, and undo."

OpenClaw will produce the six required governance artifacts: Authority Boundary, Ambiguity Handling, Contest Path, Reversibility Plan, Decision Receipt, and Ownership + Escalation.

## Examples

The `safestop/examples/` directory contains sample governance artifacts:

- `invoice-approval.json` – Invoice approval under a dollar limit
- `content-moderation.json` – Automated moderation with appeal path
- `deployment-agent.json` – Staging deployment with rollback

You can validate these with the Safestop CLI: `safestop validate safestop/examples/invoice-approval.json`.
