import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TimerControls from "./TimerControls";
import Time from "../assets/Time.png";
import "../index.css";

interface TimerDisplayProps {
  time: { hours: number; minutes: number; seconds: number };
  percentage: number;
  endTimeString: string;
  renderBaseTime: () => string;
  isPaused: boolean;
  handlePauseResume: () => void;
  handleStop: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  time,
  percentage,
  endTimeString,
  renderBaseTime,
  isPaused,
  handlePauseResume,
  handleStop,
}) => {
  const formatTime = (value: number) => String(value).padStart(2, "0");

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
              {formatTime(time.hours)}:{formatTime(time.minutes)}:
              {formatTime(time.seconds)}
            </div>
            <div className="timer-base">{renderBaseTime()}</div>
          </div>
        </div>
      </div>
      <TimerControls
        isPaused={isPaused}
        handlePauseResume={handlePauseResume}
        handleStop={handleStop}
      />
    </div>
  );
};

export default TimerDisplay;
