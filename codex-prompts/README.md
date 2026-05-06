# Codex Prompts

This folder stores reusable, versioned prompts for Codex and other coding agents working on the MASReady / MADD public site.

## How to use

1. Read `codex-prompts/CODEX_SYSTEM_INSTRUCTIONS.md` first.
2. Pick the relevant prompt from `codex-prompts/active/`.
3. Execute the task in a small controlled slice.
4. After completion, write a short entry to `project-memory/MADD_DECISION_LOG.md` or `project-memory/MADD_PUBLIC_STORY_EVENTS.json` if those files exist.
5. Never store secrets, customer data, private logs, or proprietary source in this repository.

## Naming convention

Use:

```text
YYYY-MM-DD-short-task-name.md
```

Example:

```text
2026-05-06-madd-foundry-supporter-pages.md
```

## Trigger convention

When a new prompt is added under `codex-prompts/active/`, Codex or a human should treat it as a work request.

Prompts moved to `codex-prompts/completed/` are historical records.
