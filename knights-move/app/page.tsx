"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [currentMove, setCurrentMove] = useState<number[][]>([]);
  const [current, setCurrent] = useState<number[]>([-1, -1]);

  const moves = [
    [-1, -2],
    [1, -2],
    [-1, 2],
    [1, 2],
    [2, 1],
    [-2, 1],
    [2, -1],
    [-2, -1],
  ];

  let chessbrd: string[][] = Array.from({ length: 8 }, () => {
    return Array(8).fill("");
  });

  useEffect(() => {
    let currentRow: number[][] = [];
    moves.forEach((move) => {
      if (
        current[0] + move[0] < 8 &&
        0 <= current[0] + move[0] &&
        current[1] + move[1] < 8 &&
        0 <= current[1] + move[1] &&
        current[0] >= 0 &&
        current[1] >= 1
      ) {
        currentRow.push([current[0] + move[0], current[1] + move[1]]);
      }
    });
    setCurrentMove(currentRow);
    console.log(currentMove);
  }, [current]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-800">
      <div className="w-full text-white flex justify-center h-16">
        Welcome to ChessBoard
      </div>
      <div className="flex justify-center flex-col">
        {chessbrd.map((row, m) => (
          <div key={m} className="flex ">
            {row.map((num, n) => (
              <div
                key={n}
                className={`outline-2 outline-blue-50 h-20 w-20  flex justify-center items-center cursor-pointer ${
                  currentMove.some(([r, c]) => r === m && c === n)
                    ? "bg-amber-400"
                    : "bg-black"
                }`}
                onClick={() => setCurrent([m, n])}
              >
                {current[0] === m && current[1] === n ? "K" : null}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div></div>
    </div>
  );
}
