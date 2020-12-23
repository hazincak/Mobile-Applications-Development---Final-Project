import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    ReactiveFormsModule,
  ],
})
export class SettingsPageModule {}
