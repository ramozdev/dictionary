import * as z from "zod";

export const exampleModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  example: z.string(),
});
