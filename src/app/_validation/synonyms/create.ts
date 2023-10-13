import { z } from "zod";

const createSynonymsSchema = z
  .object({
    synonym: z.string(),
  })
  .array();

export { createSynonymsSchema };

type CreateSynonymsInput = z.input<typeof createSynonymsSchema>;

export type { CreateSynonymsInput };
