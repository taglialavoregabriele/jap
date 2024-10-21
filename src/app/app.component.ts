import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { EditDecksComponent } from './edit-decks/edit-decks.component';
import { GameComponent } from './game/game.component';
import { SettingsComponent } from './settings/settings.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
})
export class AppComponent {

  constructor(
    protected router: Router,
  ) {

  }

  goToGame() {
    this.router.navigateByUrl('/game')
  }
  goToEditDecks() {
    this.router.navigateByUrl('/editDecks')
  }
  goToSettings() {
    this.router.navigateByUrl('/settings')
  }
}
