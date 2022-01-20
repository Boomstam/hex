import { calculatePathFromSelected } from "../game/map/DOMAccessor";
import { Coordinate } from "../game/map/mapTypes";
import selection from "../game/selection/selection";

interface HexagonProps {
  coor: Coordinate;
}

const Hexagon: React.FC<HexagonProps> = ({ coor }) => {
  const key = coor.x + ", " + coor.y;
  const onClick = () => {
    selection.setSelectedTile(coor);
  };
  const onRightClick = (e: any) => {
    calculatePathFromSelected(coor);
    e.preventDefault();
  };
  return (
    <div
      id={key}
      key={"wrapper" + key}
      className="hexagon"
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      <h3 className="coordinate">{key}</h3>
    </div>
  );
};

export default Hexagon;
