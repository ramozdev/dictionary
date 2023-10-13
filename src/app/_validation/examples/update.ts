import { z } from "zod";

const updateExamplesSchema = z
  .object({
    example: z.string(),
  })
  .partial()
  .extend({
    exampleId: z
      .string()
      .min(1)
      .refine((id) => !id || !isNaN(parseFloat(id)), {
        message: "id must be a number.",
      })
      .transform((id) => Number(id)),
  })
  .array();

export { updateExamplesSchema };

type UpdateExamplesInput = z.input<typeof updateExamplesSchema>;

export type { UpdateExamplesInput };
