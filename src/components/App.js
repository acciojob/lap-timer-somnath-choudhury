import React, { useState, useEffect, useRef } from "react";
import "../styles/App.css";

function App() {
  const [time, setTime] = useState(0); // in centiseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  // Start the timer
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10); // 10ms = 1 centisecond
    }
  };

  // Stop the timer
  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Record current lap time
  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  // Reset everything
  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format time display
  const formatTime = (t) => {
    const centiseconds = t % 100;
    const seconds = Math.floor((t / 100) % 60);
    const minutes = Math.floor(t / 6000);
    return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
  };

  const pad = (num) => (num < 10 ? "0" + num : num);

  return (
    <div className="lap-timer">
      <h1>Lap Timer</h1>
      <h2>{formatTime(time)}</h2>

      <div className="controls">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleStop}>Stop</button>
        )}
        <button onClick={handleLap}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="laps">
        {laps.map((lap, index) => (
          <p key={index}>Lap {index + 1}: {formatTime(lap)}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
