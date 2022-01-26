import { useEffect, useState } from "react";
import map from "../../game/map/map";
import { gridSize } from "../../game/map/mapSettings";
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
  const onTerrainCreated = () => setTerrainCreated(true);
  return (
    <div className="grid" onContextMenu={(e) => e.preventDefault()}>
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
