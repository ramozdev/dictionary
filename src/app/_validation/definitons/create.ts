import { definitionModelParser } from "@/validation/parser";
import type { z } from "zod";

const createDefinitionsSchema = definitionModelParser
  .pick({
    definition: true,
    idiom: true,
    slangId: true,
  })
  .array();

export { createDefinitionsSchema };

type CreateDefinitionsInput = z.input<typeof createDefinitionsSchema>;

export type { CreateDefinitionsInput };
