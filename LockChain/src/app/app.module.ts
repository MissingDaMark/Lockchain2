import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AddNewLockPage } from '../pages/add-new-lock/add-new-lock';
import { Http, HttpModule } from '@angular/http'; 
import { AuthService } from '../services/auth';
import { WelcomePage } from '../pages/welcome/welcome';
import { AddLockPage } from '../pages/add-lock/add-lock';
import { LocksService } from '../services/locks';
import { EditLockPage } from '../pages/edit-lock/edit-lock';
import { EditPermissionsPage } from '../pages/edit-permissions/edit-permissions';
import { UserService } from '../services/user';
import { NFC, Ndef } from '@ionic-native/nfc';
import { AddUserPage } from '../pages/add-user/add-user';
import { RemoveUserPage } from '../pages/remove-user/remove-user';
import { HTTP } from '@ionic-native/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    AddNewLockPage,
    WelcomePage, 
    AddLockPage,
    EditLockPage,
    EditPermissionsPage,
    AddUserPage,
    RemoveUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    AddNewLockPage,
    WelcomePage,
    AddLockPage,
    EditLockPage,
    EditPermissionsPage,
    AddUserPage,
    RemoveUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    LocksService, 
    UserService,
    NFC, 
    Ndef
  ]
})
export class AppModule {}
