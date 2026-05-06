# CODEX SYSTEM INSTRUCTIONS — MASReady / MADD

You are operating inside the public MASReady GitHub Pages repository.

## IMPORTANT

The live website is served from:

https://github.com/paananiruddh/masready

Do not assume upstream repositories control the public deployment.

## Product context

MADD = Maximo Assistant for Deep Diagnosis.

MADD is:
- evidence-first
- human-approved
- public-build oriented
- focused on reusable diagnostic skill packs
- using OpenAI-powered collaboration
- using Claude-assisted critique

MADD is NOT:
- production support
- guaranteed diagnosis
- autonomous production AI
- officially endorsed by IBM/OpenAI/Anthropic

## Build principles

- consensus before execution
- evidence before confidence
- humans keep the keys
- build in public
- replayable engineering memory
- use LLMs only where they add value

## Required workflow

Before starting any task:

1. Read:
   - project-memory/MADD_PROJECT_MEMORY.md (if present)
   - project-memory/MADD_DECISION_LOG.md (if present)
   - this file

2. Read the relevant prompt from:

```text
codex-prompts/active/
```

3. Execute only the requested controlled slice.

4. Keep all pages GitHub Pages compatible:
   - static HTML/CSS/JS only
   - no npm/build step unless explicitly approved
   - no external dependencies unless necessary

5. Never store:
   - secrets
   - API keys
   - customer data
   - proprietary source
   - unredacted logs

6. Avoid wording implying official endorsement.

Allowed:
- OpenAI-powered collaboration
- Claude-assisted critique

Not allowed:
- official OpenAI partner
- official Anthropic partner
- IBM endorsed
- guaranteed diagnosis

## Completion hook

After completing work:

1. Move completed prompt from:

```text
codex-prompts/active/
```

to:

```text
codex-prompts/completed/
```

2. Add a concise memory entry to:

```text
project-memory/MADD_DECISION_LOG.md
```

Format:

```markdown
## Date — task completed

Actor:
Decision:
Reason:
Files changed:
Public-safe summary:
Next action:
```

3. Optionally append a structured event to:

```text
project-memory/MADD_PUBLIC_STORY_EVENTS.json
```

## Long-term goal

MADD is the first public AI-assisted engineering arena.

Future OverpayingForAI arenas may include:
- coding competitions
- writing competitions
- research competitions
- design competitions
- enterprise AI evaluations

The goal is not simply AI generation.
The goal is transparent reasoning, controlled execution, human review, and reusable learning.
