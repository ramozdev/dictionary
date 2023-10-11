import * as z from "zod";

export const verificationTokenModel = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z
    .string()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "A valid date is required.",
    })
    .transform((date) => new Date(date)),
});
