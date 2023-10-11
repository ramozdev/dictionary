import { slangs } from "@/server/db/schema/slangs";
import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

const synonyms = mysqlTable("synonyms", {
  id: serial("id").primaryKey(),
  synonym: varchar("synonym", { length: 191 }).notNull().unique(),
});

const synonymsRelations = relations(synonyms, ({ many }) => ({
  slangs: many(slangs),
}));

export { synonyms, synonymsRelations };
