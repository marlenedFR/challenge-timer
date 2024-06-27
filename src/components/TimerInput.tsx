import React, { useState } from "react";
import { TimerType } from "../types";

interface TimerInputProps {
  onAddTimer: (time: TimerType) => void;
}

const TimerInput: React.FC<TimerInputProps> = ({ onAddTimer }) => {
  const [time, setTime] = useState<TimerType>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof TimerType
  ) => {
    setTime({
      ...time,
      [key]: parseInt(e.target.value) || 0,
    });
  };

  const handleAddTimer = () => {
    console.log("Adding timer from input:", time);
    onAddTimer(time);
  };

  return (
    <div className="timer-input-container">
      <div className="timer-inputs-wrapper">
        <div className="timer-input-group">
          <label className="timer-label">Hours</label>
          <input
            type="number"
            className="timer-input"
            value={time.hours}
            onChange={(e) => handleChange(e, "hours")}
          />
        </div>
        <div className="timer-input-group">
          <label className="timer-label">Minutes</label>
          <input
            type="number"
            className="timer-input"
            value={time.minutes}
            onChange={(e) => handleChange(e, "minutes")}
          />
        </div>
        <div className="timer-input-group">
          <label className="timer-label">Seconds</label>
          <input
            type="number"
            className="timer-input"
            value={time.seconds}
            onChange={(e) => handleChange(e, "seconds")}
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
