import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [GameComponent],
  imports: [
    RouterModule
  ],
  exports: [GameComponent]
})
export class GameModule { }
