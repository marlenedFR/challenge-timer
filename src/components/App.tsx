import React, { useState } from "react";
import TimerInput from "./TimerInput";
import Timer from "./Timer";
import Footer from "./Footer";
import { TimerType } from "../types";
import "../index.css";

const App: React.FC = () => {
  const [timers, setTimers] = useState<TimerType[]>([]);

  const addTimer = (time: TimerType) => {
    setTimers((prevTimers) => [...prevTimers, time]);
  };

  const removeTimer = (index: number) => {
    setTimers((prevTimers) => prevTimers.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>Timer</h1>
      <TimerInput onAddTimer={addTimer} />
      <div className="timer-list">
        {timers.map((time, index) => (
          <Timer
            key={index}
            initialTime={time}
            onRemove={() => removeTimer(index)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
