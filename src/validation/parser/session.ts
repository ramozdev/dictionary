import * as z from "zod";

export const sessionModelParser = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.date().transform((val) => val.toISOString()),
});
