import { Component, OnInit } from '@angular/core';
import {ManageGameboardService} from "../manage-gameboard.service";

@Component({
  selector: 'app-main-game-page',
  templateUrl: './main-game-page.component.html',
  styleUrls: ['./main-game-page.component.css']
})
export class MainGamePageComponent implements OnInit {

  constructor(private mgs:ManageGameboardService) {

  }

  ngOnInit() {
  }

}
