import React, { useState } from "react";
import { TimerType } from "../types";

interface TimerInputProps {
  onAddTimer: (time: TimerType) => void;
}

const TimerInput: React.FC<TimerInputProps> = ({ onAddTimer }) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const handleAddTimer = () => {
    onAddTimer({ hours, minutes, seconds });
  };

  return (
    <div className="timer-input-container">
      <div className="timer-inputs-wrapper">
        <div className="timer-input-group">
          <label className="timer-label">Hours</label>
          <input
            type="number"
            className="timer-input"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="timer-input-group">
          <label className="timer-label">Minutes</label>
          <input
            type="number"
            className="timer-input"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="timer-input-group">
          <label className="timer-label">Seconds</label>
          <input
            type="number"
            className="timer-input"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>
      <button className="add-timer-button" onClick={handleAddTimer}>
        Add Timer
      </button>
    </div>
  );
};

export default TimerInput;
