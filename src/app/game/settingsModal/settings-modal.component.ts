import { CommonModule } from "@angular/common";
import { Component, OnInit, Inject, NgModule } from "@angular/core";
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";



//TODO template
@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <h1 mat-dialog-title>Add file</h1>
      <mat-dialog-content>
        <mat-form-field>
          <input matInput formControlName="settings" placeholder="Enter settings">
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button type="submit">Save</button>
        <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      </mat-dialog-actions>
    </form>
  `,
})
export class SettingsDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    protected dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      settings: this.data.settings ? this.data.settings : ''
    })
  }

  submit(form) {
    this.dialogRef.close(`${form.value.settings}`);
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
    ReactiveFormsModule
  ],
  exports: [SettingsDialogComponent]
})
export class SettingsDialogModule { }


