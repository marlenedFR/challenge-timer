// DebugLog.jsx
import { useState, useEffect } from "react";

const DebugLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      setLogs((prevLogs) => [...prevLogs, JSON.stringify(args)]);
      originalConsoleLog.apply(console, args);
    };
    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "white",
        maxHeight: "30%",
        overflow: "auto",
      }}
    >
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
};

export default DebugLog;
