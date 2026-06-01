export const PREVIEW_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

export interface RuntimePersonalization {
  companyLabel?: string;
  currentMaximoVersion?: string;
  targetMasVersion?: string;
  addOns?: string;
  industrySolutions?: string;
  mobilityTool?: string;
  integrationTypes?: string;
  mainConcern?: string;
}

export interface PreviewSession {
  id: string;
  industry: string;
  createdAt: string;
  expiresAt: string;
  overlay: RuntimePersonalization;
  source: "launch" | "industry-previews" | "preview-studio" | "direct";
  version: number;
}

const STORAGE_KEY = "masready_preview_sessions";

function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getStoredSessions(): Record<string, PreviewSession> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveSessions(sessions: Record<string, PreviewSession>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {}
}

export function createPreviewSession(input: {
  industry: string;
  overlay?: RuntimePersonalization;
  source?: PreviewSession["source"];
}): PreviewSession {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + PREVIEW_TTL_MS);
  const session: PreviewSession = {
    id: generateUUID(),
    industry: input.industry,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    overlay: input.overlay ?? {},
    source: input.source ?? "preview-studio",
    version: 1,
  };
  const sessions = getStoredSessions();
  sessions[session.id] = session;
  saveSessions(sessions);
  return session;
}

export function getPreviewSession(id: string): PreviewSession | null {
  const sessions = getStoredSessions();
  return sessions[id] ?? null;
}

export function isExpired(session: PreviewSession): boolean {
  return Date.now() > new Date(session.expiresAt).getTime();
}

export function validatePreviewSession(id: string): {
  valid: boolean;
  session: PreviewSession | null;
  reason: "not_found" | "expired" | "ok";
} {
  const session = getPreviewSession(id);
  if (!session) return { valid: false, session: null, reason: "not_found" };
  if (isExpired(session)) return { valid: false, session, reason: "expired" };
  return { valid: true, session, reason: "ok" };
}

export function expirePreviewSession(id: string): void {
  const sessions = getStoredSessions();
  if (sessions[id]) {
    sessions[id].expiresAt = new Date(0).toISOString();
    saveSessions(sessions);
  }
}

export function clearPreviewSession(id: string): void {
  const sessions = getStoredSessions();
  delete sessions[id];
  saveSessions(sessions);
}

export function clearAllPreviewSessions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export interface RemainingTime {
  ms: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

export function getRemainingTime(session: PreviewSession): RemainingTime {
  const ms = Math.max(0, new Date(session.expiresAt).getTime() - Date.now());
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  const formatted = `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  return { ms, hours, minutes, seconds, formatted };
}
