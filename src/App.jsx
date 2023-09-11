import { useState } from "react";

function App() {
  return (
    <div id="root">
      <div id="lightAndDark">
        <button id="toggle"></button>
      </div>
      <div id="time">
        <div id="display">00:00:00</div>
        <div id="controls">
          <button>■</button>
          <button>▶</button>
          <button>⟳</button>
          <button>LAP</button>
          <button>CLEAR LAPS</button>
        </div>
      </div>
      <table id="laps"></table>
    </div>
  );
}

export default App;
