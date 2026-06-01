export type AuditEventType =
  | "preview_session_created"
  | "preview_session_opened"
  | "preview_session_expired"
  | "industry_selected"
  | "preview_section_opened"
  | "preview_data_cleared"
  | "persisted_demo_clicked"
  | "preview_session_invalid"
  | "preview_session_access_denied"
  | "preview_new_session_requested"
  | "preview_link_generated"
  | "preview_link_opened_new_window"
  | "preview_link_copy_clicked";

export interface AuditEvent {
  eventId: string;
  sessionId: string;
  eventType: AuditEventType;
  timestamp: string;
  industry?: string;
  route?: string;
  section?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

const AUDIT_KEY = "masready_preview_audit_events";
const MAX_EVENTS = 500;

// Abstraction allowing future replacement with real backend
interface AuditSink {
  write(event: AuditEvent): void;
}

class LocalStorageAuditSink implements AuditSink {
  write(event: AuditEvent): void {
    try {
      const raw = localStorage.getItem(AUDIT_KEY);
      const events: AuditEvent[] = raw ? JSON.parse(raw) : [];
      events.push(event);
      if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
      localStorage.setItem(AUDIT_KEY, JSON.stringify(events));
    } catch {}
  }
}

// Future placeholder:
// class ApiAuditSink implements AuditSink {
//   async write(event: AuditEvent): Promise<void> {
//     await fetch("/api/preview-audit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(event),
//     });
//   }
// }

const sink: AuditSink = new LocalStorageAuditSink();

function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function writeAuditEvent(
  type: AuditEventType,
  sessionId: string,
  opts: Partial<Omit<AuditEvent, "eventId" | "sessionId" | "eventType" | "timestamp">> = {}
): void {
  const event: AuditEvent = {
    eventId: generateEventId(),
    sessionId,
    eventType: type,
    timestamp: new Date().toISOString(),
    ...opts,
  };
  sink.write(event);
}

export function getAuditEvents(sessionId?: string): AuditEvent[] {
  try {
    const raw = localStorage.getItem(AUDIT_KEY);
    const events: AuditEvent[] = raw ? JSON.parse(raw) : [];
    return sessionId ? events.filter((e) => e.sessionId === sessionId) : events;
  } catch {
    return [];
  }
}

export function clearAuditEvents(): void {
  try {
    localStorage.removeItem(AUDIT_KEY);
  } catch {}
}

export function exportAuditEvents(sessionId: string): void {
  const events = getAuditEvents(sessionId);
  // Strip any potentially sensitive overlay fields — export only safe identifiers
  const safe = events.map(({ eventId, sessionId: sid, eventType, timestamp, industry, route, section, source }) => ({
    eventId,
    sessionId: sid,
    eventType,
    timestamp,
    industry,
    route,
    section,
    source,
  }));
  const blob = new Blob([JSON.stringify(safe, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `masready-audit-${sessionId.slice(0, 8)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
