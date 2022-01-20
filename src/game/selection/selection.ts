import { Coordinate } from "../map/mapTypes";
import { deleteCurrentPath, findByCoordinate } from "../map/DOMAccessor";

let selectedTile: Coordinate | undefined = undefined;
let selectedTileElement: any | undefined = undefined;

const getSelectedTile = () => {
  return selectedTile;
};

const setSelectedTile = (coor: Coordinate) => {
  if (selectedTileElement !== undefined) deselectCurrent();
  selectedTile = coor;
  const foundTileEl = findByCoordinate(coor);
  selectedTileElement = foundTileEl;
  selectedTileElement.className = selectedTileElement.className + " selected";
};

const selection = {
  getSelectedTile,
  setSelectedTile,
};

const deselectCurrent = () => {
  selectedTileElement.className = selectedTileElement.className.replace(
    " selected",
    ""
  );
  deleteCurrentPath();
};

export default selection;
