"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { antonyms } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateAntonyms(
  data: HandleFormOuput["update"]["antonyms"],
) {
  for (const { antonymId, ...antonym } of data) {
    await db.update(antonyms).set(antonym).where(eq(antonyms.id, antonymId));
  }
}
