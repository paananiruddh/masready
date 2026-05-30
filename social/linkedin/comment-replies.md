# Suggested Comment Replies

---

## "Is this just another chatbot?"

No — the direction is deliberately Maximo-specific and skill-pack-first, not a generic chatbot wrapper. The architecture is built around curated offline skill packs, evidence-based generation, and customer data-mode boundaries. The goal is Maximo delivery intelligence, not general-purpose text generation.

---

## "Does it connect to live Maximo?"

The public simulator does not — it uses fictional demo fixtures only, no real customer systems connected. Customer-specific Azure-hosted demos can be configured with approved integrations and selected data boundary models depending on what the customer needs.

---

## "Does it make changes in production?"

No. The current model is review-only: no SQL execution, no Maximo mutation, no Jira mutation, no Azure DevOps mutation. Outputs are designed for your team to review, validate, and decide what gets actioned. RBAC and customer access controls remain the real security boundary.

---

## "How is customer data handled?"

Demo fixtures are demo-only — fictional data for the public simulator only. Real customers choose a data model: no-store / zero-retention runtime (nothing persisted), customer-hosted (data stays inside the customer environment), BYO storage (customer-owned S3, Azure Blob, GCS), Azure-hosted customer subdomain, or controlled managed demo workspace.

---

## "Why local skill packs?"

Because Maximo delivery depends on domain-specific patterns, version context, customisation evidence, and governance — not just generic text generation. A locally running, skill-pack-first architecture gives you Maximo delivery intelligence without creating a dependency on a generic cloud AI provider as the core architectural decision.

---

## "What is next?"

More Maximo skills, more industry-specific demo scenarios, skill quality scoring, deeper patch and iFix impact intelligence, customer-derived benchmark scenarios, and more Azure-hosted customer subdomain demos. The architecture is the bet — the skills and scenarios will grow over time.

---

## "Is this available now?"

The public simulator and website are live now. Customer-specific demos and Azure-hosted subdomain environments are being built out. If you work in Maximo delivery and want to explore further, reach out directly.

---

## "What Maximo versions does it support?"

Currently the demo scenarios cover MAS 9 / Manage 9.x and Maximo 7.6.x. The skill packs are version-locked so coverage can be extended to other versions as needed.

---

## "Does it replace the delivery team?"

No — it's a workbench, not a replacement. The intention is to turn tribal knowledge into governed, evidence-backed execution so delivery teams can move faster and with more confidence. Your team still reviews every output and decides what gets actioned.
