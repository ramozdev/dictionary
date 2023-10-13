"use server";

import { type HandleFormOuput } from "@/app/_validation/handleForm";
import { db } from "@/server/db";
import { definitions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function updateDefinitions(
  data: HandleFormOuput["update"]["definitions"],
) {
  for (const { definitionId, ...definition } of data) {
    await db
      .update(definitions)
      .set(definition)
      .where(eq(definitions.id, definitionId));
  }
}
