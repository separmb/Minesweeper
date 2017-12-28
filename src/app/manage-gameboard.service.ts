import { Injectable } from '@angular/core';
import {Tile} from "./tile";

@Injectable()
export class ManageGameboardService {
  gameboard: Tile[][];
  rows: number;
  cols: number;

  constructor() {
    this.generateNewBoard();
  }

  randomIntFromInterval(min,max) : number
  {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  doNeighborCount(x: number,y: number) : number {
    let mines = 0;

    for(let i = x-1; i <= x+1; i++) {
      for(let j = y-1; j <= y+1; j++) {
        try {
          if (this.gameboard[i][j].isMine) {
            mines++;
          }
        }
        catch(Error) {
          //this will only happen when we go outside array bounds
          continue;
        }
      }
    }

    return mines;
  }

  // this method reflects changes in tiles during gameplay
  getTileValue(tile: Tile): string {
    let value = " ";

    if(!tile.isHidden) {
      if (tile.isMine) {
        value = "💣";
      } else {
        value = tile.neighboringMines.toString();
      }
    }
    if (tile.neighboringMines == 0) {
      value = " ";
    }
    return value;
  }

  // this is the game play action method
  revealTile(x: number, y: number) {
    if (this.gameboard[x][y].neighboringMines == 0 && this.gameboard[x][y].isHidden) {
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          try {
            if (this.gameboard[i][j].neighboringMines >= 0) {
              this.revealTile(i, j);
            }
          }
          catch (Error) {
            //this will only happen when we go outside array bounds
            continue;
          }
        }
      }
    }

    this.gameboard[x][y].isHidden = false;

    if (this.gameboard[x][y].isMine) {
      window.alert("Game over!  You hit a mine!");
      this.revealBoard()
    }
  }


  getButtonStyle(tile: Tile) : string {
    let style = "";
    if (tile.isHidden) {
      style = "btn btn-primary custom activetile";
    } else {
      style = "btn btn-secondary custom disabled";
    }

    switch (tile.neighboringMines) {
      case 1:
        style = style + " one";
        break;
      case 2:
        style = style + " two";
        break;
      case 3:
        style = style + " three";
        break;
      case 4:
        style = style + " four";
        break;
      case 5:
        style = style + " five";
        break;
      case 6:
        style = style + " six";
        break;
      case 7:
        style = style + " seven";
        break;
      case 8:
        style = style + " eight";
        break;
    }

    return style;

  }

  generateNewBoard() {
    // first, lay the mines
    this.gameboard = [];
    for(let row=0; row < 20; row++) {
      this.gameboard[row] = [];
      for(let col=0; col < 30; col++) {
        let randomNum = this.randomIntFromInterval(1,56);
        if(randomNum % 7 == 0) {
          let tile: Tile  = { location: [row,col], isMine: true, isHidden: true, neighboringMines: -1};
          this.gameboard[row][col] = tile;

        } else {
          let tile: Tile  = { location: [row,col], isMine: false, isHidden: true, neighboringMines: 0};
          this.gameboard[row][col] = tile;
        }
      }
    }

    //second, calculate proximity numbers for each cell w/o a mine
    for(let row=0; row < 20; row++) {
      for(let col=0; col < 30; col++) {
        if(!this.gameboard[row][col].isMine) {
          let neighborCount = this.doNeighborCount(row,col);
          if(neighborCount != 0) {
            this.gameboard[row][col].neighboringMines = neighborCount;
          }

        }
      }
    }

    this.rows = this.gameboard.length;
    this.cols = this.gameboard[0].length;
  }

  revealBoard() {
    for(let row=0; row < 20; row++) {
      for (let col = 0; col < 30; col++) {
        this.gameboard[row][col].isHidden = false;
      }
    }
  }

}
