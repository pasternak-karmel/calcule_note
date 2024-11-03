import { db } from "@/db/drizzle";
import { semesters, ue, ec, classes } from "@/db/schema";

async function setupDatabase() {
  console.log("Setting up database...");

  // Create classes
  const [class1] = await db
    .insert(classes)
    .values({ name: "L2", description: "Licence 2" })
    .returning();
  console.log("Created class:", class1);

  // Create semesters
  const [semester1, semester2] = await db
    .insert(semesters)
    .values([
      {
        name: "Semestre 3",
        startDate: new Date("2023-09-01"),
        endDate: new Date("2024-01-31"),
      },
      {
        name: "Semestre 4",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-06-30"),
      },
    ])
    .returning();
  console.log("Created semesters:", semester1, semester2);

  // Create UEs
  const [ue1, ue2] = await db
    .insert(ue)
    .values([
      { name: "UE3", credits: 6, classId: class1.id, semesterId: semester1.id },
      { name: "UE4", credits: 6, classId: class1.id, semesterId: semester2.id },
    ])
    .returning();
  console.log("Created UEs:", ue1, ue2);

  // Create ECs
  const [ec1, ec2] = await db
    .insert(ec)
    .values([
      {
        name: "mathematica",
        ueId: ue1.id,
        codeEC: "MATH101",
        contenu: "Mathematica fundamental",
        enseignement: "practical work",
        cours: 20,
        tpTd: 20,
        sp: 10,
        tpe: 30,
        ctt: 80,
        cect: 3,
        cc: true,
        et: true,
        ccEt: false,
      },
      {
        name: "Python Structures",
        ueId: ue2.id,
        codeEC: "PROG102",
        contenu: "Python data structures",
        enseignement: "Python lab work",
        cours: 24,
        tpTd: 24,
        sp: 12,
        tpe: 40,
        ctt: 100,
        cect: 4,
        cc: true,
        et: true,
        ccEt: true,
      },
    ])
    .returning();
  console.log("Created ECs:", ec1, ec2);

  console.log("Database setup complete!");
}

setupDatabase().catch(console.error);
