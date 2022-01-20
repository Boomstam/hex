import { Tile, Coordinate, Size } from "./mapTypes";
import { findByCoordinate } from "./DOMAccessor";

class GameMap {
  tiles: Tile[][] = [];

  createMap = (gridSize: Size) => {
    for (let x = 0; x < gridSize.width; x++) {
      this.tiles[x] = [];
      for (let y = 0; y < gridSize.height; y++) {
        const coor = { x, y };
        const element = findByCoordinate(coor);
        if (element === null) {
          throw new Error("No element found for:" + coor.x + ", " + coor.y);
        }
        const tile = { coor, element };
        this.tiles[tile.coor.x][tile.coor.y] = tile;
      }
    }
  };

  getTile(coor: Coordinate) {
    return this.tiles[coor.x][coor.y];
  }
}

const map = new GameMap();

export default map;
