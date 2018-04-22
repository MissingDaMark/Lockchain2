import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Subscription } from 'rxjs/Subscription';
import { AddLockPage } from '../add-lock/add-lock';
import { LocksService } from '../../services/locks';
import { AuthService } from '../../services/auth';
import { Lock } from '../../models/lock';
import { EditLockPage } from '../edit-lock/edit-lock';
import { UserService } from '../../services/user';
import { UserId } from '../../models/uid';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  locks: Lock[] = [];
  uid: UserId;
  constructor(public navCtrl: NavController, public navParams: NavParams, public locksService: LocksService, private popoverCtrl: PopoverController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private authService: AuthService, private viewCtrl: ViewController, private nfc: NFC, private ndef: Ndef, private userService: UserService) {
      
  }

  onLoadLocks(){
    const loading = this.loadingCtrl.create({
      content: 'Getting locks please wait...'
    });
    loading.present();
    const token = this.authService.getActiveUser().getIdToken()
    .then(
      (token:string) => {
        this.locksService.fetchLocks(token)
          .subscribe(
            (list: Lock[]) => {
              loading.dismiss();
              if(list){
                this.locks = list;
              }else{
                this.locks = [];
              }
            },
            error => {
              loading.dismiss();
              this.handleError(error.json().error); 
            }
          );
        }
      ); 
    this.locks = this.locksService.getLocks();
  }

  onUnlock(){
    this.nfc.addNdefFormatableListener(() => {
      console.log('successfully attached ndef listener');
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    
      let message = this.ndef.textRecord(this.userService.uId.username, "English", "Text")
      this.nfc.write([message])
        .then()
        .catch();
    });
  }

  onAddNewLock(){
    this.navCtrl.push(AddLockPage);
    
  }

  onLoadLock(lock: Lock){
    this.navCtrl.push(EditLockPage, {lock: lock});
  }

  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'An error occured loading your locks!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
