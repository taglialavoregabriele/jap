import { Card, GameType } from './../common/entities';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../common/store.service';
import { Deck, GameSettings } from '../common/entities';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsDialogComponent, SettingsDialogModule } from './settingsModal/settings-modal.component';
import { CommonModule } from '@angular/common';
import { shuffle } from '../common/utils';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    SettingsDialogModule
  ]
})
export class GameComponent implements OnInit {
  decks: Deck[]
  selectedDeck: Deck
  settings: GameSettings = { selectedGame: GameType.MATCH_PAIRS }
  settingsModalRef: MatDialogRef<SettingsDialogComponent>
  clickedCard: Card;

  constructor(protected storeService: StoreService, protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.storeService.getDecks().then(decks => {
      this.decks = decks
      //TODO get from settings
      this.selectedDeck = decks[0]
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

  clickCard(card: Card) {
    if (!this.clickedCard) this.clickedCard = card;
  }

  shuffleDeck(cards: Card[]) {
    return shuffle(cards);
  }

  get GameType(): typeof GameType {
    return GameType
  }
}
