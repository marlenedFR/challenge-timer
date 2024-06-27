/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Time from "../assets/Time.png";
import Play from "../assets/Play.png";
import Pause from "../assets/Pause.png";
import Close from "../assets/Close.png";
import "../index.css";

const Timer = ({ initialTime, onRemove }) => {
  const [timerState, setTimerState] = useState({
    time: initialTime,
    isActive: true,
    isPaused: false,
  });

  const [hasEnded, setHasEnded] = useState(false);

  const totalSeconds =
    initialTime.hours * 3600 + initialTime.minutes * 60 + initialTime.seconds;
  const endTime = new Date(new Date().getTime() + totalSeconds * 1000);
  const endTimeString = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    requestNotificationPermission();
    let timerId;
    if (timerState.isActive && !timerState.isPaused) {
      timerId = setInterval(() => {
        setTimerState((prevState) => {
          const totalSeconds =
            prevState.time.hours * 3600 +
            prevState.time.minutes * 60 +
            prevState.time.seconds -
            1;
          console.log(`Remaining time: ${totalSeconds} seconds`); // Debugging log
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

  useEffect(() => {
    if (hasEnded) {
      showNotification();
      playSound();
    }
  }, [hasEnded]);

  const requestNotificationPermission = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  };

  const showNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Timer terminé !", {
        body: "Votre timer est terminé 😎",
      });
    }
  };

  const playSound = () => {
    const audio = new Audio(
      "/src/assets/household_clock_cuckoo_strike_001.mp3"
    );
    audio.play();
  };

  const formatTime = (value) => String(value).padStart(2, "0");

  const handlePauseResume = () => {
    setTimerState((prevState) => ({
      ...prevState,
      isPaused: !prevState.isPaused,
    }));
    console.log(`Timer ${timerState.isPaused ? "resumed" : "paused"}`); // Debugging log
  };

  const handleStop = () => {
    onRemove();
  };

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
    <div className="timer-display">
      <div className="timer-circle">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            rotation: -90,
            textColor: "transparent",
            pathColor: "#a66eff",
            trailColor: "#d9ef58",
          })}
        />
        <div className="timer-overlay">
          <div className="timer-info">
            <div className="timer-end-wrapper">
              <img src={Time} alt="bell" className="timer-icon" />
              <div className="timer-end">{endTimeString}</div>
            </div>
            <div className="timer-time">
              {formatTime(timerState.time.hours)}:
              {formatTime(timerState.time.minutes)}:
              {formatTime(timerState.time.seconds)}
            </div>
            <div className="timer-base">{renderBaseTime()}</div>
          </div>
        </div>
      </div>
      <div className="timer-controls">
        <button onClick={handlePauseResume} className="timer-button">
          <img
            src={timerState.isPaused ? Play : Pause}
            alt={timerState.isPaused ? "Play" : "Pause"}
            className="control-icon"
          />
        </button>
        <button onClick={handleStop} className="timer-button stop">
          <img src={Close} alt="Close" className="control-icon" />
        </button>
      </div>
      <div className="log">
        <p>Timer active: {String(timerState.isActive)}</p>
        <p>Timer paused: {String(timerState.isPaused)}</p>
        <p>
          Timer time: {formatTime(timerState.time.hours)}:
          {formatTime(timerState.time.minutes)}:
          {formatTime(timerState.time.seconds)}
        </p>
      </div>
    </div>
  );
};

export default Timer;
