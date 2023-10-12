import * as z from "zod";

export const antonymModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  antonym: z.string().min(1),
});
