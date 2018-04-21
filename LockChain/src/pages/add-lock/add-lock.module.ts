import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLockPage } from './add-lock';

@NgModule({
  declarations: [
    AddLockPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLockPage),
  ],
})
export class AddLockPageModule {}
