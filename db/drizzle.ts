import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

console.log("Database URL:", process.env.DATABASE_URL);
// export const sql = neon(process.env.DATABASE_URL || "");
export const sql = neon(
  "postgresql://calcule_note_owner:0gB5LdeUjoAn@ep-still-term-a5lfsaq9.us-east-2.aws.neon.tech/calcule_note?sslmode=require"
);
export const db = drizzle(sql);
