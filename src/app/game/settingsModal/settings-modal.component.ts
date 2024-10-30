import { CommonModule } from "@angular/common";
import { Component, OnInit, Inject, NgModule } from "@angular/core";
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatchPairsDeck, GameSettings, GameType, WordTypeDeck } from "../../common/entities";
import { MatSelectModule } from "@angular/material/select";
import { StoreService } from "../../common/store.service";



//TODO template, make it work for the 3 different games
@Component({
  templateUrl: "./settings-modal.component.html"
})
export class SettingsDialogComponent implements OnInit {

  form: FormGroup;
  settings: GameSettings;
  matchPairsDecks: MatchPairsDeck[] = []
  wordTypeDecks: WordTypeDeck[] = []

  constructor(
    protected formBuilder: FormBuilder,
    protected dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data,
    protected storeService: StoreService
  ) { }

  ngOnInit() {
    if (this.settings.selectedGame == GameType.MATCH_PAIRS) this.storeService.getMatchPairsDecks().then(decks => {
      this.matchPairsDecks = decks
    })
    else if (this.settings.selectedGame == GameType.WORD_TYPE) this.storeService.getWordTypeDecks().then(decks => {
      this.wordTypeDecks = decks
    })

    this.settings = this.data.settings;
    this.form = this.formBuilder.group({
      gameType: this.settings.selectedGame ?? GameType.MATCH_PAIRS,
      selectedDeck: this.settings.selectedDeck
    })
  }

  submit(form) {
    this.settings.selectedGame = form.value.gameType
    this.settings.selectedDeck = form.value.selectedDeck
    this.dialogRef.close(this.settings);
  }

  get GameType(): typeof GameType {
    return GameType
  }
}

@NgModule({
  declarations: [SettingsDialogComponent],
  imports: [
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
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [SettingsDialogComponent]
})
export class SettingsDialogModule { }
