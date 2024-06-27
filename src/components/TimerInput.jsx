// TimerInput.jsx
/* eslint-disable react/prop-types */

import { useState } from "react";
import "../index.css";

const TimerInput = ({ onAddTimer }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleAddTimer = () => {
    if (onAddTimer) {
      onAddTimer({ hours, minutes, seconds });
    }
  };

  return (
    <div className="timer-input-container">
      <div className="timer-inputs-wrapper">
        <div className="timer-input-group">
          <span className="timer-label">Hours</span>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value, 10) || 0)}
            className="timer-input"
          />
        </div>
        <span className="timer-column">:</span>
        <div className="timer-input-group">
          <span className="timer-label">Minutes</span>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value, 10) || 0)}
            className="timer-input"
          />
        </div>

        <span className="timer-column">:</span>
        <div className="timer-input-group">
          <span className="timer-label">Seconds</span>
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value, 10) || 0)}
            className="timer-input"
          />
        </div>
        <button onClick={handleAddTimer} className="add-timer-button">
          Add Timer
        </button>
      </div>
    </div>
  );
};

export default TimerInput;
