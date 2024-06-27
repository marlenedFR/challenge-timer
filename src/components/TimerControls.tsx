import React from "react";
import Play from "../assets/Play.png";
import Pause from "../assets/Pause.png";
import Close from "../assets/Close.png";
import "../index.css";

interface TimerControlsProps {
  isPaused: boolean;
  handlePauseResume: () => void;
  handleStop: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isPaused,
  handlePauseResume,
  handleStop,
}) => {
  return (
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
  );
};

export default TimerControls;
