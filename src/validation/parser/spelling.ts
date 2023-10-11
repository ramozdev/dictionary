import * as z from "zod";

export const spellingModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  spelling: z.string(),
});
