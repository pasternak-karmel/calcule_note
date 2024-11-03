ALTER TABLE "ec" ADD COLUMN "code_ec" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "contenu" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "enseignement" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "cours" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "tp_td" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "sp" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "tpe" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "ctt" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "cect" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "cc" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "et" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "ec" ADD COLUMN "cc_et" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_name_unique" UNIQUE("name");