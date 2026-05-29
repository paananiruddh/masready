import { Router, type IRouter } from "express";
import { requirePlatformAdmin } from "../middlewares/requireAuth";

// The live Azure deployment uses express-session with PostgreSQL/Redis session store.
// The session.userId and session.role fields are set at login.
// This middleware pattern is compatible with the live app's existing auth implementation.

const router: IRouter = Router();

// Gate the audit log behind platform admin auth.
// In the live app this route returns real audit events.
// The middleware ensures only authenticated platform admins can access it.
router.get("/audit", requirePlatformAdmin, (_req, res) => {
  // The live app's full audit implementation goes here.
  // For now, return a clear message that auth is required and working.
  res.json({
    protected: true,
    message: "Audit log requires platform_admin authentication.",
    events: []
  });
});

export default router;
