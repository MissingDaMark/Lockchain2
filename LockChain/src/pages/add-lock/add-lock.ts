import { Component, OnInit, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController, Form, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Lock } from '../../models/lock';
import { AuthService } from '../../services/auth';
import { LocksService } from '../../services/locks';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../../services/user';


@IonicPage()
@Component({
  selector: 'page-add-lock',
  templateUrl: 'add-lock.html',
})
export class AddLockPage implements OnInit{
  lockForm: FormGroup;
  lock: Lock;
  url: string  = 'http://192.168.1.24:5000';
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  options: RequestOptions = new RequestOptions({ headers: this.headers });
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public actionSheetCtrl: ActionSheetController, 
              public alertCtrl: AlertController, 
              public toastCtrl: ToastController,
              public authService: AuthService,
              public locksService: LocksService,
              public loadingCtrl: LoadingController,
              public http: Http,
              public userService: UserService) {
  }

  ngOnInit(){
    this.initializeForm();
  }

  onSubmit(){
    const value = this.lockForm.value;
    this.locksService.addLock(value.lock_name, value.public_hash, value.private_hash);
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.http.post(this.url + '/updateLock', 
          {
            "lock_public_hash": value.public_hash,
            "lock_private_hash": value.private_hash,
            "remove": false  
          } ,
          this.options)
            .subscribe((data: any) => {
              console.log(data);
          });
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
      this.lockForm.reset();
      this.navCtrl.popToRoot();
  }

  private initializeForm(){
    let lock_name = '';
    let public_hash = '';
    let private_hash = '';

    this.lockForm = new FormGroup({
      'lock_name' : new FormControl(lock_name, Validators.required),
      'public_hash': new FormControl(public_hash, Validators.required),
      'private_hash': new FormControl(private_hash, Validators.required)
    });
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
