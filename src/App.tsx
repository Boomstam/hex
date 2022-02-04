import React, { useState } from "react";
import "./css/global.css";
import "./css/map.css";
import "./css/terrain.css";
import "./css/hexagon.css";
import "./css/menu-bar.css";
import "./css/game-creator.css";
import MenuBar from "./components/ui/MenuBar";
import HexagonGrid from "./components/map/HexagonGrid";
import GameCreator from "./components/ui/GameCreator";
import GameUI from "./components/ui/GameUI";

function App() {
  const [gameShown, setGameShown] = useState(false);
  return (
    <div id="app">
      <MenuBar gameShown={gameShown} hideGame={() => setGameShown(false)} />
      {gameShown ? (
        <>
          <HexagonGrid />
          <GameUI />
        </>
      ) : (
        <GameCreator showGame={() => setGameShown(true)} />
      )}
    </div>
  );
}

export default App;
