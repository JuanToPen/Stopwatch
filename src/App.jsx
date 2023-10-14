import { useEffect, useState } from "react";

function App() {
  let [seconds, setSeconds] = useState(0);
  let [oneDigitSeconds, setOneDigitSeconds] = useState(true);
  let [mins, setMins] = useState(0);
  let [oneDigitMins, setOneDigitMins] = useState(true);
  let [hours, setHours] = useState(0);
  let [oneDigitHours, setOneDigitHours] = useState(true);
  let [timer, setTimer] = useState(null);
  let [pauseDisplay, setPauseDisplay] = useState(false);
  let [numberOfLaps, setNumberOfLaps] = useState(0);
  let [laps, setLaps] = useState([]);
  let [lapTimes, setLapTimes] = useState([]);
  let [lapsDisplay, setLapsDisplay] = useState(false);
  let [darkMode, setDarkMode] = useState(false);

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
    clearLaps();
  }

  function intervalCalc(lapTimePrev, lapTimeCurr) {
    let prevSeconds =
      lapTimePrev.hours * 3600 + lapTimePrev.mins * 60 + lapTimePrev.seconds;
    let currentSeconds =
      lapTimeCurr.hours * 3600 + lapTimeCurr.mins * 60 + lapTimeCurr.seconds;
    let newTotalSeconds = currentSeconds - prevSeconds;
    let newHours = Math.floor(newTotalSeconds / 3600);
    newTotalSeconds -= newHours * 3600;
    let newMins = Math.floor(newTotalSeconds / 60);
    newTotalSeconds -= newMins * 60;
    let newSeconds = Math.floor(newTotalSeconds);
    return `${newHours > 9 ? `${newHours}` : `0${newHours}`}:${
      newMins > 9 ? `${newMins}` : `0${newMins}`
    }:${newSeconds > 9 ? `${newSeconds}` : `0${newSeconds}`}`;
  }

  function addLap() {
    setLapsDisplay(true);
    setNumberOfLaps((numberOfLaps += 1));
    lapTimes.push({ hours, mins, seconds });
    if (numberOfLaps === 1) {
      let firstIntervalTime = `${hours > 9 ? `${hours}` : `0${hours}`}:${
        mins > 9 ? `${mins}` : `0${mins}`
      }:${seconds > 9 ? `${seconds}` : `0${seconds}`}`;
      laps.push({
        number: numberOfLaps,
        time: firstIntervalTime,
        interval: firstIntervalTime,
      });
    } else {
      laps.push({
        number: numberOfLaps,
        time: `${hours > 9 ? `${hours}` : `0${hours}`}:${
          mins > 9 ? `${mins}` : `0${mins}`
        }:${seconds > 9 ? `${seconds}` : `0${seconds}`}`,
        interval: intervalCalc(
          lapTimes[lapTimes.length - 2],
          lapTimes[lapTimes.length - 1]
        ),
      });
    }
    console.log(laps);
  }

  function clearLaps() {
    setLapsDisplay(false);
    setNumberOfLaps((numberOfLaps = 0));
    setLaps((laps = []));
  }

  return (
    <div
      id="root"
      style={
        darkMode
          ? {
              "--night-mode": "black",
              "--light-mode": "white",
              "--gray-mode": "rgb(25,25,25)",
            }
          : {}
      }
    >
      <div id="toggle">
        <button
          onClick={() => {
            setDarkMode(!darkMode);
          }}
          className={darkMode ? "active" : ""}
        ></button>
      </div>
      <div id="time">
        <div id="display">
          {oneDigitHours && 0}
          {hours}:{oneDigitMins && 0}
          {mins}:{oneDigitSeconds && 0}
          {seconds}
        </div>
        <div id="controls">
          {pauseDisplay && (
            <button onClick={stopTimer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="8"
                  width="5"
                  height="16"
                  fill={darkMode ? "black" : "white"}
                />
                <rect
                  x="15"
                  y="8"
                  width="5"
                  height="16"
                  fill={darkMode ? "black" : "white"}
                />
              </svg>
            </button>
          )}
          {!pauseDisplay && <button onClick={startTimer}>▶</button>}
          <button onClick={restartTimer}>⟳</button>
          <button onClick={addLap}>LAP</button>
          <button onClick={clearLaps}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
                fill={darkMode ? "black" : "white"}
              />
            </svg>
          </button>
        </div>
      </div>
      <table id="laps">
        {lapsDisplay && (
          <thead>
            <tr>
              <th>LAP</th>
              <th>TIME</th>
              <th>INTERVAL</th>
            </tr>
          </thead>
        )}
        <tbody>
          {laps.map((lap) => (
            <tr>
              <td>{lap.number}</td>
              <td>{lap.time}</td>
              <td>{lap.interval}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="space">.</div>
    </div>
  );
}

export default App;
