import * as z from "zod";

export const exampleModel = z.object({
  id: z
    .string()
    .refine((id) => !id || !isNaN(parseFloat(id)), {
      message: "id must be a number.",
    })
    .transform((id) => Number(id)),
  example: z.string().min(1),
  definitionId: z
    .string()
    .refine((id) => !id || !isNaN(parseFloat(id)), {
      message: "id must be a number.",
    })
    .transform((id) => Number(id)),
});
