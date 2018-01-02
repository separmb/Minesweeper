import { Component, OnInit } from '@angular/core';
import {ManageGameboardService} from "../manage-gameboard.service";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  constructor(private mgs:ManageGameboardService) {

  }

  ngOnInit() {
  }

}
