/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../index.css";

const Timer = ({ initialTime, onRemove }) => {
  const [log, setLog] = useState("");

  useEffect(() => {
    setLog(
      `Timer mounted: ${initialTime.hours}h ${initialTime.minutes}m ${initialTime.seconds}s`
    );
  }, [initialTime]);

  return (
    <div className="timer-display">
      <div className="timer-circle">
        <div className="timer-overlay">
          <span className="timer-time">{`${initialTime.hours}h ${initialTime.minutes}m ${initialTime.seconds}s`}</span>
        </div>
      </div>
      <button onClick={onRemove}>Remove</button>
      <div className="log">
        <p>{log}</p>
      </div>
    </div>
  );
};

export default Timer;
