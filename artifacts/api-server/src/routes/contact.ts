import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// Simple in-memory rate limiter: max 5 submissions per IP per 15 minutes
const _rateStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = _rateStore.get(ip);
  if (!entry || entry.resetAt < now) {
    _rateStore.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: unknown): string {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .slice(0, 2000)
    .trim();
}

async function sendBrevoEmail(opts: {
  apiKey: string;
  toEmail: string;
  fromEmail: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": opts.apiKey },
    body: JSON.stringify({
      sender: { name: "MASReady Enquiry", email: opts.fromEmail },
      to: [{ email: opts.toEmail }],
      replyTo: { email: opts.replyTo },
      subject: opts.subject,
      textContent: opts.text,
      htmlContent: opts.html,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable)");
    throw new Error(`Brevo transactional email ${res.status}: ${body}`);
  }
}

function upsertBrevoContact(opts: {
  apiKey: string;
  email: string;
  name: string;
  company: string;
  phone: string;
}): void {
  const [first = "", ...rest] = opts.name.split(" ");
  fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": opts.apiKey },
    body: JSON.stringify({
      email: opts.email,
      updateEnabled: true,
      attributes: {
        FIRSTNAME: first,
        LASTNAME: rest.join(" "),
        ...(opts.company ? { COMPANY: opts.company } : {}),
        ...(opts.phone ? { SMS: opts.phone } : {}),
      },
    }),
  }).catch((err) => {
    logger.warn({ err }, "Failed to upsert Brevo contact (non-fatal)");
  });
}

router.post("/contact", async (req, res) => {
  // Honeypot: humans leave this blank, bots fill it
  if (req.body.website) {
    res.json({ ok: true });
    return;
  }

  const ip = String(
    req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown"
  )
    .split(",")[0]
    .trim();

  if (isRateLimited(ip)) {
    res.status(429).json({ error: "Too many submissions. Please try again in 15 minutes." });
    return;
  }

  const name = sanitize(req.body.name);
  const company = sanitize(req.body.company);
  const email = sanitize(req.body.email);
  const phone = sanitize(req.body.phone);
  const message = sanitize(req.body.message);

  if (!name) {
    res.status(400).json({ error: "Name is required." });
    return;
  }
  if (!email || !isValidEmail(email)) {
    res.status(400).json({ error: "A valid email address is required." });
    return;
  }
  if (!message) {
    res.status(400).json({ error: "Message is required." });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    req.log.error("BREVO_API_KEY is not configured");
    res.status(500).json({
      error: "Email service is not configured. Please contact us directly at hello@masready.com.au.",
    });
    return;
  }

  const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@masready.com.au";
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "no-reply@masready.com.au";
  const subject = `New MASReady enquiry from ${name}${company ? " / " + company : ""}`;

  const text = [
    `Name: ${name}`,
    `Company: ${company || "—"}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Company:</strong> ${company || "—"}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Phone:</strong> ${phone || "—"}</p>
    <hr/>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
  `.trim();

  try {
    await sendBrevoEmail({ apiKey, toEmail, fromEmail, replyTo: email, subject, text, html });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email via Brevo");
    res.status(500).json({
      error: "Failed to send your message. Please try again or email us at hello@masready.com.au.",
    });
    return;
  }

  // Non-blocking contact upsert — never fails the response
  upsertBrevoContact({ apiKey, email, name, company, phone });

  req.log.info({ name, company, email }, "Contact form submission sent via Brevo");
  res.json({ ok: true, message: "Thanks! We\u2019ll be in touch shortly." });
});

export default router;
