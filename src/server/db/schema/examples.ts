import { definitions } from "@/server/db/schema/definitions";
import { relations } from "drizzle-orm";
import { bigint, mysqlTable, serial, text } from "drizzle-orm/mysql-core";

const examples = mysqlTable("examples", {
  id: serial("id").primaryKey(),
  example: text("example").notNull(),
  definitionId: bigint("definitionId", { mode: "number" }).notNull(),
});

const examplesRelations = relations(examples, ({ one }) => ({
  definition: one(definitions, {
    fields: [examples.definitionId],
    references: [definitions.id],
  }),
}));

export { examples, examplesRelations };
