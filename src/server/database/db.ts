import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  pool?: Pool;
};

const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: false,
  });

globalForDb.pool = pool;

export const db = drizzle(pool, {
  logger: true,
});
