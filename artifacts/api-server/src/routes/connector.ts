import { Router } from "express";
import { loadMaximoConfigFromEnv, scanFingerprint } from "../connectors/maximo.js";

const router = Router();

// GET /api/connector/status
// Returns whether the connector is configured and can be reached
router.get("/status", async (req, res) => {
  try {
    loadMaximoConfigFromEnv(); // throws if misconfigured
    res.json({
      configured: true,
      base_url: process.env.MAXIMO_BASE_URL,
      auth_mode: process.env.MAXIMO_AUTH_MODE ?? "apikey",
      tenant: process.env.TENANT_NAME ?? "unknown",
    });
  } catch (err) {
    res.status(503).json({
      configured: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
});

// POST /api/connector/maximo/scan
// Triggers a read-only fingerprint scan against the customer's Maximo instance.
// Never mutates any data in Maximo.
router.post("/maximo/scan", async (req, res) => {
  const log = req.log ?? console;
  try {
    const config = loadMaximoConfigFromEnv();
    log.info({ base_url: config.base_url }, "starting maximo fingerprint scan");
    const fingerprint = await scanFingerprint(config);
    log.info({ scripts: fingerprint.automation_scripts.length, sites: fingerprint.sites.length }, "scan complete");
    res.json(fingerprint);
  } catch (err) {
    log.error(err, "maximo scan failed");
    const message = err instanceof Error ? err.message : "scan failed";
    res.status(502).json({ error: message });
  }
});

export default router;
