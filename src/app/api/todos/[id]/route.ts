import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id: id } });

  if (!todo)
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  completed: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id: id } });

  if (!todo)
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });

  try {
    const body = await putSchema.validate(await request.json());

    const updatedTodo = await prisma.todo.update({
      where: { id: id },
      data: body, // Only the fields that are present in the body will be updated
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
