"use client";
import { useEffect, useState } from "react";

interface ChipInterface {
  id: number;
  title: string;
}

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [chips, setChips] = useState<ChipInterface[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (input.trim().length <= 0) return;

    setChips((prev) => [...prev, { id: Date.now(), title: input }]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setChips((prev) => prev.filter((chip) => chip.id !== id));
  };

  useEffect(() => {
    const current = localStorage.getItem("Chips");
    if (current) {
      setChips(JSON.parse(current));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Chips", JSON.stringify(chips));
  }, [chips]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Input Chips</h1>

      <form className="flex gap-2 mb-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter chip"
          value={input}
          onChange={(e) => handleInput(e)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={(e) => handleSubmit(e)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add Chip
        </button>
      </form>

      <div className="flex flex-wrap gap-2 w-full max-w-md">
        {chips.map((chip) => (
          <div
            key={chip.id}
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full border border-gray-300"
          >
            <h3 className="text-sm">{chip.title}</h3>
            <button
              onClick={() => handleDelete(chip.id)}
              className="ml-2 text-gray-500 hover:text-red-500 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
