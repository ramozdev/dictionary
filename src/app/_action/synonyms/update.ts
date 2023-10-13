"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { synonyms } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateSynonyms(
  data: HandleFormOuput["update"]["synonyms"],
) {
  for (const { synonymId, ...synonym } of data) {
    await db.update(synonyms).set(synonym).where(eq(synonyms.id, synonymId));
  }
}
