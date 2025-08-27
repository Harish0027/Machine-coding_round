import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [time, setTime] = useState(0); // time in seconds
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);

  // Start Timer
  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  // Pause Timer
  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
  };

  // Reset Timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsActive(false);
  };

  // Convert seconds to mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Workout Timer</h1>
      <h2>{formatTime(time)}</h2>
      <div>
        <button onClick={startTimer} disabled={isActive}>
          Start
        </button>
        <button onClick={pauseTimer} disabled={!isActive}>
          Pause
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
