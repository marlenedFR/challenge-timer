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
      [key]: value >= 0 ? value : 0, // Assurez-vous que la valeur soit positive
    });
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement>,
    key: keyof TimerType
  ) => {
    if (time[key] === 0) {
      setTime({
        ...time,
        [key]: NaN, // Utilisez NaN pour indiquer que le champ est vide
      });
      e.target.value = ""; // Effacez le champ d'entrée
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    key: keyof TimerType
  ) => {
    if (isNaN(time[key])) {
      setTime({
        ...time,
        [key]: 0, // Remettez 0 si le champ est vide
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
        min="0" // Empêche les valeurs négatives
        step="1" // Optionnel : définit l'incrément de la valeur
        onKeyDown={(e) => e.key === "-" && e.preventDefault()} // Empêche la saisie du signe négatif
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
