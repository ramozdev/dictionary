"use server";

import { type HandleFormSchema } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { tags } from "@/server/db/schema";

export async function createTags(data: HandleFormSchema["create"]["tags"]) {
  if (data.length === 0) return;
  await db.insert(tags).values(data);
}
