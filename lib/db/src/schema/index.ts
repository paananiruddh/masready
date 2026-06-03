import { pgTable, text, serial, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// connector_runs — one row per fingerprint scan or data extraction run
export const connectorRunsTable = pgTable("connector_runs", {
  id: serial("id").primaryKey(),
  tenant_slug: text("tenant_slug").notNull(),
  connector_type: text("connector_type").notNull(), // "maximo" | "jira" | "ado"
  status: text("status").notNull(),                 // "running" | "completed" | "failed"
  started_at: timestamp("started_at").notNull().defaultNow(),
  completed_at: timestamp("completed_at"),
  error_message: text("error_message"),
  summary: jsonb("summary"),                        // shape depends on connector
});

export const insertConnectorRunSchema = createInsertSchema(connectorRunsTable).omit({ id: true });
export type InsertConnectorRun = z.infer<typeof insertConnectorRunSchema>;
export type ConnectorRun = typeof connectorRunsTable.$inferSelect;

// connector_cache — resources extracted during a run
export const connectorCacheTable = pgTable("connector_cache", {
  id: serial("id").primaryKey(),
  run_id: integer("run_id").notNull().references(() => connectorRunsTable.id),
  resource_type: text("resource_type").notNull(), // "site" | "script" | "user" | etc.
  resource_key: text("resource_key").notNull(),   // stable identifier within the resource type
  data: jsonb("data").notNull(),
  extracted_at: timestamp("extracted_at").notNull().defaultNow(),
});

export const insertConnectorCacheSchema = createInsertSchema(connectorCacheTable).omit({ id: true });
export type InsertConnectorCache = z.infer<typeof insertConnectorCacheSchema>;
export type ConnectorCache = typeof connectorCacheTable.$inferSelect;