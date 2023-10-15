import { z } from "zod";

const searchSchema = z.object({
  search: z.string(),
});

export { searchSchema };

type SearchInput = z.input<typeof searchSchema>;

export type { SearchInput };
