import * as z from "zod";

export const slangModelParser = z.object({
  id: z.number().transform((id) => id.toString()),
  slang: z.string().min(1),
  slug: z.string().min(1),
  createdAt: z.date().transform((val) => (val ? val.toISOString() : "")),
  updatedAt: z.date().transform((val) => (val ? val.toISOString() : "")),
  explicit: z.boolean().transform((val) => val.toString()),
  diminutive: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  augmentative: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  userId: z.string().uuid(),
});
