import React, { useEffect, useState } from "react";
import TimerInput from "./TimerInput";
import Timer from "./Timer";
import Footer from "./Footer";
import { TimerType } from "../types";
import "../index.css";

const App: React.FC = () => {
  const [timers, setTimers] = useState<TimerType[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addTimer = (time: Omit<TimerType, "id">) => {
    const newTimer = { ...time, id: Date.now() };
    setTimers((prevTimers) => [...prevTimers, newTimer]);
  };

  const removeTimer = (id: number) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  if (isMobile) {
    return (
      <div className="mobile-warning">
        Cette application est disponible uniquement sur ordinateur portable.
      </div>
    );
  }

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
