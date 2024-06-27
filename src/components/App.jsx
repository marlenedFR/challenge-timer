import React, { useState } from "react";
// import TimerInput from "./TimerInput";
// import Timer from "./Timer";
// import Footer from "./Footer";
import "../index.css";
// import DebugLog from "./DebugLog";

const App = () => {
  // const [timers, setTimers] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Chargement de lapplication...</div>;
  }

  // const addTimer = (time) => {
  //   setTimers((prevTimers) => [...prevTimers, time]);
  // };

  // const removeTimer = (index) => {
  //   setTimers((prevTimers) => prevTimers.filter((_, i) => i !== index));
  // };

  return (
    <div className="app">
      <h1>Timer App</h1>
      <p>Si vous voyez ceci, lapplication se charge correctement.</p>
    </div>
  );
};

export default App;
