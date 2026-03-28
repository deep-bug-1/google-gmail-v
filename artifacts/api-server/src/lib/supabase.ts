import { createClient } from "@supabase/supabase-js";
import { logger } from "./logger";

const url = process.env["SUPABASE_URL"];
const key = process.env["SUPABASE_KEY"];

if (!url || !key) {
  logger.warn("SUPABASE_URL or SUPABASE_KEY not set — Supabase sync disabled");
}

export const supabase = url && key ? createClient(url, key) : null;

export async function sbInsert(table: string, data: Record<string, unknown>) {
  if (!supabase) return;
  try {
    const { error } = await supabase.from(table).insert(data);
    if (error) {
      logger.warn({ error, table }, "Supabase insert error");
    }
  } catch (err) {
    logger.warn({ err, table }, "Supabase insert exception");
  }
}
