"use server";

import { type HandleFormSchema } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { abbreviations } from "@/server/db/schema";

export async function createAbbreviations(
  data: HandleFormSchema["create"]["abbreviations"],
) {
  if (data.length === 0) return;
  await db.insert(abbreviations).values(data);
}
