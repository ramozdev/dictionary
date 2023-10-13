"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { examples } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateExamples(
  data: HandleFormOuput["update"]["examples"],
) {
  for (const { exampleId, ...example } of data) {
    await db.update(examples).set(example).where(eq(examples.id, exampleId));
  }
}
