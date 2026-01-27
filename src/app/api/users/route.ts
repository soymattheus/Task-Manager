import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    {
      fullName: "João Silva",
      createdAt: "2024-01-05",
      status: "A",
    },
    {
      fullName: "Maria Oliveira",
      createdAt: "2024-01-12",
      status: "I",
    },
    {
      fullName: "Carlos Pereira",
      createdAt: "2024-02-03",
      status: "I",
    },
    {
      fullName: "Ana Costa",
      createdAt: "2024-02-15",
      status: "A",
    },
    {
      fullName: "Lucas Santos",
      createdAt: "2024-03-01",
      status: "A",
    },
    {
      fullName: "Fernanda Rocha",
      createdAt: "2024-03-10",
      status: "I",
    },
    {
      fullName: "Rafael Lima",
      createdAt: "2024-03-18",
      status: "I",
    },
    {
      fullName: "Juliana Alves",
      createdAt: "2024-04-02",
      status: "A",
    },
    {
      fullName: "Pedro Martins",
      createdAt: "2024-04-11",
      status: "A",
    },
    {
      fullName: "Beatriz Fernandes",
      createdAt: "2024-04-20",
      status: "A",
    },
  ];

  return NextResponse.json(users);
}
