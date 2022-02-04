import { useEffect, useState } from "react";
import map from "../../game/map/map";
import { gridSize, minimapPxSize } from "../../game/map/mapSettings";
import terrain from "../../game/terrain/terrain";
import HexagonRow from "./HexagonRow";

interface HexagonGridProps {}

const HexagonGrid: React.FC<HexagonGridProps> = () => {
  const columns = new Array(gridSize.height).fill(0);
  const [terrainCreated, setTerrainCreated] = useState(false);
  useEffect(() => {
    map.createMap();
    terrain.createTerrainMap(onTerrainCreated);
  }, []);
  const onTerrainCreated = () => {
    setTerrainCreated(true);
    const colors = terrain.colors;
    var drawingCanvas = document.getElementById("minimap") as HTMLCanvasElement;
    if (!drawingCanvas?.getContext) return;
    var context = drawingCanvas.getContext("2d");
    if (context === null) return;
    drawingCanvas.width = gridSize.width * minimapPxSize + minimapPxSize / 2;
    drawingCanvas.height = gridSize.height * minimapPxSize;
    for (var x = 0; x < colors.length; x++) {
      var col = colors[x];
      for (var y = 0; y < col.length; y++) {
        context.fillStyle = col[y]; // assumes the data is in #hex format already.
        const oddRowOffset = y % 2 === 1 ? minimapPxSize / 2 : 0;
        context.fillRect(
          x * minimapPxSize + oddRowOffset,
          y * minimapPxSize,
          minimapPxSize,
          minimapPxSize
        );
      }
    }
  };
  return (
    <div id="grid" className="grid" onContextMenu={(e) => e.preventDefault()}>
      {columns.map((_, x) => (
        <HexagonRow
          key={"hex_row_" + x}
          rowIndex={x}
          rowSize={gridSize.width}
          terrainCreated={terrainCreated}
        />
      ))}
    </div>
  );
};

export default HexagonGrid;
