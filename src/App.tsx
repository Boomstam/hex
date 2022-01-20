import React from "react";
import "./css/map.css";
import "./css/hexagon.css";
import "./css/menu-bar.css";
import HexagonGrid from "./components/HexagonGrid";
import MenuBar from "./components/MenuBar";
//import FullScreen from "react-request-fullscreen";
//import fs from 'fullscreen';

const gridSize = { width: 20, height: 10 };

function App() {
  return (
    <div id="app">
      <MenuBar />
      <HexagonGrid gridSize={gridSize} />
    </div>
  );
}

export default App;
/*

https://www.npmjs.com/package/react-request-fullscreen

<FullScreen
        ref={(ref) => {
          this.fullScreenRef = ref;
        }}
        onFullScreenChange={this.onFullScreenChange.bind(this)}
      >
        <div className="rq" onClick={this.requestOrExitFullScreen.bind(this)}>
          {!isFullScreen ? "Request FullScreen" : "Exit FullScreen"}
        </div>
      </FullScreen>
*/