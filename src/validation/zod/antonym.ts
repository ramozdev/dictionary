import * as z from "zod";

export const antonymModel = z.object({
  id: z
    .string()
    .refine((id) => !id || !isNaN(parseFloat(id)), {
      message: "id must be a number.",
    })
    .transform((id) => Number(id)),
  antonym: z.string().min(1),
});
