import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.todo.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "The task is deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { isComplete } = await req.json();
    const res = await prisma.todo.update({
      where: { id: Number(id) },
      data: { isComplete: isComplete },
    });
    return NextResponse.json({
      message: "The task is updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
