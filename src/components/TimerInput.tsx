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
    const value = parseInt(e.target.value);
    setTime({
      ...time,
      [key]: value >= 0 ? value : 0,
    });
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement>,
    key: keyof TimerType
  ) => {
    if (time[key] === 0) {
      setTime({
        ...time,
        [key]: NaN,
      });
      e.target.value = "";
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    key: keyof TimerType
  ) => {
    if (isNaN(time[key])) {
      setTime({
        ...time,
        [key]: 0,
      });
    }
  };

  const handleAddTimer = () => {
    onAddTimer(time);
  };

  const renderInput = (label: string, key: keyof TimerType) => (
    <div className="timer-input-group">
      <label className="timer-label">{label}</label>
      <input
        type="number"
        className="timer-input"
        value={isNaN(time[key]) ? "" : time[key]}
        onChange={(e) => handleChange(e, key)}
        onFocus={(e) => handleFocus(e, key)}
        onBlur={(e) => handleBlur(e, key)}
        min="0"
        step="1"
        onKeyDown={(e) => e.key === "-" && e.preventDefault()}
      />
    </div>
  );

  return (
    <div className="timer-input-container">
      <div className="timer-inputs-wrapper">
        {renderInput("Hours", "hours")}
        {renderInput("Minutes", "minutes")}
        {renderInput("Seconds", "seconds")}
      </div>
      <button className="add-timer-button" onClick={handleAddTimer}>
        Add Timer
      </button>
    </div>
  );
};

export default TimerInput;
