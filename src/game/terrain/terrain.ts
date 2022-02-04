import { gridSize } from "../map/mapSettings";
import { Coordinate } from "../map/mapTypes";
import { getTerrainColor, Terrain, TerrainType } from "./terrainTypes";

class TerrainMap {
  tiles: Terrain[][] = [];
  colors: string[][] = [];

  createTerrainMap = (onFinished: () => void) => {
    this.tiles = [];
    this.colors = [];
    for (let x = 0; x < gridSize.width; x++) {
      this.tiles[x] = [];
      this.colors[x] = [];
      for (let y = 0; y < gridSize.height; y++) {
        const random = Math.floor(
          Math.random() * Object.keys(TerrainType).length
        );
        const type = Object.keys(TerrainType)[random] as TerrainType;
        const terrainTile = { type };
        this.tiles[x][y] = terrainTile;
        this.colors[x][y] = getTerrainColor(type);
      }
    }
    onFinished();
  };

  getTerrain(coor: Coordinate) {
    if (this.tiles === undefined || this.tiles[coor.x] === undefined) {
      throw new Error(
        JSON.stringify(coor) + " terrain not found, map not initialised"
      );
    }
    const ter = this.tiles[coor.x][coor.y];
    if (ter === undefined) {
      throw new Error(
        JSON.stringify(coor) + " terrain not found, undefined at location"
      );
    }
    return ter;
  }
}

const terrain = new TerrainMap();

export default terrain;
