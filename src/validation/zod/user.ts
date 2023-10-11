import * as z from "zod";

export const userModel = z.object({
  id: z.string().uuid(),
  name: z.string().transform((val) => (val === "" ? null : val)),
  email: z.string().transform((val) => (val === "" ? null : val)),
  emailVerified: z
    .string()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "A valid date is required.",
    })
    .transform((date) => new Date(date)),
  image: z.string().transform((val) => (val === "" ? null : val)),
});
