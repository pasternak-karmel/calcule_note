import {
  boolean,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

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
  username: text("username").unique().notNull(),
  password: text("password"),
  role: text("role").notNull().default("user"),
  two_factor_secret: text("two_factor_secret"),
  two_factor_enabled: boolean("two_factor_enabled").default(false),
});

export const InsertUserSchema = createInsertSchema(users);

// Table des semestres
export const semesters = pgTable("semesters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(), // e.g., "Semestre 1", "Semestre 2"
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
});

// Table des classes
export const classes = pgTable("classes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(), // e.g., "L1", "L2", etc.
  description: text("description"),
});

// Table des unités d'enseignement (UE)
export const ue = pgTable("ue", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  credits: integer("credits").notNull(), // Nombre de crédits pour l'UE
  classId: text("class_id")
    .references(() => classes.id)
    .notNull(), // Relation avec la classe
  semesterId: text("semester_id").references(() => semesters.id), // Relation avec le semestre
});

// Table des éléments constitutifs (EC)
export const ec = pgTable("ec", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  ueId: text("ue_id")
    .references(() => ue.id)
    .notNull(),
  codeEC: text("code_ec").notNull(),
  contenu: text("contenu").notNull(),
  enseignement: text("enseignement").notNull(),
  cours: integer("cours").default(0),
  tpTd: integer("tp_td").default(0),
  sp: integer("sp").default(0),
  tpe: integer("tpe").default(0),
  ctt: integer("ctt").default(0),
  cect: integer("cect").default(0),
  cc: boolean("cc").default(false),
  et: boolean("et").default(false),
  ccEt: boolean("cc_et").default(false),
});

// Create Zod schemas for type validation
export const InsertECSchema = createInsertSchema(ec);
export type EC = typeof ec.$inferSelect;
export type NewEC = typeof ec.$inferInsert;

// You might also want to create a combined type for the frontend
export type CourseWithUE = {
  id: string;
  codeUE: string;
  codeEC: string;
  contenu: string;
  enseignement: string;
  cours: number;
  tpTd: number;
  sp: number;
  tpe: number;
  ctt: number;
  cect: number;
  cc: boolean;
  et: boolean;
  ccEt: boolean;
  professor: string;
};

export type SemesterWithCourses = {
  id: string;
  name: string;
  courses: CourseWithUE[];
}; 

// Table de liaison entre les professeurs et les EC (responsabilités)
export const professorEcAssignments = pgTable("professor_ec_assignments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  professorId: text("professor_id")
    .references(() => users.id)
    .notNull(),
  ecId: text("ec_id")
    .references(() => ec.id)
    .notNull(),
});

// Table des professeurs
export const professors = pgTable("professors", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(), // Relation avec l'utilisateur
  classId: text("class_id").references(() => classes.id), // Classe attribuée au professeur
});

// Table des étudiants
export const students = pgTable("students", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(), // Relation avec l'utilisateur
  classId: text("class_id")
    .references(() => classes.id)
    .notNull(), // Classe de l'étudiant
});

// Table des notes
export const grades = pgTable("grades", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  studentId: text("student_id")
    .references(() => students.id)
    .notNull(), // Étudiant
  ecId: text("ec_id")
    .references(() => ec.id)
    .notNull(), // Élément constitutif (EC)
  grade: numeric("grade", { precision: 5, scale: 2 }).notNull(), // Note obtenue
  date: timestamp("date").defaultNow(), // Date de la note
  validated: boolean("validated").default(false), // Indicateur pour la validation de la note
});

// Table des bulletins
export const reportCards = pgTable("report_cards", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  studentId: text("student_id")
    .references(() => students.id)
    .notNull(), // Étudiant
  createdAt: timestamp("created_at").defaultNow(), // Date de création du bulletin
  pdfPath: text("pdf_path"), // Chemin du fichier PDF généré
  validated: boolean("validated").default(false), // Indicateur pour la validation du bulletin
});
