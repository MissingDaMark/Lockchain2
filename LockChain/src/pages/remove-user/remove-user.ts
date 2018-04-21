import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Lock } from '../../models/lock';
import { Headers, RequestOptions, Http } from '@angular/http';
import { UserService } from '../../services/user';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-remove-user',
  templateUrl: 'remove-user.html',
})
export class RemoveUserPage implements OnInit{
  lock: Lock;
  url: string = 'https://pacific-lowlands-92963.herokuapp.com';
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public userService: UserService,
              private loadingCtrl: LoadingController, 
              public alertCtrl: AlertController,) {
  }
  
  ngOnInit(){
    this.lock = this.navParams.get('lock');
  }

  onRemoveUserSubmit(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Adding user to your lock...'
    });
    loading.present();
    if(this.userService.uIds.some(uIds => uIds['username'] === form.value.username)){
      const userObj = this.userService.uIds.find(uIds => uIds['username'] === form.value.username)
      this.http.post(this.url + '/updateUser', 
        {
          "lock_public_hash": this.lock.public_hash,
          "lock_private_hash": this.lock.private_hash,
          "client_public_hash": userObj.publich_hash, 
          "remove": true  
        },
        this.options)
          .map((data: any) => {
        });
        loading.dismiss();
      } else{
        loading.dismiss();
        this.handleError('The user you are trying to remove does not exist please add an existing user!')
      }
      this.navCtrl.popToRoot();
    }

    private handleError(errorMessage: string){
      const alert = this.alertCtrl.create({
        title: 'Could not remove user!',
        message: errorMessage,
        buttons: ['Ok']
      });
      alert.present();
    }
}
