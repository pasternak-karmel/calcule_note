import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    // url: process.env.DATABASE_URL!,
    url: "postgresql://calcule_note_owner:0gB5LdeUjoAn@ep-still-term-a5lfsaq9.us-east-2.aws.neon.tech/calcule_note?sslmode=require",
  },
  verbose: true,
  strict: true,
});
