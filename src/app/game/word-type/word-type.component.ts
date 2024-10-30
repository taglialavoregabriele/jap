import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GameSettings, GameType, WordTypeDeck } from '../../common/entities';
import { SettingsDialogComponent, SettingsDialogModule } from '../settingsModal/settings-modal.component';
import { StoreService } from '../../common/store.service';
import { shuffle } from '../../common/utils';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    SettingsDialogModule
  ],
  templateUrl: './word-type.component.html',
  styleUrl: './word-type.component.scss'
})
export class WordTypeGameComponent implements OnInit {
  settingsModalRef: MatDialogRef<SettingsDialogComponent>
  settings: GameSettings = { selectedGame: GameType.WORD_TYPE }

  selectedDeck: WordTypeDeck

  constructor(protected storeService: StoreService, protected dialog: MatDialog) { }

  ngOnInit(): void { }

  openSettings() {
    this.settingsModalRef = this.dialog.open(SettingsDialogComponent, {
      data: {
        settings: this.settings ? this.settings : {} as GameSettings,
      }
    });

    this.settingsModalRef.afterClosed().subscribe(settings => {
      this.settings = settings
      this.selectedDeck = this.settings.selectedDeck as WordTypeDeck;
      shuffle(this.selectedDeck.cards);
      console.log(this.selectedDeck)
    })
  }

}
