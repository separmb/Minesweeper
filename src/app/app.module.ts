import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainGamePageComponent } from './main-game-page/main-game-page.component';
import {ManageGameboardService} from "./manage-gameboard.service";
import { ControlbarComponent } from './controlbar/controlbar.component';


@NgModule({
  declarations: [
    AppComponent,
    MainGamePageComponent,
    ControlbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ManageGameboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
