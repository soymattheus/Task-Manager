import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  pgPool?: Pool;
  drizzle?: ReturnType<typeof drizzle>;
};

const pool =
  globalForDb.pgPool ??
  new Pool({
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Railway / Neon / Supabase
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = pool;
}

export const db =
  globalForDb.drizzle ??
  drizzle(pool, {
    logger: process.env.NODE_ENV === "development",
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.drizzle = db;
}
