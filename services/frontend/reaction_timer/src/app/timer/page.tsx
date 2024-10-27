// src/app/timer/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "../context/authProvider";

export default function TimerPage() {
  const { token } = useAuth();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  
  const handleStart = () => {
    setStartTime(Date.now());
    setIsRunning(true);
    setReactionTime(null);
  };
  
  const handleStop = async () => {
    if (startTime) {
      const timeTaken = Date.now() - startTime;
      setReactionTime(timeTaken);
      setIsRunning(false);

      // Send the reaction time to the backend
      try {
        const res = await fetch("http://localhost:8003/timer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ timer: timeTaken}),
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Recorded Reaction Time:", data);
      } catch (error) {
        console.error("Error recording reaction time:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-black">Reaction Timer</h1>
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded ml-2 hover:bg-red-600"
          onClick={handleStop}
          disabled={!isRunning}
        >
          Stop
        </button>
      </div>
      {reactionTime !== null && (
        <p className="text-lg text-black">Reaction Time: {reactionTime} ms</p>
      )}
    </div>
  );
}
