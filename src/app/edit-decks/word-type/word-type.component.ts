import { StoreService } from '../../common/store.service';
import { Component, Inject, inject, model, OnInit, Optional, TemplateRef, ViewRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { WordTypeCard, WordTypeDeck, WordTypeOption } from '../../common/entities';
import { FormsModule } from '@angular/forms';
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
import { AddDeckDialogComponent, AddDeckDialogModule } from '../addDeckModal/add-deck-dialog';
import { filter } from 'rxjs';
import { getLastId } from '../../common/utils';

@Component({
  templateUrl: './word-type.component.html',
  styleUrl: './word-type.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    AddDeckDialogModule
  ]
})
export class EditWordTypeDeckComponent implements OnInit {

  decks: WordTypeDeck[] = [] //TODO deal with null
  @Optional() @Inject(MAT_DIALOG_DATA) data: any = { name: "" }
  addDeckModalRef: MatDialogRef<AddDeckDialogComponent>;

  selectedDeck: WordTypeDeck = {
    _id: "-1",
    name: "",
    cards: []
  }

  newOption: WordTypeOption = {
    _id: '-1',
    name: '',
    correct: false,
  }

  newDeck: WordTypeDeck = {
    _id: "-1",
    name: "",
    cards: []
  }

  constructor(protected storeService: StoreService, protected dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.storeService.getWordTypeDecks().then(decks => {
      this.decks = decks
      this.selectedDeck = this.decks[0]
    })
  }

  deleteOption(card: WordTypeCard, id: string) {
    card.options.splice(card.options.findIndex(i => i._id == id), 1);
  }

  addOption(card: WordTypeCard) {
    card.options.push({
      _id: getLastId(card.options),
      name: '',
      correct: false,
    })
  }

  //TODO add confirm window
  deleteCard(i: number) {
    this.selectedDeck!.cards.splice(i, 1)
  }

  addCard() {
    if (!this.selectedDeck) return
    this.selectedDeck!.cards.push({
      _id: getLastId(this.selectedDeck!.cards),
      name: "",
      options: [{
        _id: "0",
        name: '',
        correct: true,
      },
      {
        _id: "1",
        name: '',
        correct: false,
      }]
    })
  }

  //TODO isNew? better way?
  addDeckOpenModal(isNew: boolean) {
    this.addDeckModalRef = this.dialog.open(AddDeckDialogComponent, {
      data: {
        name: !isNew ? this.selectedDeck.name : '',
        isNew
      }
    });

    this.addDeckModalRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(name => {
      if (!isNew) {
        const index = this.decks.findIndex(d => d._id == this.selectedDeck._id);
        if (index !== -1) {
          this.decks[index].name = name;
        }
      } else {
        let tmpDeck = {
          _id: getLastId(this.decks), name, cards: [
            {
              _id: "0",
              name: "",
              options: [{
                _id: "0",
                name: '',
                correct: true,
              },
              {
                _id: "1",
                name: '',
                correct: false,
              }]
            }
          ]
        }
        this.decks.push(tmpDeck);
        this.selectedDeck = tmpDeck
      }
    });
  }

  deleteDeck() {
    if (!window.confirm('Are sure you want to delete this item ?')) return
    this.decks.splice(this.decks.findIndex(d => d._id === this.selectedDeck._id), 1)
    this.selectedDeck = null;
  }

  saveChanges() {
    if (this.selectedDeck?.cards.length == 0) {
      window.alert("There are no cards, please add some!")
      return
    }
    if (this.selectedDeck?.cards.find(c => c.name == '' || c.options.length == 1 || c.options.find(opt => opt.name == ''))) {
      window.alert("There are some unfinished cards, please delete them or finish configuring them!")
      return
    }
    this.storeService.setWordTypeDeck(this.decks)
    window.alert("Changes saved!")
  }
}
