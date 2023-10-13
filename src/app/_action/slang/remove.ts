"use server";

import {
  type RemoveSlangsInput,
  removeSlangsSchema,
} from "@/app/_validation/slangs/remove";
import { db } from "@/server/db";
import { slangs } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function removeSlangs(data: RemoveSlangsInput) {
  const parsedData = removeSlangsSchema.parse(data);

  for (const id of parsedData) {
    await db.delete(slangs).where(eq(slangs.id, id));
  }
}
