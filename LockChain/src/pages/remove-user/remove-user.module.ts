import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RemoveUserPage } from './remove-user';

@NgModule({
  declarations: [
    RemoveUserPage,
  ],
  imports: [
    IonicPageModule.forChild(RemoveUserPage),
  ],
})
export class RemoveUserPageModule {}
