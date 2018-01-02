import { Component, OnInit } from '@angular/core';
import {ManageGameboardService} from "../manage-gameboard.service";
import {MatSliderChange} from "@angular/material";

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit {

  ngOnInit() {

  }

  constructor(private mgs:ManageGameboardService) {}

  onInputChange(event: MatSliderChange) {
    this.mgs.generateNewBoard(event.value);
  }
}
