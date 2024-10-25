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
  decks: Deck[] = [] //TODO get from json
  selectedDeck?: Deck //TODO make selected by default
  newCard: Card = {
    id: 0,
    originalSentence: '',
    translation: ''
  }

  constructor(protected storeService: StoreService) {
  }

  ngOnInit(): void {
    //TODO deal with selectedDeck
    this.selectedDeck = { id: 1, name: "sdsad", cards: [{ id: 1, originalSentence: "asfsa", translation: "also" }, { id: 2, originalSentence: "asfsa", translation: "also" }] }
    this.decks.push(this.selectedDeck)
    this.storeService.setDecks(this.decks)
  }

  //TODO add confirm window
  deleteCard(i: number) {
    this.selectedDeck!.cards.splice(i, 1)
  }

  addCard() {
    if (!this.selectedDeck) return
    this.newCard!.id = this.getLastDeckId(this.selectedDeck!) + 1
    this.selectedDeck!.cards.push(this.newCard!)
    this.newCard = {
      id: 0,
      originalSentence: '',
      translation: ''
    }
  }

  deleteDeck() {
    console.log(this.selectedDeck)
  }

  saveChanges() {
    console.log(this.storeService.getDecks())
  }

  private getLastDeckId(deck: Deck): number {
    return Math.max(...deck.cards.map(o => o.id))
  }
}
