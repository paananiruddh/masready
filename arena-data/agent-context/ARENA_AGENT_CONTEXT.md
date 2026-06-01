# OverpayingForAI Arena Agent Context Pack

## Purpose

This file is the context that should be sent to OpenRouter-powered API agents when a duel/round starts.

It keeps OpenAI reviewer, Claude reviewer, adjudicators, and future build agents aligned without relying on hidden chat memory.

## Brand hierarchy

```text
OverpayingForAI Arena = parent system
MADD = first operational track / Maximo diagnostics track
MASReady = Maximo product/demo context
```

## Current objective

Build MADD fast through rapid rounds so it can be included in:

```text
customer-a.masready.com.au
customer-b.masready.com.au
```

MADD must become operational enough to demonstrate Maximo technical assistance safely and credibly.

## Core operating loop

```text
Human task
→ OpenAI reviewer improves the prompt
→ Claude reviewer improves the prompt
→ synthesized best prompt
→ OpenAI reviewer solution
→ Claude reviewer solution
→ human-selected adjudicators score both
→ winner or hybrid direction selected
→ build slice
→ Maximo concept tests
→ update Arena memory and MADD skill packs
→ next round immediately
```

## Fixed reviewers

- OpenAI reviewer
- Claude reviewer

## Selectable adjudicators

Adjudicators are selected by the human from OpenRouter model IDs.
They must not be the exact same model IDs as the primary reviewers in that round.

## Human override policy

Default:

```json
{"human_override_required": false}
```

Override only for:

- tie result
- destructive/unsafe recommendation
- production/customer claim
- security/privacy issue
- public wording risk
- Maximo domain blind spot
- payment/legal/compliance wording

## Public safety rules

Never claim:

- official IBM/OpenAI/Anthropic/OpenRouter endorsement
- guaranteed diagnosis
- production support
- autonomous production changes

Always prefer:

- evidence-first reasoning
- read-only checks first
- human-controlled implementation
- offline skill packs where possible
- LLM calls only where useful

## Operational acceptance criteria for MADD

MADD can enter PFM/BOM demos when it can:

- answer from offline skill packs when possible
- call LLM only when needed
- ask for missing evidence before diagnosing
- never request secrets/customer data
- produce read-only validation checks first
- separate evidence, assumptions, likely root cause, validation, fix options, test plan, rollback notes
- explain Maximo concepts clearly
- support customer/tenant isolation in UI/data
- log public-safe learning events
- be disabled or run in offline mode

## First target rounds

1. Automation Script Root Cause
2. Escalation and Cron Diagnosis
3. Integration / MIF Diagnosis
4. Security / Access Diagnosis
5. Patch / iFix Impact
6. License Usage Review
7. MAS 9 Migration Readiness
8. Environment Drift
9. Work Management configuration
10. Data model / MBO relationship reasoning

## Round output expectations

Every round should produce:

- improved prompt
- solution direction
- implementation slice
- risk list
- Maximo test cases
- pass/fail concept test result
- public-safe summary
- next round recommendation

## Current secret model

Use GitHub Actions secret only:

```text
OPENROUTER_API_KEY
```

Never expose keys in static pages, prompts, docs, screenshots, public logs, or comments.
