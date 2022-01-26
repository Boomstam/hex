import { Coordinate } from "../map/mapTypes";
import { movementCost } from "../terrain/terrainTypes";
import map from "../map/map";

const hCostMod = 2; // Accounts for average movement costs in the heuristic, can be refined

export class MapNode {
  coor: Coordinate;
  cube: Cube;
  parent?: MapNode;
  fCost: number;
  gCost: number;
  hCost: number;

  constructor(
    coor: Coordinate,
    gCost: number,
    hCost: number,
    parent?: MapNode
  ) {
    this.coor = coor;
    this.parent = parent;
    this.cube = toCube(coor);
    this.gCost = gCost;
    this.hCost = hCost;
    this.fCost = gCost + hCost;
  }

  newNeighborsExcluding(nodes: MapNode[], start: Cube, goal: Cube) {
    const neighborCubes = this.cube.neighbors();
    const neighbors: MapNode[] = [];
    for (const cubePos of neighborCubes) {
      if (nodes.some((node) => node.cube.equals(cubePos))) continue;
      const coor = toCoor(cubePos);
      if (map.exists(coor) === false) continue;
      const movCost = movementCost(coor);
      if (movCost < 0) continue;
      const parentGCost = this.parent?.gCost || 0;
      const gCost = parentGCost + movCost;
      const hCost = cubePos.distanceTo(goal) * hCostMod + movCost;
      const node = new MapNode(coor, gCost, hCost, this);
      neighbors.push(node);
    }
    return neighbors;
  }

  equals(other: MapNode) {
    return this.cube.equals(other.cube);
  }

  toString() {
    const str =
      this.toCoorString() +
      ": g=" +
      this.gCost +
      ", h=" +
      this.hCost +
      ", parent=" +
      JSON.stringify(this.parent?.coor);
    return str;
  }

  toCoorString = () => JSON.stringify(this.coor);
}

export class Cube {
  q: number;
  r: number;
  s: number;

  constructor(q: number, r: number, s: number) {
    this.q = q;
    this.r = r;
    this.s = s;
  }

  substract(other: Cube) {
    return new Cube(this.q - other.q, this.r - other.r, this.s - other.s);
  }

  add(other: Cube) {
    return new Cube(this.q + other.q, this.r + other.r, this.s + other.s);
  }

  distanceTo(other: Cube) {
    const vec = other.substract(this);
    const distance = (Math.abs(vec.q) + Math.abs(vec.r) + Math.abs(vec.s)) / 2;
    return distance;
  }

  neighbors() {
    const neighbors: any[] = [];
    for (const dirVect of directionVectors) {
      neighbors.push(this.add(dirVect));
    }
    return neighbors;
  }

  neighbor(dir: Direction) {
    return this.add(getDirVect(dir));
  }

  equals(other: Cube) {
    return this.q === other.q && this.r === other.r && this.s === other.s;
  }
}

export const directionVectors = [
  new Cube(0, -1, 1),
  new Cube(1, -1, 0),
  new Cube(1, 0, -1),
  new Cube(0, 1, -1),
  new Cube(-1, 1, 0),
  new Cube(-1, 0, 1),
];

export enum Direction {
  LeftUp = 0,
  RightUp = 1,
  Right = 2,
  RightDown = 3,
  LeftDown = 4,
  Left = 5,
}

export const toCube = (coor: Coordinate): Cube => {
  const q = coor.x - (coor.y - (coor.y & 1)) / 2;
  const r = coor.y;
  return new Cube(q, r, -q - r);
};

export const toCoor = (cube: Cube): Coordinate => {
  var x = cube.q + (cube.r - (cube.r & 1)) / 2;
  var y = cube.r;
  return { x, y };
};

const getDirVect = (dir: Direction) => directionVectors[dir];
