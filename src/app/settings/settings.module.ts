import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    RouterModule
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }
