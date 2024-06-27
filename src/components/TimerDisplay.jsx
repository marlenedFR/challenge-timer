/* eslint-disable react/prop-types */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Time from "../assets/Time.png";
import Play from "../assets/Play.png";
import Pause from "../assets/Pause.png";
import Close from "../assets/Close.png";
import "../index.css";

const TimerDisplay = ({
  time,
  percentage,
  endTimeString,
  renderBaseTime,
  isPaused,
  handlePauseResume,
  handleStop,
}) => {
  const formatTime = (value) => String(value).padStart(2, "0");

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
      <div className="timer-controls">
        <button onClick={handlePauseResume} className="timer-button">
          <img
            src={isPaused ? Play : Pause}
            alt={isPaused ? "Play" : "Pause"}
            className="control-icon"
          />
        </button>
        <button onClick={handleStop} className="timer-button stop">
          <img src={Close} alt="Close" className="control-icon" />
        </button>
      </div>
    </div>
  );
};

export default TimerDisplay;
