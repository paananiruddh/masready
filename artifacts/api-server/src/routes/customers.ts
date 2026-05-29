import { Router, type IRouter } from "express";
import { requirePlatformAdmin } from "../middlewares/requireAuth";

const router: IRouter = Router();

// Customer list — platform admin only.
// This prevents tenant enumeration by non-admin users.
router.get("/customers", requirePlatformAdmin, (_req, res) => {
  // Live app implementation returns full tenant list.
  // Protected here — only platform_admin session can access.
  res.json({
    protected: true,
    message: "Customer list requires platform_admin authentication."
  });
});

// Domain context — return only the current tenant's code, never a full list.
// This endpoint is called on every page load to determine which customer
// the current subdomain maps to. It should return only the current tenant.
router.get("/domain-context", (_req, res) => {
  // In the live app, this reads the subdomain from req.hostname and
  // returns only the matching tenant's public metadata.
  // Never return a full list of all tenants here.
  res.json({
    customerCode: "MAS9_POWER",
    allowDemoSeed: true,
    allowLiveMutation: false
  });
});

export default router;
