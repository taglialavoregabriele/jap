import { StoreService } from './../common/store.service';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Card, Deck } from '../common/entities';
import { FormsModule } from '@angular/forms';

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
    CommonModule,
    FormsModule
  ]
})
export class EditDecksComponent {
  decks: Deck[] = [] //TODO deal with null

  selectedDeck: Deck = {
    _id: "-1",
    name: "",
    cards: []
  }

  newCard: Card = {
    _id: "-1",
    originalSentence: '',
    translation: ''
  }

  newDeck: Deck = {
    _id: "-1",
    name: "",
    cards: []
  }

  constructor(protected storeService: StoreService) {
  }

  ngOnInit(): void {
    this.storeService.getDecks().then(decks => {
      this.decks = decks
      this.selectedDeck = this.decks[0]
    })
  }

  //TODO add confirm window
  deleteCard(i: number) {
    this.selectedDeck!.cards.splice(i, 1)
  }

  addCard() {
    if (!this.selectedDeck) return
    this.newCard!._id = (Number(this.getLastDeckCardId(this.selectedDeck!)) + 1) + ''
    this.selectedDeck!.cards.push(this.newCard!)
    this.newCard = {
      _id: "0",
      originalSentence: '',
      translation: ''
    }
  }

  addDeck() {
    this.decks.push(this.newDeck)
  }

  deleteDeck() {
    console.log(this.selectedDeck)
  }

  saveChanges() {
    this.storeService.setDecks(this.decks)
  }

  private getLastDeckCardId(deck: Deck): string {
    return Math.max(...deck.cards.map(o => Number(o._id))) + ''
  }
}
