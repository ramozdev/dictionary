"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { abbreviations } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateAbbreviations(
  data: HandleFormOuput["update"]["abbreviations"],
) {
  for (const { abbreviationId, ...abbreviation } of data) {
    await db
      .update(abbreviations)
      .set(abbreviation)
      .where(eq(abbreviations.id, abbreviationId));
  }
}
