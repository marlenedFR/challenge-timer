import React, { useEffect, useState } from "react";
import TimerInput from "./TimerInput";
import Timer from "./Timer";
import Footer from "./Footer";
import { TimerType } from "../types";
import "../index.css";

const App: React.FC = () => {
  const [timers, setTimers] = useState<TimerType[]>([]);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isMobile && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const addTimer = (time: Omit<TimerType, "id">) => {
    const newTimer = { ...time, id: Date.now() };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
  };

  const removeTimer = (id: number) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  return (
    <div className="app">
      <h1>Timer</h1>
      <TimerInput onAddTimer={addTimer} />
      <div className="timer-list">
        {timers.map((timer) => (
          <Timer
            key={timer.id}
            initialTime={timer}
            onRemove={() => removeTimer(timer.id)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
