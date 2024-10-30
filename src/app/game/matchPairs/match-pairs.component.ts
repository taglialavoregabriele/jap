import { MatchPairsCard, GameType } from '../../common/entities';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../common/store.service';
import { MatchPairsDeck, GameSettings } from '../../common/entities';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsDialogComponent, SettingsDialogModule } from '../settingsModal/settings-modal.component';
import { CommonModule } from '@angular/common';
import { shuffle } from '../../common/utils';

@Component({
  selector: 'match-pairs',
  templateUrl: './match-pairs.component.html',
  styleUrl: './match-pairs.component.scss',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    SettingsDialogModule
  ]
})
export class MatchPairsGameComponent implements OnInit {
  settingsModalRef: MatDialogRef<SettingsDialogComponent>
  settings: GameSettings = { selectedGame: GameType.MATCH_PAIRS }

  selectedDeck: MatchPairsDeck
  clickedCard: MatchPairsCard;
  shuffledCards: MatchPairsCard[];

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
      this.selectedDeck = this.settings.selectedDeck as MatchPairsDeck;
      this.shuffledCards = this.shuffleDeck(this.selectedDeck.cards.slice());
    })
  }

  clickCard(card: MatchPairsCard, isOriginalSentence: boolean) {
    //TODO check conditions, bug if you click more than once on same button type
    if (!this.clickedCard || this.clickedCard.clickedOriginal && isOriginalSentence || this.clickedCard.clickedTranslation && !isOriginalSentence) {
      if (this.clickedCard) {
        this.clickedCard.clickedOriginal = false
        this.clickedCard.clickedTranslation = false
      }
      this.clickedCard = card;
      //TODO make less accroccato
      this.clickedCard.clickedOriginal = isOriginalSentence
      this.clickedCard.clickedTranslation = !this.clickedCard.clickedOriginal
    } else {
      if (this.clickedCard._id == card._id) {
        this.clickedCard.guessed = true;
        this.clickedCard.clickedOriginal = false
        this.clickedCard.clickedTranslation = false
        this.clickedCard = null
      } else {
        //TODO animation for wrong choice
        //lives system?
      }
    }
  }

  shuffleDeck(cards: MatchPairsCard[]): MatchPairsCard[] {
    return shuffle(cards);
  }

  get GameType(): typeof GameType {
    return GameType
  }
}
