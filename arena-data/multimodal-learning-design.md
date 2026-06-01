# Multimodal Learning Design — MADD

## Answer

Yes, MADD will learn better if it can use vision and document/video understanding, but only through a governed ingestion pipeline.

MADD should not blindly scrape or ingest the internet.

## What multimodal learning helps with

### Documents

MADD can improve from:

- IBM Maximo docs
- MAS docs
- release notes
- iFix notes
- APARs
- migration guides
- technical PDFs
- internal runbooks if approved
- troubleshooting notes
- exported wiki pages

### Images / screenshots

Vision helps MADD interpret:

- Maximo UI screenshots
- configuration screens
- application designer layouts
- workflow diagrams
- error dialog screenshots
- log screenshots when text extraction is unavailable
- diagrams from docs and presentations

### Videos

Video helps only after it is converted into structured evidence:

- transcript
- chapters
- screenshots/keyframes
- extracted steps
- visible UI states
- referenced errors/configuration objects

## Critical governance

Every source must be tracked with:

- source URL or filename
- source type
- license/permission status
- ingestion date
- extracted summary
- confidence
- public/private flag
- customer/tenant scope
- whether it can be used in public replay

## Do not ingest

- private customer recordings
- production screenshots with secrets
- credentials/tokens
- unredacted logs
- copyrighted training videos unless allowed
- proprietary IBM materials not licensed for reuse
- confidential customer runbooks without permission

## Architecture

```text
Source document/video/screenshot
→ extractor
→ redaction/safety scan
→ chunking
→ concept tagging
→ embedding/indexing
→ skill pack candidate
→ Arena review/adjudication
→ concept tests
→ approved MADD memory
```

## Recommended pipeline

### 1. Source intake

Supported inputs:

```text
PDF
DOCX
Markdown
HTML
YouTube URL with transcript
video file with transcript/keyframes
screenshots
```

### 2. Extraction

- text extraction for documents
- transcript extraction for video
- keyframe extraction for video
- OCR only when needed
- vision model summary for diagrams/screenshots

### 3. Redaction

Remove:

- user names
- emails
- hostnames
- URLs if private
- API keys
- passwords
- tokens
- customer names
- confidential business data

### 4. Concept tagging

Tag by Maximo concept:

- AUTOSCRIPT
- SCRIPTLAUNCHPOINT
- CRONTASK
- ESCALATION
- MIF
- OBJECTSTRUCTURE
- MAXGROUP
- APPLICATIONAUTH
- WORKFLOW
- DOCLINKS
- MIGRATION
- PATCH_IFIX
- MAS9

### 5. Memory routing

Public-safe sources can become:

```text
arena-data/knowledge/public/
```

Private/customer-specific sources must stay in tenant-scoped storage and must not appear in GitHub Pages.

### 6. Skill pack update

Only promoted after:

- reviewer agreement
- adjudicator scoring
- human override check
- concept tests pass

## Learning rule

MADD does not learn just because content was ingested.

MADD learns only when extracted knowledge improves a skill pack and passes Maximo concept tests.

## YouTube handling

For YouTube videos:

1. Prefer official transcript if available.
2. Extract chapters/sections.
3. Extract key screenshots for UI steps.
4. Summarise into concept cards.
5. Store source attribution.
6. Do not republish copyrighted video content.
7. Use only derived notes where allowed.

## Why this matters

Vision/video/document ingestion can help MADD understand:

- UI flows
- configuration sequences
- screen layouts
- where admins click
- what errors look like
- how Maximo concepts are explained by practitioners

But the output must be tested, not trusted blindly.

## Operational use

For customer demos, use curated and seeded materials only:

- synthetic screenshots
- redacted examples
- public docs
- demo-specific runbooks
- approved internal notes

## Next build requirement

Add a Multimodal Learning section to the Arena/MADD roadmap:

- Document ingestion
- Screenshot understanding
- YouTube transcript/keyframe review
- redaction gate
- concept tagging
- skill pack promotion
- Maximo concept tests
