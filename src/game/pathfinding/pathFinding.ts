import { Coordinate } from "../map/mapTypes";
import { toCube, MapNode } from "./pathfindingTypes";

const maxNumIterations = 9999;

export const findPath = (
  start: Coordinate,
  goal: Coordinate
): Coordinate[] | undefined => {
  const startCube = toCube(start);
  const goalCube = toCube(goal);
  const startNode = new MapNode(start, 0, Number.MAX_VALUE);
  let openList: MapNode[] = [startNode];
  let closedList: MapNode[] = [];
  let iteration = 0;
  let pathFound = false;
  while (pathFound === false) {
    if (openList.length === 0) break;
    let currentFoundNodes: MapNode[] = [];
    openList.sort((a, b) => a.fCost - b.fCost);
    for (const node of openList) {
      console.log(node.toString());
    }
    const node = openList[0];
    console.log("chosen: " + node.toCoorString());
    const knownNodes = openList.concat(closedList).concat(currentFoundNodes);
    const openNeighbors = node.newNeighborsExcluding(
      knownNodes,
      startCube,
      goalCube
    );
    const foundGoal = openNeighbors.filter((neighbor) =>
      neighbor.cube.equals(goalCube)
    );
    if (foundGoal.length > 0) {
      const goalNode = foundGoal[0];
      pathFound = true;
      const nodePath = retracePath(goalNode);
      const path = nodePath.map((n) => n.coor);
      return path;
    }
    currentFoundNodes = currentFoundNodes.concat(openNeighbors);
    openList = openList.slice(1, openList.length - 1);
    closedList.push(node);
    openList = openList.concat(currentFoundNodes);
    iteration++;
    if (iteration > maxNumIterations) {
      throw new Error("findPath() over max iterations for" + start + goal);
    }
  }
  console.log("Path not found for " + start + goal);
};

const retracePath = (goal: MapNode) => {
  const backAtStart = false;
  const path = [goal];
  let currentNode = goal;
  let iteration = 0;
  while (backAtStart === false) {
    if (currentNode.parent === undefined) break;
    currentNode = currentNode.parent;
    path.push(currentNode);
    iteration++;
    if (iteration > maxNumIterations) {
      throw new Error("retracePath() over max iterations for" + goal);
    }
  }
  return path;
};
