"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { slangs } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateSlangs(data: HandleFormOuput["update"]["slangs"]) {
  for (const { slangId, ...slang } of data) {
    await db.update(slangs).set(slang).where(eq(slangs.id, slangId));
  }
}
