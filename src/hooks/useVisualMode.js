import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {

    setMode(newMode);
    setHistory(prevHistory => {
      if (replace) {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length -1] = newMode;
        return newHistory;
      } else {
        return [...prevHistory, newMode]
      }
  })
}

  function back() {
    // history array
    const newHistory = [...history];

    if (newHistory.length <= 1) {
      setMode(newHistory[0]);
      setHistory(newHistory);
    } else {


    // take off last mode
    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
    }
  }

  return { mode, transition, back };
}