import { useState, useEffect } from "react";
import TimerInput from "./TimerInput";
import Timer from "./Timer";
import Footer from "./Footer";
import "../index.css";

const App = () => {
  const [timers, setTimers] = useState([]);
  const [log, setLog] = useState("");

  const addTimer = (time) => {
    setTimers((prevTimers) => [...prevTimers, time]);
    setLog(`Added timer: ${time.hours}h ${time.minutes}m ${time.seconds}s`);
  };

  const removeTimer = (index) => {
    setTimers((prevTimers) => prevTimers.filter((_, i) => i !== index));
    setLog(`Removed timer at index: ${index}`);
  };

  useEffect(() => {
    setLog("App component mounted");
  }, []);

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
      <div className="log">
        <p>{log}</p>
      </div>
    </div>
  );
};

export default App;
