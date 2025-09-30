"use client";

import { AccDataArray } from "@/public/data";
import { useState } from "react";

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelectedIndex = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number
  ) => {
    if (id === selectedIndex) {
      setSelectedIndex(null);
      return;
    }
    setSelectedIndex(id);
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100">
      <h1 className="mt-10 text-3xl font-bold text-gray-800">
        Welcome to Accordion
      </h1>
      <div className="mt-10 w-full max-w-xl">
        {AccDataArray.map((AccData, index) => (
          <div
            key={index}
            onClick={(e) => handleSelectedIndex(e, AccData.id)}
            className="mb-4 cursor-pointer rounded-lg border border-gray-300 bg-white shadow-md transition-all hover:shadow-lg"
          >
            <div className="px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">
                {AccData.title}
              </h2>
              <span className="text-gray-500">
                {selectedIndex === AccData.id ? "-" : "+"}
              </span>
            </div>
            <div
              className={`px-6 overflow-hidden transition-max-h duration-500 ease-in-out ${
                selectedIndex === AccData.id ? "max-h-40 py-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-700">{AccData.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
