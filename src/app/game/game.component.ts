import { Component, OnInit } from '@angular/core';
import { StoreService } from '../common/store.service';
import { Deck, GameSettings } from '../common/entities';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsDialogComponent, SettingsDialogModule } from './settingsModal/settings-modal.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    SettingsDialogModule
  ]
})
export class GameComponent implements OnInit {
  decks: Deck[]
  settings: GameSettings = {}
  settingsModalRef: MatDialogRef<SettingsDialogComponent>

  constructor(protected storeService: StoreService, protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.storeService.getDecks().then(decks => {
      this.decks = decks
    })
  }

  openSettings() {
    this.settingsModalRef = this.dialog.open(SettingsDialogComponent, {
      data: {
        settings: this.settings ? this.settings : {},
      }
    });

    this.settingsModalRef.afterClosed().subscribe(settings => this.settings = settings)
  }
}
