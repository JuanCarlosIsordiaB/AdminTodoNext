import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany({}); // DELETE * TODOS

  await prisma.todo.createMany({
    data: [
      { description: "Learn Prisma", completed: true },
      { description: "Learn Prisma" },
      { description: "Learn Prisma" },
      { description: "Learn Prisma" },
      { description: "Learn Prisma" },
      { description: "Learn Prisma" },
    ],
  });

  return NextResponse.json({ message: "Seed data created" });
}
