"use server";

import { createSlang } from "@/app/new/_action/slang";
import { createSlangSchema } from "@/app/new/validation";

export async function handleForm(formData: unknown) {
  const { slang } = createSlangSchema.parse(formData);

  await createSlang(slang);
}
