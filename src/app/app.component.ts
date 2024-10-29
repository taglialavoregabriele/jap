import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';



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

  goToGame() {
    this.router.navigateByUrl('/game/matchpairs')
  }
  goToEditDecks() {
    this.router.navigateByUrl('/editDecks')
  }
  goToSettings() {
    this.router.navigateByUrl('/settings')
  }
}
