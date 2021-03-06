import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';
import firebase from 'firebase';
import { AuthService } from '../services/auth';
import { UserService } from '../services/user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  welcomePage = WelcomePage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl: MenuController, private authService: AuthService, private usersService: UserService, private alertCtrl: AlertController) {

    firebase.initializeApp({
      apiKey: "AIzaSyCrMN5AAX4wZRDVhxDz6L-Xq_RyCfExQIU",
      authDomain: "lockchain-94649.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.isAuthenticated = true;
        this.authService.getActiveUser().getToken()
        .then(
          (token: string) => {
            this.usersService.getReturingUser(token)
            .subscribe( 
              () => {},
              error => {
                this.handleError(error.message);
              }
            );  
            console.log(this.usersService.uId);
            this.usersService.getUsers()
              .subscribe(
                () => 
                console.log(this.usersService.uIds)
              );
          }
      )
        this.rootPage = HomePage;
      }else{
        this.isAuthenticated = false;
        this.rootPage = WelcomePage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(){
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
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

