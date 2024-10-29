import { boolean, pgTable, text } from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";

export const UserRoleEnum = {
  ADMIN: "admin",
  USER: "user",
  PROFESSEUR: "professeur",
};

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  username: text("username").unique(),
  password: text("password"),
  role: text("role").notNull().default("user"),
  two_factor_secret: text("two_factor_secret"),
  two_factor_enabled: boolean("two_factor_enabled").default(false),
});

export const InsertUserSchema = createInsertSchema(users);
