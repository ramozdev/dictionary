"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { synonyms } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function removeSynonyms(
  data: HandleFormOuput["remove"]["synonyms"],
) {
  for (const id of data) {
    await db.delete(synonyms).where(eq(synonyms.id, id));
  }
}
