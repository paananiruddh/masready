# UI Builder Selection — OpenRouter Arena

## Goal

Select the best path to build the MADD Rapid Rounds Arena UI now that OpenRouter gives access to many models.

## Decision

Use a layered UI build strategy instead of asking one model/tool to do everything.

## Recommended roles

### 1. UI Concept Designer

Use Claude-style reasoning for:

- information architecture
- FOMO mechanics
- copy hierarchy
- user journey
- what should be visible above the fold
- how to avoid overclaiming

Why: Claude is strong at product narrative, UX critique, and making the experience feel coherent.

### 2. Visual Direction Generator

Use Canva for:

- hero graphic
- LinkedIn/social thumbnails
- Arena roadmap visual
- supporter visuals
- cyber control room / Formula 1 pit wall feel

Why: Canva is fastest for polished shareable visuals.

### 3. Static UI Implementer

Use Codex or GPT-style implementation for:

- HTML/CSS/JS
- JSON-driven rendering
- GitHub Pages compatibility
- responsive layout
- direct-to-main commits

Why: The MASReady site is currently static/GitHub Pages friendly.

### 4. UI Critic / Adjudicator

Use Gemini or another selected OpenRouter model as UI adjudicator for:

- clarity
- responsiveness
- visual hierarchy
- trust/safety wording
- conversion path
- whether it feels like a live Arena instead of docs

## Winner for immediate build

For the next slice, the best builder is:

```text
Codex / GPT-style static implementer
```

The best reviewer is:

```text
Claude-style UX critic
```

The best visual booster is:

```text
Canva
```

## Why not let random OpenRouter models build UI directly?

Because the immediate site is a production-facing GitHub Pages website. Random model output can create inconsistent visual systems, broken HTML, or unsafe wording.

Better flow:

```text
Claude-style UX brief
→ Codex/GPT static implementation
→ Canva visual assets
→ OpenRouter adjudicator review
→ human approve/override only if needed
```

## UI must include

- Rapid Rounds status
- Human task input concept
- OpenAI reviewer card
- Claude reviewer card
- selectable adjudicator cards
- synthesized prompt panel
- reviewer solution scores
- Maximo concept test panel
- operational readiness meter
- next round queue
- demo entry points for PFM/BOM
- support link

## Public promise

The UI should not claim MADD is finished.

It should claim:

- MADD is being improved round after round
- each round is scored and tested
- Maximo concept coverage is visible
- humans can override when needed
- operational readiness grows as tests pass

## Style direction

- dark enterprise SaaS
- cyber control room
- Formula 1 pit wall
- neon cyan/green accents
- animated score meters
- compact data-dense panels
- credible, not cartoonish

## Immediate build instruction

Upgrade `/overpayingforai-arena/` into the Rapid Rounds Arena UI.

Do not wait for full OpenRouter automation.

Use seeded/demo JSON now and wire real OpenRouter later.
