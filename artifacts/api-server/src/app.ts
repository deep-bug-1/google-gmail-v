import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Simple request logger using pino directly (avoids pino-http module compatibility issues)
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const reqLog = logger.child({ req: { method: req.method, url: req.path } });
  (req as Request & { log: typeof reqLog }).log = reqLog;

  res.on("finish", () => {
    reqLog.info(
      { req: { id: req.headers["x-request-id"], method: req.method, url: req.path }, res: { statusCode: res.statusCode }, responseTime: Date.now() - start },
      "request completed",
    );
  });

  next();
});

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
