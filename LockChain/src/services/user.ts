import { Http, Response } from '@angular/http';
import { AuthService } from './auth';
import { Injectable } from '@angular/core';
import { UserId } from '../models/uid';


@Injectable()
export class UserService{
    public uId: UserId = new UserId('', '', '');
    public uIds: UserId[] = [];
    constructor(private http: Http, private authService: AuthService){
    }
    
    storeUsers(){
        return this.http.put('https://lockchain-94649.firebaseio.com/users.json', this.uIds)
        .map((res: Response) => {
            return res.json();
        })
    }
    
    getUsers(){
        return this.http.get('https://lockchain-94649.firebaseio.com/users.json')
        .map((res: Response) => {
            const users: UserId[] = res.json() ? res.json() : [];
            return res.json();
        })
        .do(
            (users: UserId[]) => {
                if(users){
                    this.uIds = users;
                }
                else{
                    this.uIds = [];
                }
            }
        )
    }
    addNewUser(token: string, username: string, public_hash: string, cardId: string){
        this.uId.publich_hash = public_hash;
        this.uId.username = username;
        this.uId.cardId = cardId;
        this.uIds.push(this.uId);
        const userID = this.authService.getActiveUser().uid;
        return this.http.put('https://lockchain-94649.firebaseio.com/' + userID + '/user.json?auth='+token, this.uId)
        .map((res: Response) => {
            return res.json();
        })
    }

    getReturingUser(token: string){
        const userID = this.authService.getActiveUser().uid;
        return this.http.get('https://lockchain-94649.firebaseio.com/' + userID + '/user.json?auth='+token)
            .map((res: Response) => {
                const user: UserId = res.json() ? res.json(): null;
                return res.json();
            })
            .do(
                (user: UserId) => {
                    console.log(user);
                    if(user){
                        this.uId = user;
                        console.log(this.uId);
                    }
                }
            )
    }
}