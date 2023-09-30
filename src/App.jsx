import { useEffect, useState } from "react";

function App() {
  let [seconds, setSeconds] = useState("00");
  let [mins, setMins] = useState("00");
  let [hours, setHours] = useState("00");
  let [timer, setTimer] = useState(null);
  let [pauseDisplay, setPauseDisplay] = useState(false);
  let [numberOfLaps, setNumberOfLaps] = useState(0);
  let [laps, setLaps] = useState([]);

  function startTimer() {
    setPauseDisplay(true);
    setTimer(
      (timer = setInterval(() => {
        setSeconds((seconds) =>
          parseInt(seconds) >= 9
            ? parseInt(seconds) + 1
            : `0${parseInt(seconds) + 1}`
        );
        if (seconds > 59) {
          setSeconds((seconds = "00"));
          setMins((mins) =>
            parseInt(mins) >= 9 ? parseInt(mins) + 1 : `0${parseInt(mins) + 1}`
          );
        }
        console.log(seconds);
      }, 20))
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

  function addLap() {
    setNumberOfLaps((numberOfLaps += 1));
    laps.push({
      number: { numberOfLaps },
      time: `${hours}:${mins}:${seconds}`,
    });
    console.log(laps);
  }

  return (
    <div id="root">
      <div id="lightAndDark">
        <button id="toggle"></button>
      </div>
      <div id="time">
        <div id="display">
          {hours}:{mins}:{seconds}
        </div>
        <div id="controls">
          {pauseDisplay && <button onClick={stopTimer}>■</button>}
          {!pauseDisplay && <button onClick={startTimer}>▶</button>}
          <button onClick={restartTimer}>⟳</button>
          <button onClick={addLap}>LAP</button>
          <button>CLEAR LAPS</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>LAP</th>
            <th>TIME</th>
            <th>INTERVAL</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default App;
