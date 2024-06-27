import React, { useState, useEffect } from "react";
import "../index.css";

const TimerInput = ({ onAddTimer }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [log, setLog] = useState("");

  const handleAddTimer = () => {
    if (onAddTimer) {
      onAddTimer({ hours, minutes, seconds });
      setLog(`Button clicked: ${hours}h ${minutes}m ${seconds}s`);
    }
  };

  useEffect(() => {
    setLog("TimerInput component mounted");
  }, []);

  return (
    <div className="timer-input-container">
      <div className="timer-inputs-wrapper">
        <div className="timer-input-group">
          <label className="timer-label">Hours</label>
          <input
            type="number"
            className="timer-input"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="timer-input-group">
          <label className="timer-label">Minutes</label>
          <input
            type="number"
            className="timer-input"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="timer-input-group">
          <label className="timer-label">Seconds</label>
          <input
            type="number"
            className="timer-input"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </div>
      <button className="add-timer-button" onClick={handleAddTimer}>
        Add Timer
      </button>
      <div className="log">
        <p>{log}</p>
      </div>
    </div>
  );
};

export default TimerInput;
