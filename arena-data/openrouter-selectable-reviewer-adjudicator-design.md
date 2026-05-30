# OpenRouter Arena Design — Selectable Reviewers + Selectable Adjudicators

## Updated direction

Use OpenRouter as the single model gateway.

Only two primary reviewers are fixed:

1. OpenAI reviewer
2. Claude reviewer

The adjudicators/judges are selectable by the human from any available OpenRouter models, except the exact reviewer models used in that round.

This allows:

- OpenAI and Claude to independently improve the task prompt
- selected adjudicators to judge reviewer quality
- human-controlled model selection
- repeatable prompt refinement
- iterative build/test cycles until MADD becomes verifiably stronger across Maximo concepts

## Secret

Store only this in GitHub Actions secrets:

```text
OPENROUTER_API_KEY
```

Optional repository variables:

```text
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
ARENA_OPENAI_REVIEWER_MODEL=<selected OpenAI model id>
ARENA_CLAUDE_REVIEWER_MODEL=<selected Claude model id>
ARENA_ADJUDICATOR_MODEL_1=<human selected model id>
ARENA_ADJUDICATOR_MODEL_2=<human selected model id>
ARENA_TIEBREAKER_MODEL=<optional selected model id>
```

Never commit secrets.

## Arena loop

```text
Human enters task
→ OpenAI reviewer improves/formulates prompt
→ Claude reviewer improves/formulates prompt
→ Prompt synthesis step creates best current prompt
→ OpenAI reviewer solves/reviews using improved prompt
→ Claude reviewer solves/reviews using improved prompt
→ Human-selected adjudicators judge both reviewer outputs
→ Scoreboard declares winner or hybrid
→ Human approves build slice
→ Build/test against Maximo concept tests
→ Results become next task context
→ Repeat until MADD improves measurably
```

## Important rule

Reviewers and adjudicators are separate roles.

- OpenAI reviewer and Claude reviewer produce improved prompts and solution reviews.
- Adjudicators judge the quality of those reviews.
- Adjudicators must not be the exact same model IDs as the primary reviewers.
- Human can select adjudicators per round.
- Human remains final decision-maker.

## Human task input schema

```json
{
  "task_id": "madd-task-001",
  "title": "Improve MADD automation script root cause mode",
  "human_task": "Build MADD so it can diagnose Maximo automation script failures with evidence-first reasoning.",
  "maximo_concepts_to_test": [
    "AUTOSCRIPT",
    "SCRIPTLAUNCHPOINT",
    "BMXAA7837E",
    "MBO lifecycle",
    "psdi stack traces"
  ],
  "success_criteria": [
    "Ask for missing evidence before diagnosis",
    "Produce read-only validation checks",
    "Avoid update/delete SQL",
    "Generate test plan and rollback notes",
    "Separate assumptions from evidence"
  ],
  "human_selected_adjudicators": [
    "model-id-1",
    "model-id-2"
  ]
}
```

## Prompt improvement schema

Each reviewer first improves the human task into a stronger execution prompt.

```json
{
  "task_id": "madd-task-001",
  "actor": "openai-reviewer | claude-reviewer",
  "model": "openrouter-model-id",
  "improved_prompt": "",
  "assumptions": [],
  "missing_context_questions": [],
  "success_criteria": [],
  "risks": [],
  "test_cases_to_verify": []
}
```

## Synthesised prompt schema

```json
{
  "task_id": "madd-task-001",
  "source_prompts": ["openai", "claude"],
  "synthesised_prompt": "",
  "merged_success_criteria": [],
  "maximo_test_concepts": [],
  "human_review_required": true
}
```

## Reviewer solution schema

```json
{
  "task_id": "madd-task-001",
  "actor": "openai-reviewer | claude-reviewer",
  "model": "openrouter-model-id",
  "solution_summary": "",
  "architecture_plan": "",
  "implementation_slices": [],
  "evidence_strategy": [],
  "test_strategy": [],
  "risks": [],
  "cost_awareness": "",
  "recommended_next_build_slice": "",
  "human_review_required": true,
  "public_summary": ""
}
```

## Adjudicator score schema

```json
{
  "task_id": "madd-task-001",
  "actor": "adjudicator",
  "model": "human-selected-openrouter-model-id",
  "scores": {
    "openai-reviewer": {
      "problem_understanding": 0,
      "prompt_quality": 0,
      "maximo_domain_relevance": 0,
      "evidence_first_reasoning": 0,
      "implementation_clarity": 0,
      "testability": 0,
      "safety_governance": 0,
      "cost_awareness": 0,
      "actionability": 0,
      "public_story_usefulness": 0,
      "total": 0
    },
    "claude-reviewer": {
      "problem_understanding": 0,
      "prompt_quality": 0,
      "maximo_domain_relevance": 0,
      "evidence_first_reasoning": 0,
      "implementation_clarity": 0,
      "testability": 0,
      "safety_governance": 0,
      "cost_awareness": 0,
      "actionability": 0,
      "public_story_usefulness": 0,
      "total": 0
    }
  },
  "winner": "openai-reviewer | claude-reviewer | tie | hybrid",
  "reason": "",
  "recommended_hybrid": "",
  "human_review_required": true
}
```

## Iteration and verification loop

Each round must end with verifiable Maximo concept tests.

Examples:

1. Automation Script Root Cause
   - BMXAA7837E interpretation
   - object vs attribute launch point timing
   - MBO lifecycle reasoning
   - read-only validation checks

2. Escalation/Cron Diagnosis
   - cron instance status
   - escalation active state
   - where clause sanity
   - timezone/schedule issues

3. Integration/MIF Diagnosis
   - object structure mapping
   - endpoint and external system evidence
   - queue/message status
   - payload validation

4. Security/Access Diagnosis
   - MAXGROUP/GROUPUSER reasoning
   - applicationauth/signature option checks
   - least privilege recommendations

5. Patch/iFix Impact
   - release note parsing
   - affected app/object detection
   - retest scope generation

## Winning condition for MADD maturity

MADD improves only if the build slice passes tests.

A model does not win simply by sounding good.

A reviewer/adjudicator result is useful only if it produces:

- better prompts
- better diagnostics
- better evidence plans
- better tests
- fewer unsafe recommendations
- clearer human approval gates

## Public Arena wording

Use:

- OpenRouter-powered Arena gateway
- OpenAI reviewer
- Claude reviewer
- human-selected adjudicators
- peer-reviewed AI build loop
- verifiable Maximo concept tests

Avoid:

- official partner claims
- guaranteed diagnosis
- production support
- autonomous production changes

## Next implementation requirement

Update the Arena page and automation plan to show selectable roles:

- Reviewer 1: OpenAI reviewer
- Reviewer 2: Claude reviewer
- Adjudicator A: human selected model
- Adjudicator B: human selected model
- Optional tiebreaker: human selected model

The UI must show:

1. Human task entry
2. Reviewer prompt improvement
3. Synthesised best prompt
4. Reviewer solution round
5. Adjudicator scoring
6. Winner/hybrid declaration
7. Human approval
8. Maximo concept test results
9. Repeat loop until MADD improves
