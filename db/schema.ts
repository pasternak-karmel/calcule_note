import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";

export const UserRoleEnum = {
  ADMIN: "admin",
  USER: "user",
  TRADUCTEUR: "traducteur",
};

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  salt: text("salt"),
  role: text("role").notNull().default("user"),
  two_factor_secret: text("two_factor_secret"),
  two_factor_enabled: boolean("two_factor_enabled").default(true),
});

export const InsertUserSchema = createInsertSchema(users);
