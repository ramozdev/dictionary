import { slangs } from "@/server/db/schema/slangs";
import { relations } from "drizzle-orm";
import { bigint, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

const spellings = mysqlTable("spellings", {
  id: serial("id").primaryKey(),
  spelling: varchar("spelling", { length: 191 }).notNull().unique(),
  slangId: bigint("slangId", { mode: "number" }).notNull(),
});

const spellingsRelations = relations(spellings, ({ one }) => ({
  slang: one(slangs, {
    fields: [spellings.slangId],
    references: [slangs.id],
  }),
}));

export { spellings, spellingsRelations };
