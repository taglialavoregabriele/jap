import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { GameType } from './common/entities';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatSidenavModule,
  ],
})
export class AppComponent {

  showFillerGames: boolean = false;
  showFillerDecks: boolean = false;

  constructor(
    protected router: Router,
  ) {
  }

  goToGame(gameType: GameType) {
    if (gameType == GameType.MATCH_PAIRS) this.router.navigateByUrl('/game/matchpairs')
    else if (gameType == GameType.WORD_TYPE) this.router.navigateByUrl('/game/wordtype')
    else if (gameType == GameType.NOT_IMPLEMENTED) this.router.navigateByUrl('/game/notimplemented')
  }
  goToEditDecks(gameType: GameType) {
    if (gameType == GameType.MATCH_PAIRS) this.router.navigateByUrl('/editdecks/matchpairs')
    else if (gameType == GameType.WORD_TYPE) this.router.navigateByUrl('/editdecks/wordtype')
    else if (gameType == GameType.NOT_IMPLEMENTED) this.router.navigateByUrl('/editdecks/notimplemented')
  }
  goToSettings() {
    this.router.navigateByUrl('/settings')
  }

  get GameType(): typeof GameType {
    return GameType
  }
}
