import { useEffect } from "react";
import map from "../game/map/map";
import { Size } from "../game/map/mapTypes";
import HexagonRow from "./HexagonRow";

interface HexagonGridProps {
  gridSize: Size;
}

const HexagonGrid: React.FC<HexagonGridProps> = ({ gridSize }) => {
  const columns = new Array(gridSize.height).fill(0);
  useEffect(() => {
    map.createMap(gridSize);
  });
  return (
    <div className="grid">
      {columns.map((_, x) => (
        <HexagonRow
          key={"hex_row_" + x}
          rowIndex={x}
          rowSize={gridSize.width}
        />
      ))}
    </div>
  );
};

export default HexagonGrid;
