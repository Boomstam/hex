import { Coordinate } from "./mapTypes";
import { findPath } from "../pathfinding/pathFinding";
import selection from "../selection/selection";

export const findByCoordinate = (coor: Coordinate) => {
  const element = document.getElementById(coor.x + ", " + coor.y);
  if (element === null) throw new Error("element not found for coor:" + coor);
  return element;
};

export const calculatePathFromSelected = (goal: Coordinate) => {
  const start = selection.getSelectedTile();
  if (start === undefined) return;
  deleteCurrentPath();
  const path = findPath(start, goal);
  if (path === undefined) return;
  const pathWithoutFirstAndLast = path.slice(1, path.length - 1);
  for (const coor of pathWithoutFirstAndLast) {
    const element = findByCoordinate(coor);
    element.className = element.className + " path";
  }
  const goalElement = findByCoordinate(goal);
  goalElement.className = goalElement.className + " goal";
};

export const deleteCurrentPath = () => {
  const currentPath = document.getElementsByClassName("path");
  for (const tile of Object.values(currentPath)) {
    tile.className = tile.className.replace(" path", "");
  }
  const currentGoal = document.getElementsByClassName("goal");
  for (const tile of Object.values(currentGoal)) {
    tile.className = tile.className.replace(" goal", "");
  }
};

export const scrollToCoor = (target: Coordinate) => {
  const element = findByCoordinate(target);
  const position = getPosition(element);
  const halfScreenWidth = window.innerWidth / 2;
  const halfScreenHeight = window.innerHeight / 2;
  window.scrollTo(position.x - halfScreenWidth, position.y - halfScreenHeight);
};

export const distanceBetweenElements = (a: HTMLElement, b: HTMLElement) => {
  const aPosition = unnormalisedPositionAtCenter(a);
  const bPosition = unnormalisedPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
};

function unnormalisedPositionAtCenter(element: HTMLElement) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getPosition(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
}
