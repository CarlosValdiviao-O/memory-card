import React, { useState } from "react";
import Game from "./components/Game";
import './components/styles.css'

function App() {
  const [ score, setScore ] = useState(0);
  const [ best, setBest ] = useState(0);
  const updateScores = (num) => {
    setScore(num);
    if (num > best) setBest(num);
  }
  return (
    <div className="App">
      <header>
        <h1>MeMoRy GaMe</h1>
        <div id="box">
          <p id="score">Score: {score}</p>
          <p id="best">Best: {best}</p>
        </div>
      </header>
      <Game updateScores = {updateScores} />
    </div>
  );
}

export default App;
