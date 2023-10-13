"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { abbreviations } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function removeAbbreviations(
  data: HandleFormOuput["remove"]["abbreviations"],
) {
  for (const id of data) {
    await db.delete(abbreviations).where(eq(abbreviations.id, id));
  }
}
