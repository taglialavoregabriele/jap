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
import { MatCardModule } from '@angular/material/card';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

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
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './word-type.component.html',
  styleUrl: './word-type.component.scss',
  animations: [
    trigger('wrongChoice', [
      transition('normal => wrong', [
        animate('0.5s', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-5px)', offset: 0.1 }),
          style({ transform: 'translateX(5px)', offset: 0.2 }),
          style({ transform: 'translateX(-5px)', offset: 0.3 }),
          style({ transform: 'translateX(5px)', offset: 0.4 }),
          style({ transform: 'translateX(0)', offset: 0.5 })
        ]))
      ])
    ])
  ]
})
export class WordTypeGameComponent implements OnInit {
  form: FormGroup;
  decks: WordTypeDeck[]
  selectedDeck: WordTypeDeck
  shuffledCards: WordTypeCard[]
  settingsModalRef: MatDialogRef<SettingsDialogComponent>
  settings: GameSettings = { selectedGame: GameType.WORD_TYPE }
  gameEnded: boolean
  isWrongOption: boolean

  constructor(protected storeService: StoreService, protected formBuilder: FormBuilder) { }

  //TODO check if game is over
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
        this.selectedDeck = null
      }
    } else {
      this.isWrongOption = true;

      setTimeout(() => {
        this.isWrongOption = false
      }, 500);
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
