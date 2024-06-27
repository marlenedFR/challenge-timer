// TimerInput.jsx
/* eslint-disable react/prop-types */

import { useState } from "react";

const TimerInput = ({ onAddTimer }) => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const handleTimeChange = (event, unit) => {
    const value = parseInt(event.target.value || 0, 10);
    const cappedValue =
      unit === "hours" ? Math.max(0, value) : Math.max(0, Math.min(59, value));
    setTime((prevTime) => ({ ...prevTime, [unit]: cappedValue }));
  };

  const handleFocus = (event) => event.target.select();

  const addTimer = () => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      alert("Please enter a valid time.");
    } else {
      onAddTimer(time);
      setTime({ hours: 0, minutes: 0, seconds: 0 });
    }
  };

  const handleAddTimer = (event) => {
    event.preventDefault(); // Empêche le double déclenchement sur certains appareils
    addTimer();
  };

  return (
    <div className="timer-input-container">
      <div className="timer-inputs-wrapper">
        <div className="timer-input-group">
          <span className="timer-label">Hours</span>
          <input
            type="number"
            value={time.hours}
            onChange={(e) => handleTimeChange(e, "hours")}
            onFocus={handleFocus}
            className="timer-input"
          />
        </div>
        <span className="timer-column">:</span>
        <div className="timer-input-group">
          <span className="timer-label">Minutes</span>
          <input
            type="number"
            value={time.minutes}
            onChange={(e) => handleTimeChange(e, "minutes")}
            onFocus={handleFocus}
            className="timer-input"
          />
        </div>

        <span className="timer-column">:</span>
        <div className="timer-input-group">
          <span className="timer-label">Seconds</span>
          <input
            type="number"
            value={time.seconds}
            onChange={(e) => handleTimeChange(e, "seconds")}
            onFocus={handleFocus}
            className="timer-input"
          />
        </div>
        <button
          onClick={addTimer}
          onTouchStart={handleAddTimer}
          className="add-timer-button"
        >
          Add Timer
        </button>
      </div>
    </div>
  );
};

export default TimerInput;
