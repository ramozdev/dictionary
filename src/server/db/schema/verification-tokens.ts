import {
  mysqlTable,
  timestamp,
  varchar,
  primaryKey,
} from "drizzle-orm/mysql-core";

const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  ({ identifier, token }) => ({
    compoundKey: primaryKey(identifier, token),
  }),
);

export { verificationTokens };
