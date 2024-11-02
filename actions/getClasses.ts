"use server";

import { db } from "@/db/drizzle";
import { classes } from "@/db/schema";
import { getUser } from "@/lib/session";

export const GetClasses = async () => {
  const session = await getUser();
  if (!session || session.role !== "admin") {
    return { error: "You're not allowed to be here!" };
  }

  const articleAttente = await db.select().from(classes);
  // .where(eq(classes.userId, userId));

  if (!articleAttente || articleAttente.length === 0) {
    return { error: "Pas encore de classe" };
  }

  return articleAttente;
};
