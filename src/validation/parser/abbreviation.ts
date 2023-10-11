import * as z from "zod";

export const abbreviationModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  abbreviation: z.string(),
});
