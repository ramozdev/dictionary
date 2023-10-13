import { z } from "zod";

const updateDefinitionsSchema = z
  .object({
    definition: z.string(),
  })
  .partial()
  .extend({
    definitionId: z
      .string()
      .min(1)
      .refine((id) => !id || !isNaN(parseFloat(id)), {
        message: "id must be a number.",
      })
      .transform((id) => Number(id)),
  })
  .array();

export { updateDefinitionsSchema };

type UpdateDefinitionsInput = z.input<typeof updateDefinitionsSchema>;

export type { UpdateDefinitionsInput };
