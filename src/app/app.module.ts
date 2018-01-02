import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {GameBoardComponent} from './game-board/game-board.component';
import {ManageGameboardService} from "./manage-gameboard.service";
import { ControlBarComponent } from './control-bar/control-bar.component';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    ControlBarComponent,
  ],
  imports: [
    BrowserModule,
    MatSliderModule
  ],
  providers: [ManageGameboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
