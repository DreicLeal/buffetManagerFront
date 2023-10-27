import React, { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
}
const Timer = ({ initialTime }: TimerProps) => {
  const initialTimeInMs = new Date(initialTime).getTime();
  const [elapsedTime, setElapsedTime] = useState(Date.now() - initialTimeInMs);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setElapsedTime(Date.now() - initialTimeInMs);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [initialTimeInMs]);

  const formatTime = (time: number) => String(time).padStart(2, "0");

  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <p>
      {formatTime(minutes)}:{formatTime(seconds)}
    </p>
  );
};

export default Timer;
