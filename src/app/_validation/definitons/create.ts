import { z } from "zod";

const createDefinitionsSchema = z
  .object({
    definition: z.string(),
    idiom: z.string(),
    slangId: z.number(),
  })
  .array();

export { createDefinitionsSchema };

type CreateDefinitionsInput = z.input<typeof createDefinitionsSchema>;

export type { CreateDefinitionsInput };
