import { slangs } from "@/server/db/schema/slangs";
import { relations } from "drizzle-orm";
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

const tags = mysqlTable("tags", {
  id: serial("id").primaryKey(),
  tag: varchar("tag", { length: 191 }).notNull().unique(),
});

const tagsRelations = relations(tags, ({ many }) => ({
  slangs: many(slangs),
}));

export { tags, tagsRelations };
