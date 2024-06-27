import { useState, useEffect, useRef, useCallback } from "react";
import { TimerType } from "../types";

interface TimerState {
  time: TimerType;
  isPaused: boolean;
  isActive: boolean;
}

const useTimer = (initialTime: TimerType) => {
  const [timerState, setTimerState] = useState<TimerState>({
    time: initialTime,
    isPaused: false,
    isActive: true,
  });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerState.isActive && !timerState.isPaused) {
      timerRef.current = setInterval(() => {
        setTimerState((prevState): TimerState => {
          const totalSeconds =
            prevState.time.hours * 3600 +
            prevState.time.minutes * 60 +
            prevState.time.seconds -
            1;

          if (totalSeconds <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            return {
              ...prevState,
              time: { ...prevState.time, hours: 0, minutes: 0, seconds: 0 },
              isActive: false,
            };
          }

          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          return {
            ...prevState,
            time: { ...prevState.time, hours, minutes, seconds },
          };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [initialTime, timerState.isActive, timerState.isPaused]);

  const handlePauseResume = useCallback(() => {
    setTimerState((prevState) => ({
      ...prevState,
      isPaused: !prevState.isPaused,
    }));
  }, []);

  const handleStop = useCallback((onRemove: () => void) => {
    setTimerState((prevState) => ({
      ...prevState,
      isActive: false,
    }));
    if (timerRef.current) clearInterval(timerRef.current);
    onRemove();
  }, []);

  return {
    timerState,
    handlePauseResume,
    handleStop,
  };
};

export default useTimer;
