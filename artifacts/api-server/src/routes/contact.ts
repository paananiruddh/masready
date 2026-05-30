import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, organisation, email, maximo_version, message } = req.body as {
    name?: string;
    organisation?: string;
    email?: string;
    maximo_version?: string;
    message?: string;
  };

  if (!name || !organisation || !email) {
    res.status(400).json({ error: "name, organisation, and email are required" });
    return;
  }

  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    req.log.error("RESEND_API_KEY is not set");
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "MASReady Contact <onboarding@resend.dev>",
    to: "aniruddh@overpayingforai.com",
    replyTo: email,
    subject: `MASReady walkthrough request — ${name} (${organisation})`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #1a1a2e; padding: 24px;">
        <h2 style="color: #3b82f6; margin-bottom: 4px;">New walkthrough request</h2>
        <p style="color: #666; margin-top: 0; font-size: 14px;">via masready.com.au contact form</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 8px 0; color: #666; width: 160px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Organisation</td><td style="padding: 8px 0; font-weight: 600;">${organisation}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Maximo version</td><td style="padding: 8px 0;">${maximo_version ?? "Not specified"}</td></tr>
        </table>
        ${message ? `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #666; font-size: 14px; margin-bottom: 8px;">Message</p>
        <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        ` : ""}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999;">Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  });

  if (error) {
    req.log.error({ error }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email" });
    return;
  }

  req.log.info({ name, organisation, email }, "Contact form submission sent");
  res.json({ ok: true });
});

export default router;
