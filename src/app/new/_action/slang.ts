"use server";

import { type CreateSlangInput } from "@/app/new/validation";
import { db } from "@/server/db";
import { slangs } from "@/server/db/schema";

export async function createSlang(data: CreateSlangInput["slang"]) {
  const response = await db.insert(slangs).values(data);

  return Number(response.insertId);
}
