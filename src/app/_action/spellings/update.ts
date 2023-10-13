"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { spellings } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateSpellings(
  data: HandleFormOuput["update"]["spellings"],
) {
  for (const { spellingId, ...spelling } of data) {
    await db
      .update(spellings)
      .set(spelling)
      .where(eq(spellings.id, spellingId));
  }
}
