export interface Tile {

  location: number[];
  isMine: boolean;
  isHidden: boolean;
  neighboringMines: number;

}
