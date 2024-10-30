import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GameSettings, GameType, WordTypeCard, WordTypeDeck, WordTypeOption } from '../../common/entities';
import { SettingsDialogComponent, SettingsDialogModule } from '../settingsModal/settings-modal.component';
import { StoreService } from '../../common/store.service';
import { shuffle } from '../../common/utils';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    SettingsDialogModule,
    MatChipsModule
  ],
  templateUrl: './word-type.component.html',
  styleUrl: './word-type.component.scss'
})
export class WordTypeGameComponent implements OnInit {
  selectedDeck: WordTypeDeck
  shuffledCards: WordTypeCard[]
  settingsModalRef: MatDialogRef<SettingsDialogComponent>
  settings: GameSettings = { selectedGame: GameType.WORD_TYPE }
  gameEnded: boolean

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
      this.shuffledCards = shuffle(this.selectedDeck.cards.slice());
    })
  }

  shuffledOptions(card: WordTypeCard): WordTypeOption[] {
    return shuffle(card.options.slice())
  }

  clickOption(correct: boolean) {
    if (correct) {
      this.shuffledCards.splice(0, 1)
      this.gameEnded = this.shuffledCards.length == 0
      //TODO right animation
    } else {
      //TODO wrong animation
    }
  }
}
