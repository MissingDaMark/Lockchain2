import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService, 
    private loadingCtrl: LoadingController, 
    public alertCtrl: AlertController,
    public usersService: UserService) {
}

  onSignin(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        this.authService.getActiveUser().getToken()
        .then(
          (token: string) => {
            this.usersService.getReturingUser(token)
            .subscribe( 
              () => loading.dismiss(),
              error => {
                loading.dismiss();
                this.handleError(error.message);
              }
            );  
          }
      )
    }
  )
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin Failed!',
          message: 'The email/password you entered is invalid, please try again!',
          buttons: ['Ok']
        });
        alert.present();
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
