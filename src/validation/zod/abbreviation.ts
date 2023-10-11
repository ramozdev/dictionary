import * as z from "zod";

export const abbreviationModel = z.object({
  id: z
    .string()
    .refine((id) => !id || !isNaN(parseFloat(id)), {
      message: "id must be a number.",
    })
    .transform((id) => Number(id)),
  abbreviation: z.string().min(1),
});
