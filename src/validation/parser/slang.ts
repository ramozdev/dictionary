import * as z from "zod";

export const slangModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  slang: z.string(),
});
