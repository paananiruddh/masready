# First Fight Start-to-Finish Plan — Rapid Round 001

## Objective

Advertise the first public Arena fight only when it produces a defensible outcome.

The first fight is not a slow episode. It is Rapid Round 001 in the OverpayingForAI Arena, focused on making MADD operational.

## Fight title

```text
Rapid Round 001: Automation Script Root Cause Mode
```

## Public hook

```text
Can AI reviewers help build a better Maximo diagnostic assistant — and can their advice survive Maximo concept tests?
```

## Round participants

Fixed reviewers:

- OpenAI reviewer
- Claude reviewer

Human-selected adjudicators:

- selected through OpenRouter
- cannot be the same exact model IDs as reviewers

Human role:

- defines task
- selects adjudicators
- reviews only if override trigger fires
- accepts/rejects final operational outcome

## Round task

```text
Improve MADD so it can safely diagnose IBM Maximo automation script failures.
```

## Required Maximo concept tests

- BMXAA7837E interpretation
- Jython / no json module issue
- object launch point vs attribute launch point
- MBO lifecycle reasoning
- psdi stack trace interpretation
- read-only validation checks
- test plan and rollback notes
- no unsafe update/delete SQL
- asks for missing evidence before diagnosis

## Start-to-finish workflow

### Step 0 — Prerequisites

Required before launch:

- `OPENROUTER_API_KEY` stored in GitHub Actions secrets
- no API keys in repo or chat
- static Rapid Rounds Arena page exists
- current round JSON exists
- concept test JSON exists
- reviewer/adjudicator schemas exist

### Step 1 — Human enters task

The human creates:

```text
arena-prompts/active/round-001-automation-script-root-cause.md
```

This contains:

- task title
- human task
- selected reviewer models
- selected adjudicator models
- success criteria
- Maximo test concepts

### Step 2 — Prompt improvement

OpenAI reviewer and Claude reviewer independently improve the prompt.

Outputs:

```text
arena-data/runs/round-001/openai-prompt-improvement.json
arena-data/runs/round-001/claude-prompt-improvement.json
```

### Step 3 — Prompt synthesis

The system creates:

```text
arena-data/runs/round-001/synthesised-prompt.json
```

This combines the best parts of both reviewer prompts.

### Step 4 — Reviewer solution round

OpenAI reviewer and Claude reviewer independently produce solution directions using the synthesised prompt.

Outputs:

```text
arena-data/runs/round-001/openai-solution.json
arena-data/runs/round-001/claude-solution.json
```

### Step 5 — Adjudication

Human-selected adjudicators score both reviewer outputs.

Outputs:

```text
arena-data/runs/round-001/adjudicator-1-score.json
arena-data/runs/round-001/adjudicator-2-score.json
arena-data/runs/round-001/scoreboard.json
```

### Step 6 — Build direction

The system selects:

- OpenAI direction
- Claude direction
- hybrid direction
- human override

Output:

```text
arena-data/runs/round-001/build-direction.json
```

### Step 7 — Maximo concept tests

The selected/hybrid direction is checked against concept tests.

Output:

```text
arena-data/runs/round-001/maximo-test-results.json
```

### Step 8 — MADD readiness update

Update:

```text
arena-data/madd-operational-scorecard.json
arena-data/current-round.json
arena-data/rapid-rounds.json
```

### Step 9 — Public result summary

Generate:

```text
arena-data/runs/round-001/public-result.md
```

Must include:

- reviewer scores
- adjudicator summary
- winner or hybrid outcome
- passed/failed Maximo concept tests
- what MADD improved
- what remains weak
- next round

### Step 10 — Advertise outcome

Advertise only after:

- scoreboard exists
- concept test result exists
- public summary exists
- unsafe/public wording review passed

## Definition of a valid public outcome

A valid outcome must answer:

- What was tested?
- Who reviewed?
- Who adjudicated?
- Who won or was hybrid selected?
- What Maximo tests passed?
- What did MADD learn/improve?
- What remains unresolved?
- What is next?

## Minimum public announcement

```text
First OverpayingForAI Arena rapid round is complete.

Task: improve MADD's Automation Script Root Cause Mode.

OpenAI reviewer and Claude reviewer independently improved the prompt, produced solution directions, and were judged by selected OpenRouter adjudicators.

Outcome: [winner/hybrid]

MADD improved on:
- BMXAA7837E interpretation
- launch point reasoning
- read-only validation checks
- test/rollback structure

Still weak on:
- [weaknesses]

Next rapid round:
Escalation and Cron Diagnosis.
```

## Important public wording

Do not say:

- MADD is production ready
- MADD guarantees diagnosis
- official IBM/OpenAI/Anthropic/OpenRouter endorsement

Say:

- MADD is improving through rapid tested rounds
- outputs are judged and checked against Maximo concepts
- humans keep override authority
- operational readiness increases only when tests pass

## Success criteria for first advertised fight

The first fight can be advertised when:

- Rapid Round 001 has a scoreboard
- at least 7/9 Automation Script concept tests pass
- MADD readiness score is updated
- public result page/summary exists
- no leaked secrets
- no overclaiming

## Fastest path

1. Build static seeded Rapid Round 001 UI now.
2. Add OpenRouter automation next.
3. Run real OpenRouter round.
4. Replace seeded data with real run data.
5. Publish first outcome.
