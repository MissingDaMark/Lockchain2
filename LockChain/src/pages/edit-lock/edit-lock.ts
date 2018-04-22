import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, PopoverController } from 'ionic-angular';
import { Lock } from '../../models/lock';
import { AddUserPage } from '../add-user/add-user';
import { RemoveUserPage } from '../remove-user/remove-user';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { LocksService } from '../../services/locks';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-edit-lock',
  templateUrl: 'edit-lock.html',
})
export class EditLockPage implements OnInit {
  lock: Lock;
  url: string  = 'http://192.168.1.11:5000';
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: Http, 
              public locksService: LocksService,
              public authService: AuthService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  ngOnInit(){
    this.lock = this.navParams.get('lock');
  }

  onAddUser(){
    this.navCtrl.push(AddUserPage, {lock: this.lock});
  }

  onRemoveUser(){
    this.navCtrl.push(RemoveUserPage, {lock: this.lock});
  }

  onRemoveLock(){
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.http.post(this.url + '/updateLock', 
          {
            "lock_public_haxsh": this.lock.public_hash,
            "lock_private_hash": this.lock.private_hash,
            "remove": true  
          },  
          this.options)
            .subscribe((res: Response) => {
              console.log(res.json());
          });
          this.locksService.removeLock(this.lock.lock_name);
          this.locksService.storeLocks(token)
          .subscribe( 
              () => loading.dismiss(),
              error => {
                loading.dismiss();
                this.handleError(error.message);
          }
        );
        }
      )
      .catch();
      this.navCtrl.popToRoot();
  }


  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
