"use client";
import { screens } from "@/constants/seatData";
import { useState } from "react";

interface seat {
  seatId: string;
  price: number;
  status: string;
}

interface screenType {
  screenId: number;
  movieId: number;
  movieName: string;
  screenName: string;
  totalSeats: number;
  seats: seat[];
}

export default function Home() {
  const [screen, setScreen] = useState<screenType>(screens[0]);
  const [availableSeats, setAvailableSeats] = useState<number>(0);
  const [selected, setSelected] = useState<string>();

  const handleSelect = (seat: seat) => {
    if (seat.status !== "available") return;
    setSelected(seat.seatId);
  };

  const handleBookSeats = async () => {
    if (!selected) {
      alert("Please select a seat first!");
      return;
    }

    try {
      const response = await fetch("/api/book-seat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          screenId: screen.screenId,
          seatId: selected,
          userId: "user123",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      // Update UI: mark seat as "locked"
      setScreen((prev) => {
        const updatedSeats = prev.seats.map((s) =>
          s.seatId === selected ? { ...s, status: "locked" } : s
        );
        return { ...prev, seats: updatedSeats };
      });

      // Reset seat back to available after 2 minutes (120000 ms)
      setTimeout(() => {
        setScreen((prev) => {
          const updatedSeats = prev.seats.map((s) =>
            s.seatId === selected ? { ...s, status: "available" } : s
          );
          return { ...prev, seats: updatedSeats };
        });
      }, 30000); // 2 minutes

      setSelected(undefined); // Deselect
    } catch (error) {
      console.error(error);
      alert("Something went wrong while booking the seat!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      {/* Movie and Screen Info */}
      <h1 className="text-3xl font-bold mb-2">{screen.movieName}</h1>
      <p className="text-gray-300 mb-1">
        Welcome to Screen No. {screen.screenId}
      </p>
      <p className="text-gray-400 mb-4">{screen.screenName}</p>

      {/* Seat Info Summary */}
      <div className="mb-8">
        <span className="text-lg">
          Total Seats:{" "}
          <span className="font-semibold">{screen.totalSeats}</span> |{" "}
          Available:{" "}
          <span className="font-semibold text-green-400">
            {screen.seats.filter((s) => s.status === "available").length}
          </span>
        </span>
      </div>

      {/* SEAT SECTION */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg w-full max-w-4xl">
        <div className="mb-6 text-center">
          <div className="text-sm text-gray-400 mb-2">SCREEN THIS SIDE</div>
          <div className="h-2 w-full bg-gray-500 rounded-full mb-4"></div>
        </div>

        {/* Row Component */}
        {["A", "B", "C"].map((rowLetter, rowIndex) => (
          <div key={rowLetter} className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Row {rowLetter}</h2>
              <span className="text-sm text-gray-400">
                Price: ₹
                {rowLetter === "A" ? 150 : rowLetter === "B" ? 120 : 100}
              </span>
            </div>

            <div className="flex justify-center gap-3 flex-wrap">
              {screen.seats
                .filter((seat) => seat.seatId.includes(rowLetter))
                .map((seat) => (
                  <div
                    key={seat.seatId}
                    className={`w-14 h-14 flex items-center justify-center font-semibold rounded-lg cursor-pointer transition-colors 
                      ${
                        selected === seat.seatId
                          ? "bg-pink-500"
                          : seat.status === "available"
                          ? "bg-green-500 hover:bg-green-600"
                          : seat.status === "booked"
                          ? "bg-red-500 cursor-not-allowed opacity-70"
                          : "bg-yellow-400"
                      }`}
                    onClick={() => handleSelect(seat)}
                  >
                    {seat.seatId}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-10">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-yellow-400 rounded"></div>
          <span>Locked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-500 rounded"></div>
          <span>Booked</span>
        </div>
      </div>
      <div className="flex w-100 overflow-hidden">{selected}</div>
      <button className="cursor-pointer" onClick={() => handleBookSeats()}>
        Book
      </button>
    </div>
  );
}
