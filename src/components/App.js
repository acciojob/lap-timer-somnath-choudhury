import React, { useState, useEffect, useRef } from "react";
import "../styles/App.css";

function App() {
  const [time, setTime] = useState(0); // centiseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  // Start timer
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10); // 1 centisecond = 10ms
    }
  };

  // Stop timer
  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Record lap
  const handleLap = () => {
    if (isRunning) {
      setLaps((prev) => [...prev, time]);
    }
  };

  // Reset everything
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Clean up
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format: mm:ss:cc
  const formatTime = (t) => {
    const centiseconds = t % 100;
    const seconds = Math.floor((t / 100) % 60);
    const minutes = Math.floor(t / 6000);
    return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  };

  const pad = (num) => (num < 10 ? "0" + num : num);

  return (
    <div className="lap-timer">
      {/* Timer Display */}
      <h1>Lap Timer</h1>
      <h2 id="timer">{formatTime(time)}</h2>

      {/* Control Buttons */}
      <div className="controls">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleStop}>Stop</button>
        )}
        <button onClick={handleLap}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* Lap List */}
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
