# CODEX PERMANENT MEMORY — MASReady / MADD

This file is the durable memory contract for Codex and coding agents working in this repository.

## Repository source of truth

The live MASReady website is served from:

```text
paananiruddh/masready
```

Public site:

```text
https://masready.com.au/
```

MADD public pages:

```text
https://masready.com.au/madd/
https://masready.com.au/madd-foundry/
```

## Delivery preference

Default delivery mode is direct-to-main.

Do not create PRs unless the user explicitly asks for a PR.
Do not stop at planning if the active prompt already authorises the work.
Do not ask the user to copy/paste prompts between tools.
Do not ask the user to run routine commands.

Make the change, commit to main, and report:

- commit SHA
- files changed
- public URLs to verify
- any blockers

## Feedback rule

If Codex has feedback, warnings, blockers, questions, or handoff notes, Codex MUST commit them into the repository instead of only showing them in the UI.

Write feedback to:

```text
codex-feedback/latest.md
```

Also append durable feedback to:

```text
codex-feedback/history/YYYY-MM-DD-HHMM-short-title.md
```

If `project-memory/MADD_DECISION_LOG.md` exists, also add a concise decision-log entry.

If `project-memory/MADD_PUBLIC_STORY_EVENTS.json` exists, append a public-safe event when appropriate.

## Feedback format

Use this format:

```markdown
# Codex Feedback — YYYY-MM-DD HH:MM UTC

## Task

## Status
completed | blocked | partial | needs-human-decision

## Summary

## Files changed

## Public URLs to verify

## Blockers / risks

## Decisions made

## Human action required

## Suggested next prompt
```

## Safety rules

Never commit:

- API keys
- passwords
- tokens
- customer data
- unredacted logs
- proprietary source
- private stack traces
- confidential business data

GitHub Secrets must be used for secrets.

Expected future secret names:

```text
OPENAI_API_KEY
ANTHROPIC_API_KEY
```

## Product positioning

MADD is:

- Maximo Assistant for Deep Diagnosis
- evidence-first
- human-approved
- public-build oriented
- an OverpayingForAI proof point
- designed around reusable diagnostic skill packs

MADD is not:

- production support
- guaranteed diagnosis
- official IBM/OpenAI/Anthropic product
- autonomous production AI

Allowed wording:

- OpenAI-powered collaboration
- Claude-assisted critique

Avoid:

- official OpenAI partner
- official Anthropic partner
- IBM endorsed
- guaranteed diagnosis

## Arena principle

AI does not replace judgement.
AI makes judgement visible.

The long-term Arena workflow is:

```text
Prompt → OpenAI review → Claude review → Consensus Gate → selected tool → build slice → human review → memory update → replayable story
```
