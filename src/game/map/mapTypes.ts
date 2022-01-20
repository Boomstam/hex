export interface Coordinate {
  x: number;
  y: number;
}

export interface Tile {
  coor: Coordinate;
  element: HTMLElement;
}

export interface Size {
  width: number;
  height: number;
}