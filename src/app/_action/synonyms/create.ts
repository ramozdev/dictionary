"use server";

import { type HandleFormSchema } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { synonyms } from "@/server/db/schema";

export async function createSynonyms(
  data: HandleFormSchema["create"]["synonyms"],
) {
  if (data.length === 0) return;
  await db.insert(synonyms).values(data);
}
