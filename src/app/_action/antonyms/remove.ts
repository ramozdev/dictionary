"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { antonyms } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function removeAntonyms(
  data: HandleFormOuput["remove"]["antonyms"],
) {
  for (const id of data) {
    await db.delete(antonyms).where(eq(antonyms.id, id));
  }
}
