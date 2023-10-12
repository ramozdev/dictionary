import { abbreviations } from "@/server/db/schema/abbreviations";
import { slangs } from "@/server/db/schema/slangs";
import { relations } from "drizzle-orm";
import {
  bigint,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

export const abbreviationsToSlangs = mysqlTable(
  "abbreviations_to_slangs",
  {
    abbreviationId: varchar("abbreviationId", { length: 255 }).notNull(),
    slangId: bigint("slangId", { mode: "number" }).notNull(),
  },
  ({ abbreviationId, slangId }) => ({
    pk: primaryKey(abbreviationId, slangId),
  }),
);

export const abbreviationsToSlangsRelations = relations(
  abbreviationsToSlangs,
  ({ one }) => ({
    slang: one(slangs, {
      fields: [abbreviationsToSlangs.slangId],
      references: [slangs.id],
    }),
    abbreviation: one(abbreviations, {
      fields: [abbreviationsToSlangs.abbreviationId],
      references: [abbreviations.id],
    }),
  }),
);
