import { headers } from "next/headers";
import { auth } from "@/utils/auth";
import { db } from "../database/db";

export async function createContext() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  return {
    db,
    session,
    userId: session?.user?.id,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
