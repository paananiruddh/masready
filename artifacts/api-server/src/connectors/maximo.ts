import { z } from "zod";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export const MaximoConfigSchema = z.discriminatedUnion("auth_mode", [
  z.object({
    auth_mode: z.literal("apikey"),
    base_url: z.string().url(),
    api_key: z.string().min(1),
  }),
  z.object({
    auth_mode: z.literal("oauth2"),
    base_url: z.string().url(),
    token_url: z.string().url(),
    client_id: z.string().min(1),
    client_secret: z.string().min(1),
  }),
]);

export type MaximoConfig = z.infer<typeof MaximoConfigSchema>;

// ---------------------------------------------------------------------------
// Token cache (in-process; good enough for single-container deployment)
// ---------------------------------------------------------------------------

interface TokenEntry {
  token: string;
  expiresAt: number;
}

const tokenCache = new Map<string, TokenEntry>();

async function fetchOAuthToken(config: Extract<MaximoConfig, { auth_mode: "oauth2" }>): Promise<string> {
  const cacheKey = config.client_id;
  const cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: config.client_id,
    client_secret: config.client_secret,
    scope: "openid",
  });

  const res = await fetch(config.token_url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`OAuth2 token fetch failed: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in?: number };
  const expiresIn = data.expires_in ?? 3600;

  tokenCache.set(cacheKey, {
    token: data.access_token,
    expiresAt: Date.now() + expiresIn * 1000,
  });

  return data.access_token;
}

async function authHeaders(config: MaximoConfig): Promise<Record<string, string>> {
  if (config.auth_mode === "apikey") {
    return { apikey: config.api_key };
  }
  const token = await fetchOAuthToken(config);
  return { Authorization: `Bearer ${token}` };
}

// ---------------------------------------------------------------------------
// OSLC fetch helper
// ---------------------------------------------------------------------------

async function oslcGet<T>(config: MaximoConfig, path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(path, config.base_url.replace(/\/$/, "") + "/");
  url.searchParams.set("_format", "json");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const headers = await authHeaders(config);
  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json", ...headers },
  });

  if (!res.ok) {
    throw new Error(`Maximo OSLC error ${res.status} on ${path}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Fingerprint scan — read-only, no mutations
// ---------------------------------------------------------------------------

export interface MaximoFingerprint {
  scanned_at: string;
  base_url: string;
  version: VersionInfo | null;
  sites: SiteInfo[];
  automation_scripts: ScriptInfo[];
  users_summary: UsersSummary;
}

interface VersionInfo {
  product_name: string;
  build_version: string;
  description?: string;
}

interface SiteInfo {
  site_id: string;
  description: string;
  active: boolean;
}

interface ScriptInfo {
  script_name: string;
  language: string;
  status: string;
  last_modified?: string;
}

interface UsersSummary {
  total_count: number;
  active_count: number;
}

export async function scanFingerprint(config: MaximoConfig): Promise<MaximoFingerprint> {
  const [version, sites, scripts, users] = await Promise.allSettled([
    oslcGet<{ member: VersionInfo[] }>(config, "maximo/oslc/os/mxapiappversion", { oslc_pageSize: "1" }),
    oslcGet<{ member: SiteInfo[] }>(config, "maximo/oslc/os/mxapisite", { oslc_pageSize: "200", oslc_select: "siteid,description,active" }),
    oslcGet<{ member: ScriptInfo[] }>(config, "maximo/oslc/script", { oslc_pageSize: "500", oslc_select: "autoscript,scriptlanguage,status,changedate" }),
    oslcGet<{ member: Array<{ personid: string; status: string }> }>(config, "maximo/oslc/os/mxapiperson", { oslc_pageSize: "500", oslc_select: "personid,status" }),
  ]);

  return {
    scanned_at: new Date().toISOString(),
    base_url: config.base_url,
    version: version.status === "fulfilled" ? (version.value.member[0] ?? null) : null,
    sites: sites.status === "fulfilled" ? sites.value.member : [],
    automation_scripts: scripts.status === "fulfilled"
      ? scripts.value.member.map((s) => ({
          script_name: (s as Record<string, string>).autoscript,
          language: (s as Record<string, string>).scriptlanguage,
          status: (s as Record<string, string>).status,
          last_modified: (s as Record<string, string>).changedate,
        }))
      : [],
    users_summary: users.status === "fulfilled"
      ? {
          total_count: users.value.member.length,
          active_count: users.value.member.filter((u) => u.status === "ACTIVE").length,
        }
      : { total_count: 0, active_count: 0 },
  };
}

// ---------------------------------------------------------------------------
// Config loader from environment variables
// ---------------------------------------------------------------------------

export function loadMaximoConfigFromEnv(): MaximoConfig {
  const base_url = process.env.MAXIMO_BASE_URL;
  if (!base_url) throw new Error("MAXIMO_BASE_URL is required");

  const auth_mode = process.env.MAXIMO_AUTH_MODE ?? "apikey";

  if (auth_mode === "oauth2") {
    return MaximoConfigSchema.parse({
      auth_mode: "oauth2",
      base_url,
      token_url: process.env.MAXIMO_TOKEN_URL,
      client_id: process.env.MAXIMO_CLIENT_ID,
      client_secret: process.env.MAXIMO_CLIENT_SECRET,
    });
  }

  return MaximoConfigSchema.parse({
    auth_mode: "apikey",
    base_url,
    api_key: process.env.MAXIMO_API_KEY,
  });
}
