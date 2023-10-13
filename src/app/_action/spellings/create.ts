"use server";

import { type HandleFormSchema } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { spellings } from "@/server/db/schema";

export async function createSpellings(
  data: HandleFormSchema["create"]["spellings"],
) {
  if (data.length === 0) return;
  await db.insert(spellings).values(data);
}
