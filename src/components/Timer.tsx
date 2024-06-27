import React, { useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import useTimer from "../hooks/useTimer";
import useNotification from "../hooks/useNotification";
import { TimerType } from "../types";
import "../index.css";

interface TimerProps {
  initialTime: TimerType;
  onRemove: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onRemove }) => {
  const { timerState, hasEnded, handlePauseResume, handleStop } =
    useTimer(initialTime);
  const { requestNotificationPermission } = useNotification(hasEnded);

  const totalSeconds =
    initialTime.hours * 3600 + initialTime.minutes * 60 + initialTime.seconds;
  const endTime = new Date(new Date().getTime() + totalSeconds * 1000);
  const endTimeString = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

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

  return (
    <TimerDisplay
      time={timerState.time}
      percentage={percentage}
      endTimeString={endTimeString}
      renderBaseTime={renderBaseTime}
      isPaused={timerState.isPaused}
      handlePauseResume={handlePauseResume}
      handleStop={() => handleStop(onRemove)}
    />
  );
};

export default Timer;
