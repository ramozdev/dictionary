import { z } from "zod";

const removeExamplesSchema = z
  .string()
  .min(1)
  .refine((id) => !id || !isNaN(parseFloat(id)), {
    message: "id must be a number.",
  })
  .transform((id) => Number(id))
  .array();

export { removeExamplesSchema };

type RemoveExamplesInput = z.input<typeof removeExamplesSchema>;

export type { RemoveExamplesInput };
