import { eq } from "drizzle-orm";
import { CourseFormData, ServerActionResponse } from "@/types";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { type EC, ec, ue } from "@/db/schema";

export async function addCourse(
  semesterId: string,
  courseData: CourseFormData
): Promise<ServerActionResponse<EC>> {
  try {
    // First create the UE
    const [newUE] = await db
      .insert(ue)
      .values({
        name: courseData.contenu,
        credits: courseData.cect,
        semesterId,
        classId: courseData.classId,
      })
      .returning();

    // Then create the EC
    const [newEC] = await db
      .insert(ec)
      .values({
        name: courseData.enseignement,
        ueId: newUE.id,
        codeEC: courseData.codeEC,
        contenu: courseData.contenu,
        enseignement: courseData.enseignement,
        cours: courseData.cours,
        tpTd: courseData.tpTd,
        sp: courseData.sp,
        tpe: courseData.tpe,
        ctt: courseData.ctt,
        cect: courseData.cect,
        cc: courseData.cc,
        et: courseData.et,
        ccEt: courseData.ccEt,
      })
      .returning();

    revalidatePath("/[classId]");
    return { data: newEC };
  } catch (error) {
    console.error("Error adding course:", error);
    return { error: "Failed to add course" };
  }
}

export async function updateCourse(
  courseId: string,
  courseData: Partial<CourseFormData>
): Promise<ServerActionResponse<EC>> {
  try {
    const [updatedEC] = await db
      .update(ec)
      .set({
        name: courseData.enseignement,
        codeEC: courseData.codeEC,
        contenu: courseData.contenu,
        enseignement: courseData.enseignement,
        cours: courseData.cours,
        tpTd: courseData.tpTd,
        sp: courseData.sp,
        tpe: courseData.tpe,
        ctt: courseData.ctt,
        cect: courseData.cect,
        cc: courseData.cc,
        et: courseData.et,
        ccEt: courseData.ccEt,
      })
      .where(eq(ec.id, courseId))
      .returning();

    revalidatePath("/[classId]");
    return { data: updatedEC };
  } catch (error) {
    console.error("Error updating course:", error);
    return { error: "Failed to update course" };
  }
}

export async function deleteCourse(
  courseId: string
): Promise<ServerActionResponse<boolean>> {
  try {
    await db.delete(ec).where(eq(ec.id, courseId));
    revalidatePath("/[classId]");
    return { data: true };
  } catch (error) {
    console.error("Error deleting course:", error);
    return { error: "Failed to delete course" };
  }
}
