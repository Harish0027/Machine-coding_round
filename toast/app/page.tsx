"use client";
import { useState } from "react";

interface Toast {
  id: string;
  title: string;
  type: string;
}

export default function Home() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: string, title: string) => {
    let id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, type }]);
    setTimeout(() => handleDelete(id), 5000);
  };

  const handleDelete = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-2xl font-bold">✨ Toast Notifications</h1>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() =>
            addToast("bg-green-600", "✅ Success: Operation complete!")
          }
          className="px-4 py-2 bg-green-600 text-white rounded shadow hover:opacity-80"
        >
          Success
        </button>
        <button
          onClick={() =>
            addToast("bg-red-600", "❌ Error: Something went wrong!")
          }
          className="px-4 py-2 bg-red-600 text-white rounded shadow hover:opacity-80"
        >
          Error
        </button>
        <button
          onClick={() => addToast("bg-blue-600", "ℹ️ Info: Please read this.")}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:opacity-80"
        >
          Info
        </button>
        <button
          onClick={() =>
            addToast("bg-yellow-500", "⚠️ Warning: Check this carefully!")
          }
          className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:opacity-80"
        >
          Warning
        </button>
      </div>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 flex flex-col gap-3 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`${toast.type} text-white px-4 py-3 rounded-lg shadow-lg flex justify-between items-center min-w-[250px] max-w-sm animate-slide-in`}
          >
            <p className="font-medium">{toast.title}</p>
            <button
              onClick={() => handleDelete(toast.id)}
              className="ml-3 text-lg font-bold hover:opacity-70"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
