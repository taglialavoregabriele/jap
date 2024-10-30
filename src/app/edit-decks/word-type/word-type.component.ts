import { Component, Inject, OnInit, Optional } from '@angular/core';
import { WordTypeDeck } from '../../common/entities';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AddDeckDialogComponent, AddDeckDialogModule } from '../addDeckModal/add-deck-dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../common/store.service';

@Component({
  selector: 'app-word-type',
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
  ],
  templateUrl: './word-type.component.html',
  styleUrl: './word-type.component.scss'
})
export class EditWordTypeDeckComponent implements OnInit {

  decks: WordTypeDeck[] = [] //TODO deal with null
  @Optional() @Inject(MAT_DIALOG_DATA) data: any = { name: "" }
  addDeckModalRef: MatDialogRef<AddDeckDialogComponent>;

  constructor(protected storeService: StoreService) { }

  ngOnInit(): void {
  }

}
