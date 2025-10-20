"use client";

import { ChangeEvent, useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todo");
      const data = await res.json();
      console.log("data" + data);
      setTodos(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle input change
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  // Add new todo
  const handleClick = async () => {
    if (!title) return;

    try {
      const res = await fetch("/api/todo/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      fetchTodos();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/todo/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        alert(data.message);
        fetchTodos();
      } else {
        alert("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleMark = async (id: number, isComplete: boolean) => {
    try {
      const res = await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isComplete: isComplete }),
      });
      const data = await res.json();

      if (data.success) {
        alert(data.message);
        fetchTodos();
      } else {
        alert("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-6 bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to Todo</h1>

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title..."
          className="border border-gray-400 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description..."
          className="border border-gray-400 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Todos List */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <p className="text-lg font-semibold mb-3">Here are your Todos:</p>

        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-start border-b py-2 last:border-none"
          >
            <div>
              <h2 className="font-medium">{todo.title}</h2>
              <p className="text-sm text-gray-600">{todo.description}</p>
            </div>
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => handleMark(todo.id, !todo.isComplete)}
              className="w-5 h-5 accent-green-500"
            />
            <button
              className="text-red-600"
              onClick={() => handleDelete(todo.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
