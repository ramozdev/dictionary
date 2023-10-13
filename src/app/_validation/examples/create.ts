import { z } from "zod";

const createExamplesSchema = z
  .object({
    example: z.string(),
    definitionId: z.number(),
  })
  .array();

export { createExamplesSchema };

type CreateExamplesInput = z.input<typeof createExamplesSchema>;

export type { CreateExamplesInput };
