import { CommonModule } from "@angular/common";
import { Component, OnInit, Inject, NgModule } from "@angular/core";
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";




@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <h1 mat-dialog-title *ngIf="isNew">Add deck</h1>
      <h1 mat-dialog-title *ngIf="!isNew">Edit deck</h1>
      <mat-dialog-content>
        <mat-form-field>
          <input matInput formControlName="name" placeholder="Enter deck name">
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button type="submit">Save</button>
        <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      </mat-dialog-actions>
    </form>
  `,
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


