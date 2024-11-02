import { db } from "@/db/drizzle";
import { NextResponse } from "next/server";
import { getUser } from "@/lib/session";
import { classes } from "@/db/schema";

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

    const { nom } = await req.json();
    const [result] = await db.insert(classes).values({ name: nom }).returning();

    return NextResponse.json(
      { success: true, message: `Classe créée avec ID: ${result.id}` },
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
