import Todo from "@/models/Todo";
import { connectToMongoose } from "@/utils/db";
import { NextResponse } from "next/server";

// DELETE
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
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

// PATCH
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToMongoose();
    const { id } = params;
    const body = await req.json();

    const todo = await Todo.findByIdAndUpdate(
      id,
      { isDone: body.isDone },
      { new: true } // return the updated document
    );

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { todo, success: true, message: "Todo updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}
