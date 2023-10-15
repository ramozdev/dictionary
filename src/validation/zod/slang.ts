import * as z from "zod";

export const slangModel = z.object({
  id: z
    .string()
    .refine((id) => !id || !isNaN(parseFloat(id)), {
      message: "id must be a number.",
    })
    .transform((id) => Number(id)),
  slang: z.string().min(1),
  slug: z.string().min(1),
  createdAt: z
    .string()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "A valid date is required.",
    })
    .transform((date) => new Date(date)),
  updatedAt: z
    .string()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "A valid date is required.",
    })
    .transform((date) => new Date(date)),
  explicit: z.string().transform((val) => val === "true"),
  diminutive: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .nullish(),
  augmentative: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .nullish(),
  userId: z.string().uuid(),
});
