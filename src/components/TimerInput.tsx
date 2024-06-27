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

  const [inputValues, setInputValues] = useState({
    hours: "0",
    minutes: "0",
    seconds: "0",
  });

  const [errors, setErrors] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });

  const validateValue = (
    key: keyof Omit<TimerType, "id">,
    numericValue: number
  ) => {
    let errorMessage = "";
    if (isNaN(numericValue) || numericValue < 0) {
      errorMessage = "Please enter a valid number.";
    } else if (key === "hours" && numericValue > 23) {
      errorMessage = "Hours must be between 0 and 23.";
    } else if ((key === "minutes" || key === "seconds") && numericValue > 59) {
      errorMessage = `${
        key.charAt(0).toUpperCase() + key.slice(1)
      } must be between 0 and 59.`;
    }
    return errorMessage;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Omit<TimerType, "id">
  ) => {
    let value = e.target.value;
    const numericValue = parseInt(value, 10);

    const errorMessage = validateValue(key, numericValue);

    setErrors({
      ...errors,
      [key]: errorMessage,
    });

    setInputValues({
      ...inputValues,
      [key]: value,
    });

    if (!errorMessage) {
      setTime({
        ...time,
        [key]: numericValue,
      });
    } else {
      setTime({
        ...time,
        [key]: NaN,
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
      setInputValues({
        ...inputValues,
        [key]: "0",
      });
    }
  };

  const handleAddTimer = () => {
    const { hours, minutes, seconds } = time;
    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert("Please set a time greater than zero.");
      return;
    }
    if (errors.hours || errors.minutes || errors.seconds) {
      alert("Please enter a valid time.");
      return;
    }
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
