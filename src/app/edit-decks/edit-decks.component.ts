import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Deck } from '../common/entities';


@Component({
  selector: 'app-edit-decks',
  templateUrl: './edit-decks.component.html',
  styleUrl: './edit-decks.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    CommonModule
  ]
})
export class EditDecksComponent {
  decks?: Deck[] //TODO get from json
  selectedDeck?: Deck

  constructor() {
    this.selectedDeck = { id: 1, name: "sdsad", cards: [{ id: 1, originalSentence: "asfsa", translation: "also" }, { id: 2, originalSentence: "asfsa", translation: "also" }] }
    this.decks = []
    this.decks.push(this.selectedDeck)
  }


}
