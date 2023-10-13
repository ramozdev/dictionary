"use server";

import { type HandleFormSchema } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { examples } from "@/server/db/schema";

export async function createExamples(
  data: HandleFormSchema["create"]["examples"],
) {
  if (data.length === 0) return;
  await db.insert(examples).values(data);
}
