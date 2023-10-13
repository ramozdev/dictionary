"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { examples } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function removeExamples(
  data: HandleFormOuput["remove"]["examples"],
) {
  for (const id of data) {
    await db.delete(examples).where(eq(examples.id, id));
  }
}
