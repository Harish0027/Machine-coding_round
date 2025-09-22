"use client";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const queue = useRef<number[][]>([]);

  const arr = [
    [true, true, true],
    [true, false, false],
    [true, true, true],
  ];

  const inputBoxRef = useRef<(HTMLDivElement | null)[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(null))
  );

  const [count, setCount] = useState<number>(0);

  const handleClick = (m: number, n: number) => {
    const div = inputBoxRef.current[m][n];
    if (div?.style.backgroundColor === "green") return;

    if (div) {
      div.style.backgroundColor = "green";
      setCount((prev) => prev + 1);
      queue.current.push([m, n]);
    }
  };

  const handleRestate = () => {
    queue.current.forEach(([m, n], index) => {
      setTimeout(() => {
        inputBoxRef.current[m][n]!.style.backgroundColor = "white";
      }, index * 2000);
    });

    queue.current = [];
    setCount(0);
  };

  useEffect(() => {
    if (count === 7) {
      handleRestate();
    }
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-100">
      MAKE MY TRIP
      <div className="flex flex-col">
        {arr.map((row, m) => (
          <div className="flex" key={m}>
            {row.map(
              (ele, n) =>
                ele && (
                  <div
                    className="h-40 w-40 bg-amber-600 flex justify-center mt-3 ml-3 border-4 border-black"
                    key={n}
                    ref={(el) => {
                      inputBoxRef.current[m][n] = el;
                    }}
                    onClick={() => handleClick(m, n)}
                  ></div>
                )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
