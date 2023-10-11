import * as z from "zod";

export const sessionModel = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z
    .string()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "A valid date is required.",
    })
    .transform((date) => new Date(date)),
});
