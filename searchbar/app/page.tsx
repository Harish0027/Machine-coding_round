"use client";
import InputComponent from "@/components/InputComponent";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900">
      <h1 className="text-2xl font-bold text-white mb-4">
        Welcome to Searchbar
      </h1>
      <InputComponent />
    </div>
  );
}
