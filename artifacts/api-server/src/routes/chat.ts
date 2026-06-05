import { Router, Request, Response } from "express";
import { z } from "zod";

const router = Router();

const ChatRequestSchema = z.object({
  message: z.string().min(0).max(2000),
  mode: z.literal("live"),
  context: z.object({
    name: z.string().optional(),
    org: z.string().optional(),
    industry: z.string().optional(),
    platform: z.string().optional(),
    scale: z.string().optional(),
    focusAreas: z.array(z.string()).optional(),
    painPoint: z.string().optional(),
    timeline: z.string().optional(),
  }),
  intent: z.enum(["analysis", "question"]),
});

const MAXIMO_SYSTEM_PROMPT = `You are a senior IBM Maximo technical consultant embedded in the MASReady platform. You have deep expertise in Maximo 7.6.1.x, MAS 8, and MAS 9.

Your role is to give precise, decision-ready answers to Maximo professionals — platform owners, IT managers, delivery leads, and technical architects. You do not give generic advice. You answer based on the specific platform version, scale, and focus areas provided in the user's profile.

Key knowledge areas:
- Work Orders, PM schedules, job plans, failure codes
- Assignment Manager: labour craft/skill requirements, crew availability, shift calendars, work zone configuration, priority weighting, and common data quality issues that cause AM to fail or underperform
- Scheduling: Scheduler Plus, optimisation profiles, resource levelling, shift patterns
- Maximo 7.6.1.x upgrade paths to MAS 8 and MAS 9
- MAS 8 and MAS 9 architecture: OpenShift, Cloud Pak for Data, AppPoints licensing
- Integration Framework, OSLC REST API, MIF adapters
- Automation Scripts (Jython), Workflow design, Escalations
- Security: Sites, Organisations, Security Groups, row-level filtering
- Mobile: Maximo Mobile (MAS), Anywhere, MXES

When answering:
- Be specific to the platform version mentioned
- Call out version-specific differences where relevant
- If the question relates to Assignment Manager data preparation, give concrete SQL or field-level guidance
- Do not hedge excessively — give a direct answer, then caveats if needed
- Keep responses under 300 words unless complexity demands more`;

function buildUserPrompt(
  intent: string,
  context: z.infer<typeof ChatRequestSchema>["context"],
  message: string
): string {
  const profile = [
    context.name && `Name: ${context.name}`,
    context.org && `Organisation: ${context.org}`,
    context.industry && `Industry: ${context.industry}`,
    context.platform && `Platform: ${context.platform}`,
    context.scale && `Scale: ${context.scale} users`,
    context.focusAreas?.length && `Focus areas: ${context.focusAreas.join(", ")}`,
    context.painPoint && `Specific pain point: ${context.painPoint}`,
    context.timeline && `Timeline: ${context.timeline}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (intent === "analysis") {
    return `Customer profile:\n${profile}\n\nPlease analyse this customer's Maximo environment and provide a targeted assessment covering: (1) the most likely challenges given their platform and focus areas, (2) what data preparation or configuration work they should prioritise before their timeline, and (3) any version-specific risks or opportunities relevant to their setup.`;
  }

  return `Customer profile:\n${profile}\n\nQuestion: ${message}`;
}

router.post("/", async (req: Request, res: Response) => {
  const parsed = ChatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
  }

  const { message, context, intent } = parsed.data;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "OpenRouter API key not configured" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://masready.com.au",
        "X-Title": "MASReady Maximo Assistant",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        max_tokens: 600,
        messages: [
          { role: "system", content: MAXIMO_SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(intent, context, message) },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenRouter error:", err);
      return res.status(502).json({ error: "AI service unavailable" });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "No response received.";
    return res.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
