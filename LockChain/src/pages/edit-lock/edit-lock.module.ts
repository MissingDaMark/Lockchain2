import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditLockPage } from './edit-lock';

@NgModule({
  declarations: [
    EditLockPage,
  ],
  imports: [
    IonicPageModule.forChild(EditLockPage),
  ],
})
export class EditLockPageModule {}
