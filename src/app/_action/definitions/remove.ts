"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { definitions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function removeDefinitions(
  data: HandleFormOuput["remove"]["definitions"],
) {
  for (const id of data) {
    await db.delete(definitions).where(eq(definitions.id, id));
  }
}
