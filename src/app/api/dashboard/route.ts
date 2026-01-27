import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const user = {
    fullName: "Matheus Tavares",
    createdAt: "2026-01-26",
    status: "A",
    tasks: [
      { label: "Not Started", value: 3 },
      { label: "Started", value: 1 },
      { label: "Completed", value: 7 },
      { label: "Canceled", value: 2 },
    ],
  };

  return NextResponse.json(user);
}
