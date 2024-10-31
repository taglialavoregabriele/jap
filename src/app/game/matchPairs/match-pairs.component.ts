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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'match-pairs',
  templateUrl: './match-pairs.component.html',
  styleUrl: './match-pairs.component.scss',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MatchPairsGameComponent implements OnInit {
  decks: MatchPairsDeck[];
  selectedDeck: MatchPairsDeck;
  clickedCard: MatchPairsCard;
  shuffledCards: MatchPairsCard[];
  gameWon: boolean;

  form: FormGroup;

  constructor(protected storeService: StoreService, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.storeService.getMatchPairsDecks().then(decks => {
      this.decks = decks
    })

    this.form = this.formBuilder.group({
      selectedDeck: this.selectedDeck
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
    this.gameWon = this.selectedDeck!.cards.findIndex(c => !c.guessed) == -1
    console.log(this.gameWon)
  }

  submit(form) {
    this.selectedDeck = form.value.selectedDeck
    this.shuffledCards = this.shuffleDeck(this.selectedDeck.cards.slice());
  }

  resetGame() {
    this.selectedDeck = null;
    this.gameWon = false;
  }

  shuffleDeck(cards: MatchPairsCard[]): MatchPairsCard[] {
    return shuffle(cards);
  }

  get GameType(): typeof GameType {
    return GameType
  }
}
