import { abbreviations } from "@/server/db/schema/abbreviations";
import { antonyms } from "@/server/db/schema/antonyms";
import { definitions } from "@/server/db/schema/definitions";
import { spellings } from "@/server/db/schema/spellings";
import { synonyms } from "@/server/db/schema/synonyms";
import { tags } from "@/server/db/schema/tags";
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
  explicit: boolean("explicit").default(false),
  diminutive: varchar("diminutive", { length: 191 }),
  augmentative: varchar("augmentative", { length: 191 }),
  userId: varchar("userId", { length: 255 }).notNull(),
});

const slangsRelations = relations(slangs, ({ many, one }) => ({
  spellings: many(spellings),
  synonyms: many(synonyms),
  antonyms: many(antonyms),
  abbreviations: many(abbreviations),
  definitions: many(definitions),
  tags: many(tags),
  user: one(users, {
    fields: [slangs.userId],
    references: [users.id],
  }),
}));

export { slangs, slangsRelations };
