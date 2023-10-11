import * as z from "zod";

export const userModelParser = z.object({
  id: z.string(),
  name: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  email: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
  emailVerified: z
    .date()
    .nullable()
    .transform((val) => (val ? val.toISOString() : "")),
  image: z
    .string()
    .nullable()
    .transform((val) => val ?? ""),
});
