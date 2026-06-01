import { Router, type IRouter } from "express";

const router: IRouter = Router();

const _rateStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = _rateStore.get(ip);
  if (!entry || entry.resetAt < now) {
    _rateStore.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 10) return true;
  entry.count++;
  return false;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: unknown): string {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .slice(0, 500)
    .trim();
}

const VALID_INTERESTS = new Set([
  "MASReady demo",
  "Maximo environment proof",
  "Licensing report",
  "Regression test suite",
  "General inquiry",
]);

router.post("/leads", async (req, res) => {
  if (req.body.website) {
    res.json({ ok: true });
    return;
  }

  const ip = String(
    req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown",
  )
    .split(",")[0]
    .trim();

  if (isRateLimited(ip)) {
    res
      .status(429)
      .json({ error: "Too many submissions. Please try again later." });
    return;
  }

  const email = sanitize(req.body.email);
  const name = sanitize(req.body.name);
  const company = sanitize(req.body.company);
  const interest = sanitize(req.body.interest);

  if (!email || !isValidEmail(email)) {
    res
      .status(400)
      .json({ error: "A valid email address is required." });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    req.log.error("BREVO_API_KEY is not configured");
    res.status(500).json({
      error:
        "Service temporarily unavailable. Please email ani@assetize.com.au directly.",
    });
    return;
  }

  const [first = "", ...rest] = name.split(" ");
  const attributes: Record<string, string> = { SOURCE: "masready.com.au" };
  if (first) attributes.FIRSTNAME = first;
  if (rest.length) attributes.LASTNAME = rest.join(" ");
  if (company) attributes.COMPANY = company;
  if (interest && VALID_INTERESTS.has(interest)) attributes.INTEREST = interest;

  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({ email, updateEnabled: true, attributes }),
    });

    if (!brevoRes.ok) {
      const body = await brevoRes.text().catch(() => "(unreadable)");
      if (brevoRes.status === 400 && body.includes("Contact already exist")) {
        req.log.info({ email }, "Lead already exists in Brevo — updated");
      } else {
        throw new Error(`Brevo contacts API ${brevoRes.status}: ${body}`);
      }
    }
  } catch (err) {
    req.log.error({ err }, "Failed to upsert lead via Brevo");
    res.status(500).json({
      error:
        "Something went wrong. Please try again or email ani@assetize.com.au.",
    });
    return;
  }

  req.log.info({ email, company, interest }, "Lead captured");
  res.json({
    ok: true,
    message: "Thanks! We\u2019ll be in touch with the demo link shortly.",
  });
});

export default router;
