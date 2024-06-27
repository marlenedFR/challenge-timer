import React, { useState } from "react";
import Timer from "./Timer";
import { TimerType } from "../types";
import "../index.css";

const App: React.FC = () => {
  const [showTimer, setShowTimer] = useState<boolean>(false);

  const testTime: TimerType = { hours: 0, minutes: 5, seconds: 0 };

  return (
    <div className="app">
      <h1>Timer</h1>
      <button className="add-timer-button" onClick={() => setShowTimer(true)}>
        Add Timer
      </button>
      <div className="timer-list">
        {showTimer && (
          <Timer initialTime={testTime} onRemove={() => setShowTimer(false)} />
        )}
      </div>
    </div>
  );
};

export default App;
