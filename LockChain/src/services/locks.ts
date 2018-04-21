import { Injectable } from '@angular/core';
import { AuthService } from './auth';
import { Lock } from '../models/lock';
import 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';


@Injectable()
export class LocksService{
    private locks: Lock[] = [];    
    constructor(private http: Http, private authService: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController){

    }
    
    addLock(lock_name: string, public_hash: string, private_hash: string){
        this.locks.push(new Lock(lock_name, public_hash, private_hash));
    }
    
    removeLock(lock_to_remove: string){
        for (var i = this.locks.length - 1; i >= 0; --i) {
            if (this.locks[i].lock_name == lock_to_remove) {
                this.locks.splice(i,1);
            }
        }  
    }

    removeLocks(){
        this.locks = [];
    }

    getLocks(){
        return this.locks.slice();
    }

    storeLocks(token: string){   
        const userID = this.authService.getActiveUser().uid;
        return this.http.put('https://lockchain-94649.firebaseio.com/' + userID + '/locks.json?auth='+token, this.locks)
            .map((res: Response) => {
                return res.json();
            })
    }

    fetchLocks(token: string){
        const userID = this.authService.getActiveUser().uid;
        return this.http.get('https://lockchain-94649.firebaseio.com/' + userID + '/locks.json?auth='+token)
            .map((res: Response) => {
                const locks: Lock[] = res.json() ? res.json() : [];
                return res.json();
            })
            .do(
                (locks: Lock[]) => {
                    if(locks){
                        this.locks = locks;
                    }
                    else{
                        this.locks = [];
                    }
                }
            )

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