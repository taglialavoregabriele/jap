import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';



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
