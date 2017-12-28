import { Component, OnInit } from '@angular/core';
import {ManageGameboardService} from "../manage-gameboard.service";

@Component({
  selector: 'app-controlbar',
  templateUrl: './controlbar.component.html',
  styleUrls: ['./controlbar.component.css']
})
export class ControlbarComponent implements OnInit {

  constructor(private mgs:ManageGameboardService) { }

  ngOnInit() {
  }

}
