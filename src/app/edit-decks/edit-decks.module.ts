import { NgModule } from '@angular/core';
import { EditDecksComponent } from './edit-decks.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EditDecksComponent],
  imports: [
    RouterModule
  ],
  exports: [EditDecksComponent]
})
export class EditDecksModule { }
