import { useEffect, useState } from "react";
import { calculatePathFromSelected } from "../../game/map/DOMAccessor";
import { Coordinate } from "../../game/map/mapTypes";
import selection from "../../game/selection/selection";
import terrain from "../../game/terrain/terrain"; //, { terrainLoaded }
import { movementCost, TerrainType } from "../../game/terrain/terrainTypes";
import TerrainIcon from "./TerrainIcon";

interface HexagonProps {
  coor: Coordinate;
  terrainCreated: boolean;
}

const Hexagon: React.FC<HexagonProps> = ({ coor, terrainCreated }) => {
  const [type, setType] = useState<TerrainType>();
  const key = coor.x + ", " + coor.y;
  const onClick = () => {
    selection.setSelectedTile(coor);
  };
  const onRightClick = (e: any) => {
    calculatePathFromSelected(coor);
    e.preventDefault();
  };
  useEffect(() => {
    terrainCreated && setType(terrain.getTerrain(coor)?.type);
  }, [coor, terrainCreated]);
  return (
    <div
      id={key}
      key={"wrapper" + key}
      className={toClassname(type)}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      <TerrainIcon type={type} />
      {terrainCreated && (
        <h3 className="coordinate">{key + ": " + movementCost(coor)}</h3>
      )}
    </div>
  );
};

const toClassname = (type: TerrainType | undefined) => {
  if (type === undefined) return "hexagon";
  let name = type as string;
  name = name.toLowerCase();
  if (name === "hillforest") name = "hill-forest";
  return "hexagon " + name;
};

export default Hexagon;
