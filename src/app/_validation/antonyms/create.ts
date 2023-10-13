import { z } from "zod";

const createAntonymsSchema = z
  .object({
    antonym: z.string(),
  })
  .array();

export { createAntonymsSchema };

type CreateAntonymsInput = z.input<typeof createAntonymsSchema>;

export type { CreateAntonymsInput };
