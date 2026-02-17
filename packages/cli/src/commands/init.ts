import chalk from "chalk";
import { writeFile } from "fs/promises";

const template = {
  version: "1.2",
  mode: "standard",
  deployable: false,
  missing_requirements: ["Complete all six artifacts and set deployable to true"],
  authority_boundary: {
    scope: "TODO: Define workflow scope (min 10 chars)",
    allowed_actions: ["TODO"],
    forbidden_actions: ["TODO"],
    maximum_impact: "TODO: describe",
    escalation_trigger: "TODO: when to escalate",
    quantified_limits: {
      record_limit: 0,
      data_sensitivity: "internal",
      blast_radius_metric: "TODO",
    },
  },
  ambiguity_handling: {
    what_counts_as_ambiguous: ["TODO: what counts as ambiguous"],
    routing_choice: "human_decision",
    why_this_placement: "TODO: justify routing choice (min 30 characters here)",
    what_happens_while_waiting: "TODO: freeze, partial, or do-nothing",
  },
  contest_path: {
    who_can_contest: ["TODO"],
    how_to_contest: "TODO: UI/button/process (min 10 chars)",
    what_changes_the_result: ["TODO: conditions that change outcome"],
    evidence_requirements: [{ type: "manual_review_required" as const }],
    time_to_response: "TODO",
    during_contest_behavior: "paused" as const,
    sla_consequences: { on_breach: "escalate_only" as const, escalate_to: "TODO" },
  },
  reversibility_plan: {
    safe_stop: "TODO: how to pause without cascading failure",
    commit_points: [
      { name: "TODO", what_commits_here: "TODO: final moment before irreversible action", approval_required: true },
    ],
    undo_strategy: { type: "compensation" as const, details: "TODO: rollback or compensation (min 20 chars)" },
    runaway_guardrails: ["TODO: rate limits or guardrails (min 5 chars)"],
    human_stop_authority: { who: "TODO", how: "TODO: how to stop (min 10 chars)" },
    irreversible_actions: [] as string[],
    partial_action_states: [
      {
        state_name: "TODO",
        what_is_done: "TODO: what is done (min 10)",
        what_is_reversible: "TODO: reversible part",
        what_requires_compensation: "TODO: compensation",
      },
    ],
  },
  decision_receipt: {
    plain_language: {
      what_happened: "TODO: decision + action (min 10)",
      why: "TODO: reason in plain language",
      what_it_relied_on: "TODO: inputs/sources",
      who_or_what_approved: "TODO",
      how_to_challenge: "TODO: one sentence (min 10)",
      how_to_undo_or_stop: "TODO: one sentence (min 10)",
      who_owns_outcome: "TODO",
    },
    machine_readable: {
      decision_id: "TODO12",
      timestamp: "2026-01-01T00:00:00Z",
      decision: "TODO",
      action: "TODO",
      reason_codes: ["TODO"],
      inputs_summary: "TODO: inputs summary (min 10)",
      policy_reference: "TODO",
      approval: { type: "rule_based" as const, by: "TODO" },
      contest_reference: "TODO",
      undo_reference: "TODO",
      owner_reference: "TODO",
      retention_policy: { duration: "90d", basis: "policy" },
      discovery_api: "TODO",
      export_format: "jsonl" as const,
    },
  },
  ownership_and_escalation: {
    accountable_owner: "TODO",
    escalation_rule: "TODO: precise trigger (min 10)",
    on_call_expectation: "TODO: what happens when triggered (min 10)",
    audit_cadence: "TODO",
    handoff_protocol: {
      rotation_model: "TODO: rotation model (min 5)",
      handoff_steps: ["TODO: handoff step (min 5 chars)"],
      where_recorded: "TODO: where recorded (min 5)",
    },
  },
};

export async function init(outputPath: string): Promise<number> {
  try {
    await writeFile(outputPath, JSON.stringify(template, null, 2), "utf-8");
    console.log(chalk.green(`✓ Created template at ${outputPath}`));
    console.log(chalk.blue("Next: Fill in the TODO fields and run:"));
    console.log(chalk.blue(`  safestop validate ${outputPath}`));
    return 0;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(chalk.red("Error:"), message);
    return 1;
  }
}
