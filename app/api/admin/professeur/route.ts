import { db } from "@/db/drizzle";
import { professors, users } from "@/db/schema";
import { getUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getUser();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Veuillez vous connecter ou vérifier vos autorisations.",
        },
        { status: 401 }
      );
    }

    const { nom, username, role } = await req.json();

    const [result] = await db
      .insert(users)
      .values({ name: nom, username, role })
      .returning();

    const [insertProf] = await db
      .insert(professors)
      .values({ userId: result.id })
      .returning();

    return NextResponse.json(
      { success: true, message: `${insertProf.id}` },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: `Une erreur s'est produite: ${err}` },
      { status: 500 }
    );
  }
}
