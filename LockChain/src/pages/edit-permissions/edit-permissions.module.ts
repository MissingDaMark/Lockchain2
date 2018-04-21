import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPermissionsPage } from './edit-permissions';

@NgModule({
  declarations: [
    EditPermissionsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPermissionsPage),
  ],
})
export class EditPermissionsPageModule {}
