import { useState } from "react";

function App() {
  let [seconds, setSeconds] = useState(0);
  let [oneDigitSeconds, setOneDigitSeconds] = useState(true);
  let [mins, setMins] = useState(0);
  let [oneDigitMins, setOneDigitMins] = useState(true);
  let [hours, setHours] = useState(0);
  let [oneDigitHours, setOneDigitHours] = useState(true);
  let [timer, setTimer] = useState(null);
  let [pauseDisplay, setPauseDisplay] = useState(false);

  function startTimer() {
    setPauseDisplay(true);
    setTimer(
      (timer = setInterval(() => {
        setSeconds((seconds += 1));
        if (seconds > 9 && seconds < 59) {
          setOneDigitSeconds(false);
        } else if (seconds > 59) {
          setMins((mins += 1));
          setSeconds((seconds = 0));
          setOneDigitSeconds(true);
          if (mins > 9 && mins < 59) {
            setOneDigitMins(false);
          } else if (mins > 59) {
            setHours((hours += 1));
            setMins((mins = 0));
            setOneDigitMins(true);
            if (hours > 9 && hours < 59) {
              setOneDigitHours(false);
            }
          }
        }
      }, 1))
    );
  }

  function stopTimer() {
    setPauseDisplay(false);
    clearInterval(timer);
  }

  function restartTimer() {
    setPauseDisplay(false);
    clearInterval(timer);
    setSeconds((seconds = 0));
    setOneDigitSeconds(true);
    setMins((mins = 0));
    setOneDigitMins(true);
    setHours((hours = 0));
    setOneDigitHours(true);
  }

  const laps = [];

  return (
    <div id="root">
      <div id="lightAndDark">
        <button id="toggle"></button>
      </div>
      <div id="time">
        <div id="display">
          {oneDigitHours && 0}
          {hours}:{oneDigitMins && 0}
          {mins}:{oneDigitSeconds && 0}
          {seconds}
        </div>
        <div id="controls">
          {pauseDisplay && <button onClick={stopTimer}>■</button>}
          {!pauseDisplay && <button onClick={startTimer}>▶</button>}
          <button onClick={restartTimer}>⟳</button>
          <button>LAP</button>
          <button>CLEAR LAPS</button>
        </div>
      </div>
      <table id="laps"></table>
    </div>
  );
}

export default App;
