import { pgTable, text, integer, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const visitorsTable = pgTable("visitors", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  userAgent: text("user_agent"),
  language: text("language"),
  platform: text("platform"),
  screenWidth: integer("screen_width"),
  screenHeight: integer("screen_height"),
  timezone: text("timezone"),
  referrer: text("referrer"),
  ip: text("ip"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const photosTable = pgTable("visitor_photos", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  photoIndex: integer("photo_index").notNull(),
  imageData: text("image_data").notNull(),
  capturedAt: timestamp("captured_at").defaultNow().notNull(),
});

export const insertVisitorSchema = createInsertSchema(visitorsTable).omit({ id: true, createdAt: true });
export const insertPhotoSchema = createInsertSchema(photosTable).omit({ id: true, capturedAt: true });

export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type Visitor = typeof visitorsTable.$inferSelect;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photosTable.$inferSelect;
