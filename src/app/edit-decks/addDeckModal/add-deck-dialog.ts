import { CommonModule } from "@angular/common";
import { Component, OnInit, Inject, NgModule } from "@angular/core";
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";




@Component({
  templateUrl: "add-deck-dialog.html",
})
export class AddDeckDialogComponent implements OnInit {

  form: FormGroup;
  isNew: boolean;

  constructor(
    protected formBuilder: FormBuilder,
    protected dialogRef: MatDialogRef<AddDeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.data.name ? this.data.name : ''
    })
    this.isNew = this.data.isNew
  }

  submit(form) {
    this.dialogRef.close(`${form.value.name}`);
  }
}

@NgModule({
  declarations: [AddDeckDialogComponent],
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
    ReactiveFormsModule
  ],
  exports: [AddDeckDialogComponent]
})
export class AddDeckDialogModule { }


