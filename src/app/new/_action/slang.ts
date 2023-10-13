"use server";

import {
  createSlangsSchema,
  type CreateSlangsInput,
} from "@/app/_validation/slangs";
import { db } from "@/server/db";
import { slangs } from "@/server/db/schema";

export async function createSlang(formData: CreateSlangsInput[0]) {
  const parsedData = createSlangsSchema.parse([formData]);

  const res = await db.insert(slangs).values(parsedData);
  return Number(res.insertId);
}
