"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { tags } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function removeTags(data: HandleFormOuput["remove"]["tags"]) {
  for (const id of data) {
    await db.delete(tags).where(eq(tags.id, id));
  }
}
