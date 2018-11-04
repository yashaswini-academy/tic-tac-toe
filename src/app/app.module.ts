import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { ScoreComponent } from './score/score.component';


@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    ScoreComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
