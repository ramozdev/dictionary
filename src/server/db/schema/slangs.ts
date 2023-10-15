import { abbreviationsToSlangs } from "@/server/db/schema/abbreviations-to-slangs";
import { antonymsToSlangs } from "@/server/db/schema/antonyms-to-slangs";
import { definitions } from "@/server/db/schema/definitions";
import { spellings } from "@/server/db/schema/spellings";
import { synonymsToSlangs } from "@/server/db/schema/synonyms-to-slangs";
import { tagsToSlangs } from "@/server/db/schema/tags-to-slangs";
import { users } from "@/server/db/schema/users";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

const slangs = mysqlTable("slangs", {
  id: serial("id").primaryKey(),
  slang: varchar("slang", { length: 191 }).notNull().unique(),
  slug: varchar("slug", { length: 191 }).notNull().unique(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  explicit: boolean("explicit").default(false).notNull(),
  diminutive: varchar("diminutive", { length: 191 }),
  augmentative: varchar("augmentative", { length: 191 }),
  userId: varchar("userId", { length: 255 }).notNull(),
});

const slangsRelations = relations(slangs, ({ many, one }) => ({
  abbreviations: many(abbreviationsToSlangs),
  antonyms: many(antonymsToSlangs),
  definitions: many(definitions),
  spellings: many(spellings),
  synonyms: many(synonymsToSlangs),
  tags: many(tagsToSlangs),
  user: one(users, {
    fields: [slangs.userId],
    references: [users.id],
  }),
}));

export { slangs, slangsRelations };
