# Security Notice — OpenRouter Key Rotation Required

A secret-like OpenRouter API key was pasted into chat during MADD Arena setup.

## Required action

1. Revoke/rotate that key in OpenRouter immediately.
2. Create a new key.
3. Store the new key only in GitHub Actions secrets.

## GitHub secret name

```text
OPENROUTER_API_KEY
```

## Never commit secrets

Do not store API keys in repository files, prompts, docs, screenshots, public pages, or comments.

## Arena configuration

The MADD Arena should use OpenRouter through GitHub Actions or backend/server-side automation only. Static GitHub Pages must never expose the API key client-side.

## Current Arena direction

- Human enters task first.
- OpenAI reviewer and Claude reviewer improve/formulate the task prompt independently.
- A best prompt is synthesized.
- OpenAI reviewer and Claude reviewer then produce solution/review outputs.
- Human-selected adjudicators judge the reviewer outputs.
- Reviewers and adjudicators must be selectable via OpenRouter model IDs.
- Adjudicators must not be the exact same model IDs as the reviewers in that round.
- Human approval is only required for explicit override triggers, not every event.
