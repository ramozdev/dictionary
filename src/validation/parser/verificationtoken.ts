import * as z from "zod";

export const verificationTokenModel = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date().transform((val) => val.toISOString()),
});
