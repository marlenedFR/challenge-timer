import React, { useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import useTimer from "../hooks/useTimer";
import useNotification from "../hooks/useNotification";
import useSound from "../hooks/useSound";
import { TimerType } from "../types";
import "../index.css";

interface TimerProps {
  initialTime: TimerType;
  onRemove: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onRemove }) => {
  const { timerState, handlePauseResume, handleStop } = useTimer(initialTime);
  const playSound = useSound("/src/assets/Clock.mp3");

  const totalSeconds =
    initialTime.hours * 3600 + initialTime.minutes * 60 + initialTime.seconds;
  const endTime = new Date(new Date().getTime() + totalSeconds * 1000);
  const endTimeString = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const renderBaseTime = () => {
    if (initialTime.hours > 0) {
      return `${initialTime.hours} hrs`;
    }
    if (initialTime.minutes > 0) {
      return `${initialTime.minutes} mins`;
    }
    if (initialTime.seconds > 0) {
      return `${initialTime.seconds} secs`;
    }
    return "";
  };

  const remainingSeconds =
    timerState.time.hours * 3600 +
    timerState.time.minutes * 60 +
    timerState.time.seconds;

  const percentage = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  useNotification(remainingSeconds === 0 ? "Timer terminé ! 😎" : "");

  useEffect(() => {
    if (remainingSeconds === 0) {
      playSound();
    }
  }, [remainingSeconds, playSound]);

  return (
    <div className="timer-display">
      <TimerDisplay
        time={timerState.time}
        percentage={percentage}
        endTimeString={endTimeString}
        renderBaseTime={renderBaseTime}
        isPaused={timerState.isPaused}
        handlePauseResume={handlePauseResume}
        handleStop={() => handleStop(onRemove)}
      />
    </div>
  );
};

export default Timer;
