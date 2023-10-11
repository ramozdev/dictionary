import * as z from "zod";

export const definitionModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  definition: z.string(),
});
