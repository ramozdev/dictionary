import { abbreviationsToSlangs } from "@/server/db/schema/abbreviations-to-slangs";
import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

const abbreviations = mysqlTable("abbreviations", {
  id: serial("id").primaryKey(),
  abbreviation: varchar("abbreviation", { length: 191 }).notNull().unique(),
});

const abbreviationsRelations = relations(abbreviations, ({ many }) => ({
  slangs: many(abbreviationsToSlangs),
}));

export { abbreviations, abbreviationsRelations };
