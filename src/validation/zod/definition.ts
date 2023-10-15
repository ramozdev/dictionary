import { definitions } from "@/server/db/schema";
import * as z from "zod";

export const definitionModel = z.object({
  id: z
    .string()
    .refine((id) => !id || !isNaN(parseFloat(id)), {
      message: "id must be a number.",
    })
    .transform((id) => Number(id)),
  definition: z.string().min(1),
  idiom: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .nullish(),
  pos: z.enum(definitions.pos.enumValues),
  slangId: z
    .string()
    .refine((id) => !id || !isNaN(parseFloat(id)), {
      message: "id must be a number.",
    })
    .transform((id) => Number(id)),
});
