import { CommonModule } from "@angular/common";
import { Component, OnInit, Inject, NgModule } from "@angular/core";
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatchPairsDeck, GameSettings, GameType } from "../../../common/entities";
import { MatSelectModule } from "@angular/material/select";
import { StoreService } from "../../../common/store.service";



//TODO template
@Component({
  templateUrl: "./settings-modal.component.html"
})
export class SettingsDialogComponent implements OnInit {

  form: FormGroup;
  settings: GameSettings;
  decks: MatchPairsDeck[] = []

  constructor(
    protected formBuilder: FormBuilder,
    protected dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data,
    protected storeService: StoreService
  ) { }

  ngOnInit() {
    this.storeService.getDecks().then(decks => {
      this.decks = decks
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
