CREATE TABLE IF NOT EXISTS "classes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ec" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ue_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grades" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"ec_id" text NOT NULL,
	"grade" numeric(5, 2) NOT NULL,
	"date" timestamp DEFAULT now(),
	"validated" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professor_ec_assignments" (
	"id" text PRIMARY KEY NOT NULL,
	"professor_id" text NOT NULL,
	"ec_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professors" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"class_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "report_cards" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"pdf_path" text,
	"validated" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "semesters" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"class_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ue" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"credits" integer NOT NULL,
	"class_id" text NOT NULL,
	"semester_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"username" text NOT NULL,
	"password" text,
	"role" text DEFAULT 'user' NOT NULL,
	"two_factor_secret" text,
	"two_factor_enabled" boolean DEFAULT false,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ec" ADD CONSTRAINT "ec_ue_id_ue_id_fk" FOREIGN KEY ("ue_id") REFERENCES "public"."ue"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grades" ADD CONSTRAINT "grades_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grades" ADD CONSTRAINT "grades_ec_id_ec_id_fk" FOREIGN KEY ("ec_id") REFERENCES "public"."ec"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professor_ec_assignments" ADD CONSTRAINT "professor_ec_assignments_professor_id_user_id_fk" FOREIGN KEY ("professor_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professor_ec_assignments" ADD CONSTRAINT "professor_ec_assignments_ec_id_ec_id_fk" FOREIGN KEY ("ec_id") REFERENCES "public"."ec"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professors" ADD CONSTRAINT "professors_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "professors" ADD CONSTRAINT "professors_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report_cards" ADD CONSTRAINT "report_cards_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ue" ADD CONSTRAINT "ue_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ue" ADD CONSTRAINT "ue_semester_id_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."semesters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
