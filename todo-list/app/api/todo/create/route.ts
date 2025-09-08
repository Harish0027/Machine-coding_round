import Todo from "@/models/Todo";
import { connectToMongoose } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToMongoose();
    console.log(req.json);

    const body = await req.json();

    // Validate input
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const todo = await Todo.create({
      title: body.title,
      description: body.description,
    });

    return NextResponse.json(
      {
        todo,
        success: true,
        message: "Todo added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
  }
}
