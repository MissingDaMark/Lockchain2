import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewLockPage } from './add-new-lock';

@NgModule({
  declarations: [
    AddNewLockPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewLockPage),
  ],
})
export class AddNewLockPageModule {}
