import { useState } from "react";
import { gridSize } from "../../game/map/mapSettings";

interface GameCreatorProps {
  showGame: () => void;
}

const GameCreator: React.FC<GameCreatorProps> = ({ showGame }) => {
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(40);
  gridSize.width = width;
  gridSize.height = height;
  return (
    <div className="game-creator">
      <div className="creator-settings">
        <label htmlFor="width">Width</label>
        <input
          type="number"
          name="width"
          value={width}
          onChange={(e) => numericOnly(e, setWidth)}
          onKeyPress={(e) => numericOnly(e, setWidth)}
        ></input>
        <label htmlFor="height">Height</label>
        <input
          type="number"
          name="height"
          value={height}
          onChange={(e) => numericOnly(e, setHeight)}
          onKeyPress={(e) => numericOnly(e, setHeight)}
        ></input>
      </div>
      <button onClick={showGame}>Create Game</button>
    </div>
  );
};

const numericOnly = (e: any, action: (val: any) => void) => {
  let val = parseInt(e.target.value);
  val = isNaN(val) ? 0 : val;
  action(val);
};

export default GameCreator;
