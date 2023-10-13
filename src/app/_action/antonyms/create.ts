"use server";

import { type HandleFormSchema } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { antonyms } from "@/server/db/schema";

export async function createAntonyms(
  data: HandleFormSchema["create"]["antonyms"],
) {
  if (data.length === 0) return;
  await db.insert(antonyms).values(data);
}
