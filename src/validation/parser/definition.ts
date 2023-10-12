import { definitions } from "@/server/db/schema";
import * as z from "zod";

export const definitionModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  definition: z.string().min(1),
  idiom: z.string().min(1),
  pos: z.enum(definitions.pos.enumValues),
  slangId: z.number().transform((id) => id.toString()),
});
