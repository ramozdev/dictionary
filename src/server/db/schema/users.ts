import { accounts } from "@/server/db/schema/accounts";
import { sessions } from "@/server/db/schema/sessions";
import { slangs } from "@/server/db/schema/slangs";
import { relations, sql } from "drizzle-orm";
import { index, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

const users = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", {
      mode: "date",
      fsp: 3,
    }).default(sql`CURRENT_TIMESTAMP(3)`),
    image: varchar("image", { length: 255 }),
  },
  ({ email }) => ({
    emailIdx: index("email_idx").on(email),
  }),
);

const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  slangs: many(slangs),
}));

export { users, usersRelations };
