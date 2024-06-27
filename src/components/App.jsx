import { useState } from "react";
import TimerInput from "./TimerInput";
import Timer from "./Timer";
import Footer from "./Footer";
import "../index.css";
import DebugLog from "./DebugLog";

const App = () => {
  const [timers, setTimers] = useState([]);

  const addTimer = (time) => {
    setTimers((prevTimers) => [...prevTimers, time]);
  };

  const removeTimer = (index) => {
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
        {/* Timer de test statique */}
        <Timer
          initialTime={{ hours: 0, minutes: 1, seconds: 0 }}
          onRemove={() => {}}
        />
        <DebugLog />
      </div>
      <Footer />
    </div>
  );
};

export default App;
