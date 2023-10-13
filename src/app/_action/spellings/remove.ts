"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { spellings } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function removeSpellings(
  data: HandleFormOuput["remove"]["spellings"],
) {
  for (const id of data) {
    await db.delete(spellings).where(eq(spellings.id, id));
  }
}
