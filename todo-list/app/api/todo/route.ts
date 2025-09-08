import Todo from "@/models/Todo";
import { connectToMongoose } from "@/utils/db";
import { NextResponse } from "next/server";

// GET all todos
export async function GET() {
  try {
    await connectToMongoose();
    const Todos = await Todo.find();
    return NextResponse.json({ Todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// Delete a new todo
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToMongoose();
    const { id } = params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(
      { todo, success: true, message: "Todo deleted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to post todo" }, { status: 500 });
  }
}
