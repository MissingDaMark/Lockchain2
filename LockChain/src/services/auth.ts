import firebase from 'firebase';

export class AuthService{

    signup(username: string, email: string, password: string){
        return firebase.auth().createUserWithEmailAndPassword(email, password);   
    }

    signin(email: string, password: string){
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    
    logout(){
        return firebase.auth().signOut();
    }

    getActiveUser(){
        return firebase.auth().currentUser;
    }
}