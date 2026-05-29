import { type Request, type Response, type NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // The live app uses Express session with httpOnly cookies.
  // Session user is stored at req.session.userId after login.
  // If no session exists, return 401.
  const session = (req as any).session;
  if (!session?.userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
}

export function requirePlatformAdmin(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  if (!session?.userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  if (session.role !== "platform_admin") {
    res.status(403).json({ error: "Platform admin access required" });
    return;
  }
  next();
}
