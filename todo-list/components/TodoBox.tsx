"use client";
import axios from "axios";
import React, { useState } from "react";

interface TodoProps extends Document {
  _id: string;
  title: string;
  description: string;
  isDone: boolean;
}

const TodoBox = ({ todo }: { todo: TodoProps }) => {
  const [isDone, setIsDone] = useState<boolean>(todo.isDone);
  const handleDelete = async (id: string) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo/${id}`
    );
    if (res.data.success) alert("Task deleted successFully!!!");
  };

  const changeDone = async (id: string) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo/${id}`,
        { isDone: isDone }
      );
      if (res.data.success) {
        alert("Task marked as completed");
        setIsDone((prev) => !prev);
      }
    } catch (error) {}
  };
  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      {/* Title */}
      <h1 className="text-lg font-bold text-gray-800 mb-2">{todo.title}</h1>

      {/* Description */}
      <p className="text-sm text-gray-600 flex-1">{todo.description}</p>

      {/* Checkbox */}
      <div className="flex justify-between">
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => changeDone(todo._id)}
            className="h-5 w-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
          />
          <span className="text-sm text-gray-700">
            {todo.isDone ? "Completed" : "Pending"}
          </span>
        </div>
        <div
          className="mt-4 flex items-center gap-2"
          onClick={() => handleDelete(todo._id)}
        >
          X
        </div>
      </div>
    </div>
  );
};

export default TodoBox;
