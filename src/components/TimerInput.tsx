import React, { useState } from "react";
import { TimerType } from "../types";

interface TimerInputProps {
  onAddTimer: (time: Omit<TimerType, "id">) => void;
}

const TimerInput: React.FC<TimerInputProps> = ({ onAddTimer }) => {
  const [time, setTime] = useState<Omit<TimerType, "id">>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Omit<TimerType, "id">
  ) => {
    const value = e.target.value;
    const numericValue = parseInt(value);

    if (!isNaN(numericValue) && numericValue >= 0) {
      setTime({
        ...time,
        [key]: numericValue,
      });
    } else {
      setTime({
        ...time,
        [key]: 0,
      });
    }
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement>,
    key: keyof Omit<TimerType, "id">
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
    key: keyof Omit<TimerType, "id">
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

  const renderInput = (label: string, key: keyof Omit<TimerType, "id">) => (
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
