# AGENT START HERE

> Read every file in `/project-memory/` before making any change to this repository.
> Update project memory after every meaningful change.

## Mandatory Reading Order

1. `AGENT_START_HERE.md` (this file)
2. `CURRENT_STATE.md`
3. `PRODUCT_OVERVIEW.md`
4. `ARCHITECTURE.md`
5. `CUSTOMER_TENANT_MODEL.md`
6. `SEED_DATA_MODEL.md`
7. `WEBSITE_CONTENT_MODEL.md`
8. `DEPLOYMENT_MODEL.md`
9. `TODO_NEXT.md`
10. `CHANGELOG.md` (most recent entries)

## Rules Every Agent Must Follow

### Before Making Changes
- Read ALL project-memory files first.
- Understand the existing visual style — do not redesign without instruction.
- Check `CURRENT_STATE.md` to understand the live product state.
- Check `TODO_NEXT.md` to understand priority work.

### While Making Changes
- Never mix fictional demo seed data with live customer data.
- Demo tenant data (MAS9 Power) must always be clearly labelled as fictional.
- Customer-specific live data connectors are separate from seed data — keep them separated.
- Maintain naming consistency: the demo tenant is always called **MAS9 Power** (not MAS9Power, MAS 9 Power, etc).
- Preserve existing component structure — add, don't rewrite, unless clearly broken.
- Keep screenshots, diagrams, seed data, wiki pages, and website content consistent with each other.

### After Making Changes
- Update `CHANGELOG.md` with date, summary, files changed, and any known issues.
- Update `CURRENT_STATE.md` if the product state has changed.
- Update `TODO_NEXT.md` to reflect what was completed and what is now unblocked.

### Git Commits
- Commit with a clear, descriptive summary.
- Never commit real customer data.
- Never commit secrets or API tokens.

## Key Paths

| Path | Purpose |
|------|---------|
| `artifacts/masready/src/` | React/Vite marketing site source |
| `artifacts/masready/src/pages/` | Page components (Design 1, 2, 3 variants) |
| `artifacts/masready/src/lib/constants.ts` | Shared demo constants — DO NOT add real customer data here |
| `seed-data/mas9-power/` | 23 fictional JSON seed files for demo tenant |
| `project-memory/` | This durable memory system |
| `scripts/` | Validation and utility scripts |

## Critical Safety Gates

```
NEVER do this:
- Use real customer names, emails, site IDs, or asset IDs anywhere in seed data
- Import DEMO_METRICS into homepage without labelling it as demo data
- Push to production/live remotes without running validation

ALWAYS do this:
- Label demo data with "MAS9 Power Demo Tenant" or "Fictional" wherever visible
- Keep seed data in /seed-data/mas9-power/ only
- Run `pnpm run typecheck` before committing
```
