import { synonymsToSlangs } from "@/server/db/schema/synonyms-to-slangs";
import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

const synonyms = mysqlTable("synonyms", {
  id: serial("id").primaryKey(),
  synonym: varchar("synonym", { length: 191 }).notNull().unique(),
});

const synonymsRelations = relations(synonyms, ({ many }) => ({
  slangs: many(synonymsToSlangs),
}));

export { synonyms, synonymsRelations };
