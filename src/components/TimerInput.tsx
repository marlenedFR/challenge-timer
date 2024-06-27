import React, { useState } from "react";
import { TimerType } from "../types";

interface TimerInputProps {
  onAddTimer: (time: Omit<TimerType, "id">) => void;
}

const TimerInput: React.FC<TimerInputProps> = ({ onAddTimer }) => {
  const [state, setState] = useState({
    values: {
      hours: "0",
      minutes: "0",
      seconds: "0",
    },
    errors: {
      hours: "",
      minutes: "",
      seconds: "",
    },
  });

  const validateAndSetState = (
    key: keyof Omit<TimerType, "id">,
    value: string
  ) => {
    const numericValue = parseInt(value.slice(0, 2), 10);
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

    setState((prevState) => ({
      values: {
        ...prevState.values,
        [key]: value.slice(0, 2),
      },
      errors: {
        ...prevState.errors,
        [key]: errorMessage,
      },
    }));

    return errorMessage === "" ? numericValue : NaN;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Omit<TimerType, "id">
  ) => {
    validateAndSetState(key, e.target.value);
  };

  const handleFocus = (key: keyof Omit<TimerType, "id">) => {
    if (state.values[key] === "0") {
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          [key]: "",
        },
      }));
    }
  };

  const handleBlur = (key: keyof Omit<TimerType, "id">) => {
    if (state.values[key] === "") {
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          [key]: "0",
        },
        errors: {
          ...prevState.errors,
          [key]: "",
        },
      }));
    } else {
      validateAndSetState(key, state.values[key]);
    }
  };

  const handleAddTimer = () => {
    const hours = validateAndSetState("hours", state.values.hours);
    const minutes = validateAndSetState("minutes", state.values.minutes);
    const seconds = validateAndSetState("seconds", state.values.seconds);

    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert("Please set a time greater than zero.");
      return;
    }

    const errorMessages = Object.entries(state.errors)
      .filter(([key, value]) => value)
      .map(
        ([key, value]) =>
          `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
      )
      .join("\n");

    if (errorMessages) {
      alert(`Please fix the following errors:\n${errorMessages}`);
      return;
    }

    onAddTimer({ hours, minutes, seconds });
  };

  const renderInput = (label: string, key: keyof Omit<TimerType, "id">) => (
    <div className="timer-input-group">
      <label className="timer-label">{label}</label>
      <input
        type="number"
        className="timer-input"
        value={state.values[key]}
        onChange={(e) => handleChange(e, key)}
        onFocus={() => handleFocus(key)}
        onBlur={() => handleBlur(key)}
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
