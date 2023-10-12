import { synonyms } from "@/server/db/schema/synonyms";
import { slangs } from "@/server/db/schema/slangs";
import { relations } from "drizzle-orm";
import {
  bigint,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

export const synonymsToSlangs = mysqlTable(
  "synonyms_to_slangs",
  {
    synonymId: varchar("synonymId", { length: 255 }).notNull(),
    slangId: bigint("slangId", { mode: "number" }).notNull(),
  },
  ({ synonymId, slangId }) => ({
    pk: primaryKey(synonymId, slangId),
  }),
);

export const synonymsToSlangsRelations = relations(
  synonymsToSlangs,
  ({ one }) => ({
    slang: one(slangs, {
      fields: [synonymsToSlangs.slangId],
      references: [slangs.id],
    }),
    synonym: one(synonyms, {
      fields: [synonymsToSlangs.synonymId],
      references: [synonyms.id],
    }),
  }),
);
