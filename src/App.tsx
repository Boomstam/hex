import React, { useState } from "react";
import "./css/map.css";
import "./css/hexagon.css";
import "./css/menu-bar.css";
import "./css/game-creator.css";
import MenuBar from "./components/ui/MenuBar";
import HexagonGrid from "./components/map/HexagonGrid";
import GameCreator from "./components/ui/GameCreator";

function App() {
  const [gameShown, setGameShown] = useState(false);
  return (
    <div id="app">
      <MenuBar gameShown={gameShown} hideGame={() => setGameShown(false)} />
      {gameShown ? (
        <HexagonGrid />
      ) : (
        <GameCreator showGame={() => setGameShown(true)} />
      )}
    </div>
  );
}

export default App;
