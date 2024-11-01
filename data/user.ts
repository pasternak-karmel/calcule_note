import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

import { users } from "@/db/schema";

export const getUserByEmail = async (username: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    return user.length > 0 ? user[0] : null;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    return user.length > 0 ? user[0] : null;
  } catch {
    return null;
  }
};
