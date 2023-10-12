import { antonymsToSlangs } from "@/server/db/schema/antonyms-to-slangs";
import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

const antonyms = mysqlTable("antonyms", {
  id: serial("id").primaryKey(),
  antonym: varchar("antonym", { length: 191 }).notNull().unique(),
});

const antonymsRelations = relations(antonyms, ({ many }) => ({
  slangs: many(antonymsToSlangs),
}));

export { antonyms, antonymsRelations };
