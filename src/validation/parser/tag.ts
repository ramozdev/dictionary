import * as z from "zod";

export const tagModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  tag: z.string(),
});
