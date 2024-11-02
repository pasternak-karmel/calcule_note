import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { semesters, ue, ec, professorEcAssignments, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch all semesters
    const allSemesters = await db.select().from(semesters);

    if (allSemesters.length === 0) {
      return NextResponse.json(
        { message: "No semesters found. Please run the setup script." },
        { status: 404 }
      );
    }

    // Fetch courses for each semester
    const semestersWithCourses = await Promise.all(
      allSemesters.map(async (semester) => {
        const courses = await db
          .select({
            id: ec.id,
            codeUE: ue.name,
            codeEC: ec.codeEC,
            contenu: ec.contenu,
            enseignement: ec.enseignement,
            cours: ec.cours,
            tpTd: ec.tpTd,
            sp: ec.sp,
            tpe: ec.tpe,
            ctt: ec.ctt,
            cect: ec.cect,
            cc: ec.cc,
            et: ec.et,
            ccEt: ec.ccEt,
            professor: users.name,
          })
          .from(ec)
          .innerJoin(ue, eq(ec.ueId, ue.id))
          .leftJoin(
            professorEcAssignments,
            eq(ec.id, professorEcAssignments.ecId)
          )
          .leftJoin(users, eq(professorEcAssignments.professorId, users.id))
          .where(eq(ue.semesterId, semester.id));

        return {
          id: semester.id,
          name: semester.name,
          courses,
        };
      })
    );

    return NextResponse.json(semestersWithCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
