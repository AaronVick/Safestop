---
name: safestop
description: Turn agentic workflow ideas into deployable, contestable designs (bounds, safe stops, appeals, receipts, ownership).
version: 0.1.0
homepage: https://github.com/AaronVick/safestop
user-invocable: true
metadata:
  openclaw:
    emoji: "🧾"
    permissions:
      version: 1
      declared_purpose: "Force agentic workflow proposals to include bounded authority, ambiguity handling, contestability, reversibility, receipts, and accountable ownership."
      filesystem: []
      network: []
      env: []
      exec: []
---

# Safestop

**Make agents you can actually turn off.**

Agentic systems do not just compute; they interpret intent, form plans, call tools, and execute actions. This skill makes sure every proposed workflow preserves the institution's ability to **pause, challenge, correct, and recover** without breaking operations.

Use this skill whenever you:
- propose an agentic workflow or automation,
- redesign a human-in-the-loop process,
- specify approvals / routing / "auto" decisions,
- write an implementation plan for a tool-using agent.

## The rule

If the workflow cannot be **explained**, **challenged**, and **reversed (or safely stopped)**, it is not ready to deploy.

## How to use (required output)

When asked to design or evaluate an agentic workflow, produce **exactly these six artifacts**, in this order, with the headings as written:

1) **Authority Boundary**
2) **Ambiguity Handling**
3) **Contest Path**
4) **Reversibility Plan**
5) **Decision Receipt (Plain Language)**
6) **Ownership + Escalation**

Do not skip sections. Do not merge sections.

---

## 1) Authority Boundary

Define what the system is allowed to do, and what it is not allowed to do.

Required fields:
- **Scope**: what domain / workflow step(s) it covers
- **Allowed actions**: what it may execute
- **Forbidden actions**: what it must never do
- **Maximum impact**: the highest-stakes action it can take without escalation
- **Trigger to escalate**: the condition that forces human decision

Write this so an executive can approve it.

---

## 2) Ambiguity Handling

Ambiguity is not "solved"; it is routed. Choose where uncertain cases go.

Required fields:
- **What counts as ambiguous** (examples)
- **Routing choice** (one of: tighten rules / request more evidence / human decision / safe defer)
- **Why this placement** (one paragraph)
- **What the system does while waiting** (freeze, partial action, or do-nothing)

Never pretend ambiguity is resolved. If you cannot justify the routing, route to a human.

---

## 3) Contest Path

Design a real path to "no" that can change outcomes.

Required fields:
- **Who can contest** (roles)
- **How they contest** (UI/button/process; one sentence)
- **What evidence changes the result** (clear conditions)
- **Time-to-response** (target)
- **What happens during contest** (paused, reversible partial, or held)

If contest cannot change the result, it is only a complaint box. Say so explicitly.

---

## 4) Reversibility Plan

Assume the system will be wrong at high velocity. Define how you stop and recover.

Required fields:
- **Safe stop**: how to pause execution without cascading failure
- **Commit point**: the final moment before an irreversible or high-impact action
- **Undo strategy**: direct rollback (if possible), or compensation (how to repair after downstream effects)
- **Rate limits / runaway guardrails**: what prevents loops or mass actions
- **Human stop authority**: who can stop it, and how

If an action is irreversible, mark it and require explicit human approval before the commit point.

---

## 5) Decision Receipt (Plain Language)

This is not a debug log. It is a readable record a non-developer can understand.

Always output a sample receipt with these fields:
- **What happened** (decision + action)
- **Why it happened** (reason in plain language)
- **What it relied on** (inputs/sources at a high level)
- **Who/what approved it** (human or rule)
- **How to challenge it** (one sentence)
- **How to undo or stop further impact** (one sentence)
- **Who owns the outcome** (name/role)

Keep it short. Avoid model jargon.

---

## 6) Ownership + Escalation

Name responsibility and define the escalation boundary.

Required fields:
- **Accountable owner** (role; specific team)
- **Escalation rule** (the precise trigger)
- **On-call / response expectation** (what happens when triggered)
- **Audit cadence** (how often performance + failures are reviewed)

---

# Modes (choose based on the request)

## Mode A — Builder / Systems Designer

Add an additional section after the six artifacts:

7) **Implementation Notes**
- key interfaces (inputs/outputs),
- where approvals live,
- where stop/undo lives,
- what to log as "receipts" at runtime,
- failure modes you expect.

## Mode B — Chief of Staff

Add an additional section after the six artifacts:

7) **Executive Brief**
- decision: pilot / don't pilot / needs redesign,
- top 3 risks,
- what must be true before scale,
- who must sign off.

---

# Acceptance checks (self-test)

Before finalizing, verify:
- boundaries are explicit and enforceable,
- ambiguous cases have a declared routing,
- contestation can change outcomes,
- safe stop exists and is usable,
- receipt is understandable to non-devs,
- a named owner exists for outcomes.

If any check fails, return: **"Not deployable yet"** and list exactly what is missing.

---

# Example prompt (for users)

"Design a Safestop-compliant workflow that triages inbound vendor invoices and can auto-approve under $5,000. Include human review, appeals, and undo."

Your response must follow the six artifacts, then Mode A or B if asked.
