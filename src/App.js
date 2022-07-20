import React, { useState } from "react";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Memory Game</h1>
        <div>
          <p id="score"></p>
          <p id="best"></p>
        </div>
      </header>
      <Game />
    </div>
  );
}

export default App;
