"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { tags } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateTags(data: HandleFormOuput["update"]["tags"]) {
  for (const { tagId, ...tag } of data) {
    await db.update(tags).set(tag).where(eq(tags.id, tagId));
  }
}
