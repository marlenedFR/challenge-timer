import { useState, useEffect } from "react";

const useTimer = (initialTime) => {
  const [timerState, setTimerState] = useState({
    time: initialTime,
    isActive: true,
    isPaused: false,
  });

  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    let timerId;
    if (timerState.isActive && !timerState.isPaused) {
      timerId = setInterval(() => {
        setTimerState((prevState) => {
          const totalSeconds =
            prevState.time.hours * 3600 +
            prevState.time.minutes * 60 +
            prevState.time.seconds -
            1;
          if (totalSeconds <= 0) {
            clearInterval(timerId);
            if (!hasEnded) {
              setHasEnded(true);
            }
            return {
              ...prevState,
              time: { hours: 0, minutes: 0, seconds: 0 },
              isActive: false,
            };
          }
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          return {
            ...prevState,
            time: { hours, minutes, seconds },
          };
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [timerState.isActive, timerState.isPaused, hasEnded]);

  const handlePauseResume = () => {
    setTimerState((prevState) => ({
      ...prevState,
      isPaused: !prevState.isPaused,
    }));
  };

  const handleStop = (onRemove) => {
    setTimerState((prevState) => ({
      ...prevState,
      isActive: false,
    }));
    onRemove();
  };

  return {
    timerState,
    hasEnded,
    handlePauseResume,
    handleStop,
  };
};

export default useTimer;
