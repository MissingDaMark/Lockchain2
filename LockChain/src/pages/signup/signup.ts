import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user';
import { sha256, sha224 } from 'js-sha256';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthService, 
              private loadingCtrl: LoadingController, 
              public alertCtrl: AlertController,
              public userService: UserService) {
  }

  onSignupSubmit(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.userService.getUsers()
    .subscribe(
      () => console.log('works'),
      error => {
        this.handleError(error.message);
      }
    );
    if(this.userService.uIds.some(uIds => uIds['username'] === form.value.username)){
      loading.dismiss();
      this.handleError('The username you have choosen is already in use, please select another name!')
    }else{
      this.authService.signup(form.value.username, form.value.email, form.value.password)
      .then(data => {
        const public_hash = sha256(form.value.username);
        const private_hash = sha256(form.value.email);
        const token = this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.userService.addNewUser(token, form.value.username, public_hash)
                .subscribe(
                  () => console.log('hi'),
                  error => {
                    loading.dismiss();
                    this.handleError(error.message);
                  }
                );
              this.userService.storeUsers()
                .subscribe(
                  () => console.log('hi again'),
                  error => {
                    loading.dismiss();
                    this.handleError(error.message);
                  }
                );
            }
          );
        console.log(public_hash);
        console.log(this.userService.uIds);
        console.log(this.userService.uId);
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Failed to Sign You up!',
          message: 'The email you are attempting to register already exists. Please use a different email!',
          buttons: ['Ok']
        });
        alert.present();
      });
    }
  }

  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'An error occured signing you up!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
