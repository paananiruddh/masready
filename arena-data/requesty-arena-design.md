# Requesty Arena Design — Peer-Judged Review Battle

## Change

Use Requesty as the single model gateway instead of separate OpenAI and Anthropic API integrations.

## Secret

Store only one gateway key in GitHub Actions secrets:

```text
REQUESTY_API_KEY
```

Optional configuration secrets/variables:

```text
REQUESTY_BASE_URL
REQUESTY_OPENAI_REVIEW_MODEL
REQUESTY_CLAUDE_REVIEW_MODEL
REQUESTY_OPENAI_JUDGE_MODEL
REQUESTY_CLAUDE_JUDGE_MODEL
REQUESTY_TIEBREAKER_MODEL
```

Do not store API keys in repository files.

## Arena concept

The Arena has two independent primary reviewers:

1. OpenAI-powered Review
2. Claude-assisted Critique

Both review the same task prompt independently.

Then their peer counterparts judge the quality of those reviews:

- OpenAI Judge scores Claude-assisted Critique
- Claude Judge scores OpenAI-powered Review

A final scoreboard combines:

- architecture quality
- evidence planning
- risk awareness
- implementation clarity
- cost awareness
- safety / no-overclaiming
- public storytelling usefulness
- peer challenge quality

The winner is declared by highest total score.

## Why this is better

This is more interesting than simple consensus.

It creates FOMO because visitors can watch:

```text
Prompt enters Arena
→ OpenAI reviews
→ Claude reviews
→ OpenAI judges Claude
→ Claude judges OpenAI
→ scoreboard updates
→ winner declared
→ human decides next action
```

## Rules

- Reviewers must not see each other's output before producing their first review.
- Judges may see the original prompt and both reviews.
- Judges score the opposite reviewer, not themselves.
- Final winner is based on rubric score, not brand preference.
- Human can override or mark result as inconclusive.
- All public output must avoid official endorsement wording.

## Score rubric

Each category is scored 0-10:

1. Problem understanding
2. Evidence-first reasoning
3. Architecture quality
4. Implementation clarity
5. Risk identification
6. Safety and governance
7. Cost-aware AI usage
8. Public/story usefulness
9. Maximo/domain relevance
10. Actionability

Total score out of 100.

## Output JSON

```json
{
  "arena_run_id": "arena-001",
  "prompt_title": "Build MADD Automation Script Root Cause Mode",
  "reviewers": {
    "openai": {
      "model": "configured-via-requesty",
      "summary": "",
      "score_from_claude_judge": 0
    },
    "claude": {
      "model": "configured-via-requesty",
      "summary": "",
      "score_from_openai_judge": 0
    }
  },
  "winner": {
    "actor": "openai | claude | tie | human-review",
    "score": 0,
    "reason": ""
  },
  "human_review_required": true,
  "public_summary": ""
}
```

## Public positioning

Use:

- Requesty-powered model gateway
- OpenAI-powered Review
- Claude-assisted Critique
- peer-judged Arena
- human-approved outcome

Avoid:

- official OpenAI partner
- official Anthropic partner
- official Requesty partner unless explicitly confirmed
- guaranteed diagnosis
- production support
