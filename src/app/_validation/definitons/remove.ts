import { z } from "zod";

const removeDefinitionsSchema = z
  .string()
  .min(1)
  .refine((id) => !id || !isNaN(parseFloat(id)), {
    message: "id must be a number.",
  })
  .transform((id) => Number(id))
  .array();

export { removeDefinitionsSchema };

type RemoveDefinitionsInput = z.input<typeof removeDefinitionsSchema>;

export type { RemoveDefinitionsInput };
