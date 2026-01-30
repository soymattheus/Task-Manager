import type { Config } from "drizzle-kit";

export default {
  schema: "src/drizzle/schema/*",
  out: "src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
