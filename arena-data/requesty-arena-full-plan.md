# Requesty-Powered MADD Arena Engine — Full Technical Plan

## Purpose

Build a public AI review sport and enterprise AI evaluation engine using Requesty as a single model gateway.

MADD is Season 1 / Experiment Zero.

The Arena will show how AI reviewers analyse the same prompt, judge each other, score outputs, declare winners, and still keep humans in control.

## Core idea

```text
Prompt enters Arena
→ OpenAI-family reviewer produces independent review
→ Claude-family reviewer produces independent review
→ Claude-family judge scores OpenAI review
→ OpenAI-family judge scores Claude review
→ Optional neutral judge/tiebreaker scores both
→ Scoreboard declares winner
→ Human approves next action
→ Story memory and public replay update
```

## Why Requesty

Use Requesty as the model gateway so the system only needs one API provider integration and one GitHub secret.

Required GitHub secret:

```text
REQUESTY_API_KEY
```

Optional GitHub repository variables or secrets:

```text
REQUESTY_BASE_URL
REQUESTY_OPENAI_REVIEW_MODEL
REQUESTY_CLAUDE_REVIEW_MODEL
REQUESTY_OPENAI_JUDGE_MODEL
REQUESTY_CLAUDE_JUDGE_MODEL
REQUESTY_TIEBREAKER_MODEL
```

Never commit API keys or secrets to the repository.

## Public positioning

Allowed wording:

- Requesty-powered model gateway
- OpenAI-family reviewer
- Claude-family reviewer
- peer-judged AI Arena
- human-approved outcome
- OpenAI-powered review style
- Claude-assisted critique style

Avoid unless officially confirmed:

- official OpenAI partner
- official Anthropic partner
- official Requesty partner
- IBM endorsed
- guaranteed diagnosis
- production support

## Tech stack

### Frontend

- GitHub Pages
- Static HTML/CSS/vanilla JavaScript
- JSON data rendered client-side
- No build step for v0.1-v0.3
- Optional later: Astro or Next.js only if static export remains simple

### Data layer

Static JSON files under:

```text
arena-data/
```

Recommended files:

```text
arena-data/current-battle.json
arena-data/events.json
arena-data/leaderboard.json
arena-data/episodes.json
arena-data/tools.json
arena-data/rubric.json
arena-data/approval-rules.json
arena-data/runs/<run-id>/openai-review.json
arena-data/runs/<run-id>/claude-review.json
arena-data/runs/<run-id>/openai-judge.json
arena-data/runs/<run-id>/claude-judge.json
arena-data/runs/<run-id>/scoreboard.json
arena-data/runs/<run-id>/public-summary.json
```

### Automation

- GitHub Actions
- Python 3.11 scripts
- Requesty API via HTTPS
- Git commit back to main for public-safe outputs

Recommended scripts:

```text
scripts/arena/requesty_client.py
scripts/arena/run_reviewers.py
scripts/arena/run_peer_judges.py
scripts/arena/scoreboard.py
scripts/arena/update_public_story.py
scripts/arena/validate_public_output.py
```

Recommended workflows:

```text
.github/workflows/prompt-queue.yml
.github/workflows/requesty-arena-run.yml
.github/workflows/arena-publish.yml
```

## Version roadmap

### v0.1 — Flashy static Arena page

Goal: Make the Arena feel like an event, not documentation.

Deliver:

- Current Battle panel
- OpenAI-family reviewer tower
- Claude-family reviewer tower
- peer judge panels
- scoreboard
- winner declaration
- tool bench
- human override panel
- replay timeline
- support CTA

Primary page:

```text
overpayingforai-arena/index.html
```

Success criteria:

- Visitor immediately understands a battle is happening.
- Page creates FOMO.
- No API dependency yet.

### v0.2 — Data-driven Arena

Goal: Render Arena page from JSON rather than hardcoded content.

Deliver:

- `arena-data/current-battle.json`
- `arena-data/leaderboard.json`
- `arena-data/events.json`
- JavaScript renderer on Arena page

Success criteria:

- Updating JSON changes page content without editing HTML.

### v0.3 — Requesty reviewer run

Goal: Run two independent reviewers through Requesty.

Deliver:

- `REQUESTY_API_KEY` used from GitHub Secrets
- `scripts/arena/run_reviewers.py`
- output JSON stored under `arena-data/runs/<run-id>/`

Reviewer rules:

- Reviewers see the prompt only.
- Reviewers do not see each other’s output.
- Each reviewer outputs strict JSON.

### v0.4 — Peer judging

Goal: Make counterpart models judge each other.

Deliver:

- Claude-family judge scores OpenAI-family review
- OpenAI-family judge scores Claude-family review
- optional neutral/tiebreaker judge
- `scoreboard.json`

Judging rules:

- Judges see original prompt and both reviews.
- Judges score the opposite reviewer.
- Judges must cite strengths and weaknesses.
- Judges cannot score themselves.

### v0.5 — Winner and human gate

Goal: Declare a winner but preserve human authority.

Deliver:

- winner calculation
- human override status
- `human_review_required: true`
- approval rules

Human override examples:

- both models missed a domain-specific risk
- both overclaimed
- tie result
- public wording risk
- customer/security claim risk

### v0.6 — Tool bench selection

Goal: Link winning review to execution tool recommendation.

Tool bench:

- Codex
- Replit
- Cursor
- Claude Code
- Gemini
- GitHub Actions

Selection criteria:

- repo edit suitability
- static site suitability
- full-stack need
- testing need
- speed
- maintainability
- risk

### v0.7 — Replay mode

Goal: Make every run replayable.

Deliver:

- event timeline from JSON
- run cards
- public summaries
- affected files
- score changes
- judge quotes

### v0.8 — Public voting and supporter loop

Goal: Visitors shape future battles.

Deliver:

- vote next Arena prompt
- submit synthetic prompt/scenario
- support link
- supporter wall
- next episode queue

Initial support link:

```text
https://buymeacoffee.com/overpayingforai
```

### v0.9 — Multi-domain Arenas

Goal: Expand beyond MADD.

Arenas:

- MADD / Maximo diagnostics
- Coding Arena
- Writing Arena
- Research Arena
- Design Arena
- Architecture Arena

### v1.0 — Full Arena Engine

Goal: Repeatable public AI evaluation and orchestration platform.

Capabilities:

- prompt queue
- Requesty model gateway
- independent reviews
- peer judging
- scoreboard
- winner declaration
- human approval
- tool bench
- memory update
- public replay
- supporter/voting loop
- multi-domain episodes

## Scoring rubric

Score each review 0-10 per category:

1. Problem understanding
2. Evidence-first reasoning
3. Architecture quality
4. Implementation clarity
5. Risk identification
6. Safety and governance
7. Cost-aware AI usage
8. Public/story usefulness
9. Domain relevance
10. Actionability

Total: 100.

## Reviewer output schema

```json
{
  "arena_run_id": "arena-001",
  "actor": "openai-family-reviewer | claude-family-reviewer",
  "model": "configured-via-requesty",
  "prompt_title": "",
  "summary": "",
  "problem_understanding": "",
  "evidence_required": [],
  "architecture_recommendation": "",
  "implementation_slices": [],
  "risks": [],
  "cost_awareness": "",
  "recommended_tool": "",
  "confidence": 0,
  "human_review_required": true,
  "public_summary": ""
}
```

## Judge output schema

```json
{
  "arena_run_id": "arena-001",
  "actor": "openai-family-judge | claude-family-judge | neutral-judge",
  "model": "configured-via-requesty",
  "target_review": "openai-family-reviewer | claude-family-reviewer",
  "scores": {
    "problem_understanding": 0,
    "evidence_first_reasoning": 0,
    "architecture_quality": 0,
    "implementation_clarity": 0,
    "risk_identification": 0,
    "safety_governance": 0,
    "cost_awareness": 0,
    "public_story_usefulness": 0,
    "domain_relevance": 0,
    "actionability": 0
  },
  "total_score": 0,
  "strengths": [],
  "weaknesses": [],
  "judge_commentary": "",
  "public_quote": "",
  "human_review_required": true
}
```

## Scoreboard schema

```json
{
  "arena_run_id": "arena-001",
  "prompt_title": "",
  "status": "judged | tie | human-review-required",
  "contestants": [
    {
      "actor": "openai-family-reviewer",
      "score": 0,
      "judged_by": "claude-family-judge",
      "badge": ""
    },
    {
      "actor": "claude-family-reviewer",
      "score": 0,
      "judged_by": "openai-family-judge",
      "badge": ""
    }
  ],
  "winner": {
    "actor": "openai-family-reviewer | claude-family-reviewer | tie | human-override",
    "score": 0,
    "reason": ""
  },
  "human_review_required": true,
  "public_summary": ""
}
```

## Requesty client pseudocode

```python
import os
import requests

REQUESTY_API_KEY = os.environ["REQUESTY_API_KEY"]
BASE_URL = os.getenv("REQUESTY_BASE_URL", "https://router.requesty.ai/v1")

def call_model(model: str, messages: list[dict], temperature: float = 0.2) -> str:
    response = requests.post(
        f"{BASE_URL}/chat/completions",
        headers={
            "Authorization": f"Bearer {REQUESTY_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": model,
            "messages": messages,
            "temperature": temperature
        },
        timeout=120
    )
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]
```

Note: Confirm the exact Requesty base URL/model naming in Requesty docs before enabling production automation.

## GitHub Actions design

Trigger:

```yaml
on:
  workflow_dispatch:
    inputs:
      prompt_file:
        description: Active prompt file
        required: true
  push:
    paths:
      - 'arena-prompts/active/**'
```

Environment:

```yaml
env:
  REQUESTY_BASE_URL: ${{ vars.REQUESTY_BASE_URL }}
  OPENAI_REVIEW_MODEL: ${{ vars.REQUESTY_OPENAI_REVIEW_MODEL }}
  CLAUDE_REVIEW_MODEL: ${{ vars.REQUESTY_CLAUDE_REVIEW_MODEL }}
```

Secrets:

```yaml
REQUESTY_API_KEY: ${{ secrets.REQUESTY_API_KEY }}
```

Output:

- `arena-data/runs/<run-id>/*.json`
- updated `arena-data/current-battle.json`
- updated `arena-data/leaderboard.json`
- updated `arena-data/events.json`
- `codex-feedback/latest.md`

## First five Arena episodes

### Episode 001 — MADD Foundry Launch

Question: Which model creates the safer and more engaging Foundry support strategy?

### Episode 002 — MADD Automation Script Root Cause Mode

Question: Which model gives the best evidence-first diagnosis architecture for Maximo automation script failures?

### Episode 003 — Prompt Pack v0.1

Question: Which model creates safer and more useful AI prompts for Maximo practitioners?

### Episode 004 — Requesty Peer-Judged Arena

Question: Which model designs the better peer-judged Arena architecture?

### Episode 005 — Replay Mode

Question: Which model designs the better public replay timeline from GitHub commits and AI reviews?

## Risks and mitigations

### Risk: The Arena looks like official model/company endorsement

Mitigation: Use family/style language and avoid logos/official partner claims.

### Risk: Judges are biased toward model family

Mitigation: Use fixed rubric, optional neutral judge, and human override.

### Risk: Scores look fake early on

Mitigation: Label early runs as demo/scaffold until API-backed scoring is live.

### Risk: Public expects support answers

Mitigation: Keep Foundry wording clear: this is not production support.

### Risk: API output commits unsafe text

Mitigation: Add public output validator and human approval categories.

## What to ask Requesty-hosted reviewers to review

Ask them to critique:

1. Architecture completeness
2. Whether peer judging is fair
3. Model selection strategy
4. Prompt injection risks
5. GitHub Actions safety
6. Public FOMO mechanics
7. JSON schema robustness
8. Cost control
9. Human approval boundaries
10. Multi-domain expansion

## Review prompt to run through Requesty

```text
You are reviewing the Requesty-powered MADD Arena Engine plan.

Goal:
Build a public AI review sport and enterprise AI evaluation engine where two independent reviewers analyse the same task, then peer judges score each review, a winner is declared, and humans approve any real-world action.

Please critique:
- architecture
- tech stack
- Requesty usage
- reviewer/judge separation
- scoring rubric
- security risks
- prompt injection risks
- GitHub Actions design
- public FOMO mechanics
- data schemas
- cost controls
- human approval boundaries
- roadmap from v0.1 to v1.0

Return:
1. strongest parts
2. weakest parts
3. missing components
4. recommended tech changes
5. schema improvements
6. better scoring method
7. safety concerns
8. implementation plan for the next 2 weeks
9. go/no-go recommendation
```
