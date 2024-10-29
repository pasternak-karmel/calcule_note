"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email déjà utilisé!" };
  }

  const user = {
    name,
    email,
    password: hashedPassword,
    // salt,
  };

  await db.insert(users).values(user).returning();

  return {
    success: "Inscription réussit!",
  };
};
