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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    SettingsDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './word-type.component.html',
  styleUrl: './word-type.component.scss'
})
export class WordTypeGameComponent implements OnInit {
  form: FormGroup;
  decks: WordTypeDeck[]
  selectedDeck: WordTypeDeck
  shuffledCards: WordTypeCard[]
  settingsModalRef: MatDialogRef<SettingsDialogComponent>
  settings: GameSettings = { selectedGame: GameType.WORD_TYPE }
  gameEnded: boolean

  constructor(protected storeService: StoreService, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.storeService.getWordTypeDecks().then(decks => {
      this.decks = decks
    })

    this.form = this.formBuilder.group({
      selectedDeck: this.selectedDeck
    })
  }

  shuffledOptions(card: WordTypeCard): WordTypeOption[] {
    return shuffle(card.options.slice())
  }

  clickOption(correct: boolean) {
    if (correct) {
      this.shuffledCards.splice(0, 1)
      this.gameEnded = this.shuffledCards.length == 0
      if (this.gameEnded) {
        //TODO right animation
        this.selectedDeck = null
      }
    } else {
      //TODO wrong animation
    }
  }

  submit(form) {
    this.selectedDeck = form.value.selectedDeck
    this.shuffledCards = shuffle(this.selectedDeck.cards.slice());
    this.shuffledCards.forEach(c => c.options = shuffle(c.options))
  }

  resetGame() {
    this.selectedDeck = null
    this.gameEnded = false
  }
}
