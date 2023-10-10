import { users } from "@/server/db/schema/users";
import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  varchar,
  primaryKey,
  index,
  text,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  ({ provider, providerAccountId, userId }) => ({
    compoundKey: primaryKey(provider, providerAccountId),
    userIdIdx: index("userId_idx").on(userId),
  }),
);

const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export { accounts, accountsRelations };
