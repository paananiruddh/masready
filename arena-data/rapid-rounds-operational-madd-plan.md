# Rapid Rounds Operational MADD Plan

## Direction

No slow public episodes. The Arena runs fast round after round until MADD becomes operational enough to include in customer demo environments such as:

```text
customer-a.masready.com.au
customer-b.masready.com.au
```

## Goal

Make MADD operational as a Maximo technical assistant through repeated AI review/adjudication/build/test loops.

## Operating model

```text
Human task
→ OpenAI reviewer improves prompt
→ Claude reviewer improves prompt
→ Synthesised best prompt
→ OpenAI reviewer solution
→ Claude reviewer solution
→ human-selected adjudicators score both
→ winning/hybrid implementation direction
→ build slice
→ test against Maximo concept checks
→ update MADD skill pack/memory
→ next round immediately
```

## Reviewer roles

Fixed reviewers:

- OpenAI reviewer
- Claude reviewer

Selectable adjudicators:

- any human-selected OpenRouter model IDs
- cannot be the exact same model IDs as reviewers in the same round

## Human gate

Default:

```json
{"human_override_required": false}
```

Escalate only for:

- tie result
- destructive or unsafe recommendation
- production/customer claim
- security/privacy issue
- public wording risk
- Maximo domain blind spot
- payment/legal/compliance wording

## Priority Maximo test domains

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

## Operational acceptance criteria

MADD can be included in customer demo environments when it can:

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
- avoid official IBM/OpenAI/Anthropic endorsement wording

## First rapid rounds

### Round 001 — Automation Script Root Cause Mode

Target:
MADD can diagnose automation script failures safely.

Concept tests:

- BMXAA7837E
- Jython/no json module
- object launch point vs attribute launch point
- MBO lifecycle
- psdi stack trace interpretation
- read-only validation checks
- rollback/test plan

### Round 002 — Escalation/Cron Diagnosis

Target:
MADD can reason about escalations and cron tasks.

Concept tests:

- cron instance disabled
- escalation inactive
- where clause wrong
- schedule/timezone issue
- site/org filtering

### Round 003 — Integration/MIF Diagnosis

Target:
MADD can guide integration troubleshooting.

Concept tests:

- object structure mismatch
- endpoint/external system config
- queue/message tracking
- payload validation

### Round 004 — Security/Access Diagnosis

Target:
MADD can reason about user/group/application access.

Concept tests:

- MAXGROUP
- GROUPUSER
- applicationauth
- signature options
- least privilege

### Round 005 — Demo embedding for Customer demo

Target:
Expose MADD widget/page inside customer demo subdomains.

Requirements:

- customer code visible
- safe demo mode
- offline fallback
- seeded scenarios
- no cross-tenant leakage
- consistent feature set for demo and prod

## Data files required

```text
arena-data/current-round.json
arena-data/rapid-rounds.json
arena-data/madd-operational-scorecard.json
arena-data/maximo-concept-tests.json
arena-data/tool-bench.json
arena-data/model-roles.json
```

## UI requirement

The public Arena should show rapid rounds, not slow episodes:

- current round
- prompt evolution
- reviewer scores
- adjudicator scores
- selected build direction
- Maximo concept test pass/fail
- MADD operational readiness percentage
- next round queue

## Customer demo requirement

Add MADD entry points for:

```text
/customer-a/madd/
/customer-b/madd/
```

or equivalent static demo routes if subdomain routing maps to the same static site.

Each demo route should show:

- customer context
- MADD status
- skill packs available
- sample questions
- offline/LLM mode explanation
- safety warning
- Maximo concept coverage

## Secret handling

Use only GitHub Secrets for API keys:

```text
OPENROUTER_API_KEY
```

Do not put keys in pages, prompts, docs, or comments.

## Immediate build priority

1. Upgrade `/overpayingforai-arena/` into Rapid Rounds Arena UI.
2. Add data JSON files.
3. Add demo MADD pages/routes for customer demo environments.
4. Build OpenRouter GitHub Action after the static UI is ready.
5. Run rapid rounds until MADD passes the operational scorecard.
