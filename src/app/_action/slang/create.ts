"use server";

import {
  type CreateSlangsInput,
  createSlangsSchema,
} from "@/app/_validation/slangs/create";
import { db } from "@/server/db";
import { slangs } from "@/server/db/schema";

export async function createSlangs(formData: CreateSlangsInput) {
  const parsedData = createSlangsSchema.parse(formData);

  await db.insert(slangs).values(parsedData);
}
