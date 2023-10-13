"use server";

import { type HandleFormSchema } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { definitions } from "@/server/db/schema";

export async function createDefinitions(
  data: HandleFormSchema["create"]["definitions"],
) {
  if (data.length === 0) return;
  await db.insert(definitions).values(data);
}
