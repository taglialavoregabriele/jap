import { StoreService } from './../common/store.service';
import { Component, Inject, inject, model, OnInit, Optional, TemplateRef, ViewRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Card, Deck } from '../common/entities';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddDeckDialogComponent, AddDeckDialogModule } from './add-decks-dialog';
import { filter } from 'rxjs';

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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    AddDeckDialogModule
  ]
})
export class EditDecksComponent implements OnInit {
  decks: Deck[] = [] //TODO deal with null
  @Optional() @Inject(MAT_DIALOG_DATA) data: any = { name: "" }
  addDeckModalRef: MatDialogRef<AddDeckDialogComponent>;

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

  constructor(protected storeService: StoreService, protected dialog: MatDialog) {
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
    this.newCard!._id = this.getLastDeckCardId(this.selectedDeck!)
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

  //TODO isNew? better way?
  addDeckOpenModal(isNew: boolean) {
    this.addDeckModalRef = this.dialog.open(AddDeckDialogComponent, {
      data: {
        name: !isNew ? this.selectedDeck.name : ''
      }
    });

    this.addDeckModalRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(name => {
      if (!isNew) {
        const index = this.decks.findIndex(d => d._id == this.selectedDeck._id);
        console.log(index)
        if (index !== -1) {
          this.decks[index].name = name;
        }
      } else {
        this.decks.push({ _id: this.getLastDeckId(), name, cards: [] });
      }
    });
  }

  deleteDeck() {
    this.decks.splice(this.decks.findIndex(d => d._id === this.selectedDeck._id), 1)
  }

  saveChanges() {
    console.log(this.decks)
    this.storeService.setDecks(this.decks)
  }

  private getLastDeckCardId(deck: Deck): string {
    return Math.max(...deck.cards.map(o => Number(o._id))) + 1 + ''
  }

  private getLastDeckId(): string {
    return Math.max(...this.decks.map(o => Number(o._id))) + 1 + ''
  }
}
