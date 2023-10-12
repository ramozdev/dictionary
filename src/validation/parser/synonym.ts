import * as z from "zod";

export const synonymModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  synonym: z.string().min(1),
});
