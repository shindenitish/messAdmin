import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {

  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;

  constructor(private afAuth: AngularFireAuth) {
    
    this.authState = this.afAuth.authState;
    
    this.authState.subscribe(user => {
      if(user) {
        this.currentUser = user;
        console.log('Authprovider executed!', this.currentUser);
      } else {
        this.currentUser = null;
      }
    });
  }

  getAuthState() {
    return this.authState;
  }

  getUser(){
    return this.currentUser;
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  registerUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  sendVerfication(): Promise<void>{
    return this.currentUser.sendEmailVerification();
  }
}
