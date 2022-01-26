import { Coordinate } from "../map/mapTypes";
import terrain from "./terrain";

export interface Terrain {
  type: TerrainType;
}

export interface Erodable {
  integrity: number;
}

export enum TerrainType {
  Water = "Water",
  Crater = "Crater",
  Earth = "Earth",
  Mud = "Mud",
  Forest = "Forest",
  Hill = "Hill",
  HillForest = "HillForest",
  Mountain = "Mountain",
}

export const movementCost = (coor: Coordinate): number => {
  const ter = terrain.getTerrain(coor);
  const cost = getMovementCost(ter.type);
  return cost;
};

const getMovementCost = (type: TerrainType) => {
  switch (type) {
    case TerrainType.Water:
      return -1;
    case TerrainType.Crater:
      return 2;
    case TerrainType.Earth:
      return 1;
    case TerrainType.Mud:
      return 3;
    case TerrainType.Forest:
      return 2;
    case TerrainType.Hill:
      return 2;
    case TerrainType.HillForest:
      return 3;
    case TerrainType.Mountain:
      return 4;
  }
};
