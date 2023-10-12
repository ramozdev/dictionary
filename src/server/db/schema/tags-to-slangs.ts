import { tags } from "@/server/db/schema/tags";
import { slangs } from "@/server/db/schema/slangs";
import { relations } from "drizzle-orm";
import {
  bigint,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

export const tagsToSlangs = mysqlTable(
  "tags_to_slangs",
  {
    tagId: varchar("tagId", { length: 255 }).notNull(),
    slangId: bigint("slangId", { mode: "number" }).notNull(),
  },
  ({ tagId, slangId }) => ({
    pk: primaryKey(tagId, slangId),
  }),
);

export const tagsToSlangsRelations = relations(tagsToSlangs, ({ one }) => ({
  slang: one(slangs, {
    fields: [tagsToSlangs.slangId],
    references: [slangs.id],
  }),
  tag: one(tags, {
    fields: [tagsToSlangs.tagId],
    references: [tags.id],
  }),
}));
