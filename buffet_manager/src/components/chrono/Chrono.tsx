import React, { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
}
export function Timer({ initialTime }: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState(Date.now() - initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setElapsedTime(Date.now() - initialTime);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [initialTime]);

  const formatTime = (time: number) => String(time).padStart(2, "0");

  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <p>
      {formatTime(minutes)}:{formatTime(seconds)}
    </p>
  );
}
