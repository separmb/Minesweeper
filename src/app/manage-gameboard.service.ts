import { Injectable } from '@angular/core';
import {Tile} from "./tile";

@Injectable()
export class ManageGameboardService {
  gameboard: Tile[][];
  rows: number;
  cols: number;
  boardSize: number;
  remainingTiles: number;

  constructor() {
    this.generateNewBoard(1);
  }

  setBoardDimensions() {
    switch (this.boardSize) {
      case 1:
        this.rows = 10;
        this.cols = 10;
        break;
      case 2:
        this.rows = 20;
        this.cols = 20;
        break;
      case 3:
        this.rows = 25;
        this.cols = 50;
        break;
    }
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
    if(tile.isFlagged && tile.isHidden) {
      value = "🚩";
    } else if (tile.neighboringMines == 0) {
      value = " ";
    }
    return value;
  }

  //lays or removes a "flag" marker
  toggleFlag(x: number, y: number) {
    this.gameboard[x][y].isFlagged = !this.gameboard[x][y].isFlagged;
  }

  // this is the game play action method
  revealTile(x: number, y: number) {
    if(this.gameboard[x][y].isFlagged) {
      window.alert("You must clear the flag to reveal the tile.");
      return;
    }

    if (this.gameboard[x][y].isMine) {
      window.alert("Game over!  You hit a mine!");
      this.revealBoard();
      return;
    }

    this.gameboard[x][y].isHidden = false;
    this.remainingTiles--;

    if(this.remainingTiles == 0) {
      window.alert("You win!  All mines have been cleared!");
      return;
    }

    if (this.gameboard[x][y].neighboringMines >= 0) {
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          try {
            //stop recursion if we hit a mine
            if(this.gameboard[i][j].isMine) {
              return;
            }
            if (this.gameboard[i][j].neighboringMines >= 0 && this.gameboard[i][j].isHidden) {
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
  }


  getTileStyle(tile: Tile) : string {
    let style = "";
    if (tile.isHidden) {
      style = "btn btn-primary custom activetile";
    } else {
      style = "btn btn-secondary custom disabled";
    }

    if (tile.isHidden && tile.isFlagged) {
      style = style + " one";
      return style;
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

  generateNewBoard(size: number) {
    this.boardSize = size;
    this.remainingTiles = 0;
    this.setBoardDimensions();

    // first, lay the mines
    this.gameboard = [];
    for(let row=0; row < this.rows; row++) {
      this.gameboard[row] = [];
      for(let col=0; col < this.cols; col++) {
        let randomNum = this.randomIntFromInterval(1,56);
        if(randomNum % 4 == 0) {
          let tile: Tile  = { isMine: true, isHidden: true, isFlagged: false, neighboringMines: -1};
          this.gameboard[row][col] = tile;

        } else {
          let tile: Tile  = { isMine: false, isHidden: true, isFlagged: false, neighboringMines: 0};
          this.gameboard[row][col] = tile;
          this.remainingTiles++;
        }
      }
    }

    //second, calculate proximity numbers for each cell w/o a mine
    for(let row=0; row < this.rows; row++) {
      for(let col=0; col < this.cols; col++) {
        if(!this.gameboard[row][col].isMine) {
          let neighborCount = this.doNeighborCount(row,col);
          if(neighborCount != 0) {
            this.gameboard[row][col].neighboringMines = neighborCount;
          }

        }
      }
    }
  }

  revealBoard() {
    for(let row=0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.gameboard[row][col].isHidden = false;
      }
    }
  }

  showAboutInfo() {
    window.alert("Application: Angular Minesweeper Clone\nDeveloper: Michael Separ\nVersion: 0.1\n" +
       "Instructions: left-click to reveal tiles, right-click to flag tiles")
  }

}
