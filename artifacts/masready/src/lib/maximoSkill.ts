export interface MaximoAnswer {
  keywords: string[];
  answer: string;
}

export const MAXIMO_OFFLINE_KB: MaximoAnswer[] = [
  {
    keywords: ["assignment manager", "am", "data preparation", "prepare data"],
    answer: `To prepare data for Assignment Manager in Maximo 7.x, you need six things in order:

1. **Labour records** — Each technician needs a LABOUR record linked to their PERSON record. Without this, they won't appear as assignable.
2. **Craft & skill codes** — Define crafts (CRAFT application) and assign them to each labour record with a skill level (1–5). AM uses this to match work order requirements.
3. **Work order craft requirements** — Each work order or job plan must have a LABOURPLAN line with a craft and estimated hours. AM cannot assign work without this.
4. **Shift calendars** — Define shifts in the Calendars application and assign them to each labour record. This controls availability windows AM uses for scheduling.
5. **Work zones / crew assignments** — If using geographic zones, assign technicians to a zone. Work orders should have a location that maps to a zone.
6. **Priority codes** — Ensure work orders have a valid priority code. AM uses priority weighting in its queue logic.

Common failures: missing LABOURPLAN lines on work orders, labour records not linked to person, shift calendars not assigned.`,
  },
  {
    keywords: ["upgrade", "mas 8", "mas 9", "7.6", "migration", "upgrade path"],
    answer: `Maximo 7.6.1.x to MAS 8/9 upgrade considerations:

**Architecture change**: MAS runs on OpenShift (Kubernetes). This is a containerised deployment — not an in-place upgrade. Your database migrates; your application layer is redeployed.

**Key steps**:
1. Run IBM Maximo Application Framework (MAF) upgrade scripts against your database
2. Export custom objects, automation scripts, workflows, and integration configs
3. Deploy MAS on OpenShift — minimum 3 worker nodes for production
4. Re-import customisations; test thoroughly as some Jython APIs changed

**Licensing**: MAS uses AppPoints. One AppPoints unit covers multiple applications. Run IBM's AppPoints calculator against your current user/app matrix before committing.

**Timeline**: Typical on-prem to MAS 8 migration is 3–6 months for a well-governed environment. Add 4–8 weeks if custom objects are undocumented.`,
  },
  {
    keywords: ["apppoints", "licensing", "licence", "cost", "users"],
    answer: `MAS AppPoints licensing works differently from Maximo 7.x named/concurrent user licensing.

**AppPoints model**: Each user action consumes AppPoints based on which application they access. Read-only access costs fewer points than transactional access.

**Key applications and AppPoints consumption**:
- Maximo Manage (core EAM): ~14 AppPoints per authorised user per month
- Maximo Mobile: additional AppPoints depending on usage tier
- Health, Predict, Visual Inspection: sold separately or as bundles

**What you need to do before buying**:
1. Export your active user list with application access from MAXUSER/GROUPUSER
2. Identify which applications each user actually logs into (use LOGINTRACKING)
3. Run this against IBM's AppPoints calculator
4. Factor in peak concurrent vs monthly active — AppPoints are monthly, not concurrent

Under-estimating AppPoints is the most common MAS migration budget error.`,
  },
  {
    keywords: ["work order", "scheduling", "pm", "preventive", "maintenance"],
    answer: `Work order and scheduling data quality checklist for Maximo 7.x:

**Work orders**:
- Status codes mapped correctly (WAPPR → APPR → INPRG → COMP)
- Owner group populated for routing
- Asset and location linked (not just one or the other)
- Failure class assigned on asset for failure reporting

**PM schedules**:
- Frequency and season set correctly
- Lead time set so PMs generate with enough notice
- Job plans linked (work orders generated without job plans have no labour or material estimates)

**For scheduling readiness**:
- All active WOs should have estimated hours (ESTDUR) populated
- Target dates set or calculable from priority + creation date
- Long-term schedule anchor: work orders should have a TARGSTARTDATE

Blank ESTDUR is the single biggest cause of poor schedule quality.`,
  },
  {
    keywords: ["integration", "oslc", "api", "rest", "mif", "interface"],
    answer: `Maximo integration options by version:

**Maximo 7.6.1.x**:
- Integration Framework (MIF) — XML/flat file, JMS queues, HTTP adapters
- OSLC REST API — available from 7.6.1.1+, read/write, OAuth1 or API key
- Automation Scripts can call external REST endpoints via urllib

**MAS 8/9**:
- OSLC API continues and is the primary integration method
- OpenAPI spec available for most core objects
- MAS Integration add-on extends connectors (SAP, Oracle EBS, etc.)
- Kafka integration available for event streaming use cases

**Common integration readiness issues**:
- Object Structures not published (must be set to Active + OSLC enabled)
- OAuth2 client credentials not set up
- Firewall rules blocking outbound from Maximo server

For read-only integrations (like MASReady), OSLC with an API key is the simplest path.`,
  },
];

export function offlineAnswer(query: string, focusAreas: string[] = []): string | null {
  const q = query.toLowerCase();
  const combined = q + " " + focusAreas.join(" ").toLowerCase();

  for (const entry of MAXIMO_OFFLINE_KB) {
    if (entry.keywords.some((k) => combined.includes(k))) {
      return entry.answer;
    }
  }
  return null;
}
