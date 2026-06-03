import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import healthRouter from "./routes/health.js";
import connectorRouter from "./routes/connector.js";

const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  ...(process.env.NODE_ENV !== "production" ? { transport: { target: "pino-pretty" } } : {}),
});

const app = express();
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use("/api", healthRouter);
app.use("/api/connector", connectorRouter);

const port = Number(process.env.PORT ?? 8080);
app.listen(port, "0.0.0.0", () => {
  logger.info({ port, tenant: process.env.TENANT_NAME ?? "unconfigured" }, "api-server started");
});

export default app;
