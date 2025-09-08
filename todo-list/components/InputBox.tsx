"use client";
import axios from "axios";
import React, { useState } from "react";

const InputBox = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo/create`,
      { title, description }
    );
    if (res.data.success) {
      alert("Task added successfully!!!");
      setDescription("");
      setTitle("");
    }
  };

  return (
    <div className="flex justify-center items-center w-full p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md flex flex-col gap-4 border border-gray-200"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the header"
            className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the description"
            className="border border-gray-300 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-2 bg-amber-600 text-white font-semibold py-2 rounded-lg hover:bg-amber-700 transition-colors duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default InputBox;
