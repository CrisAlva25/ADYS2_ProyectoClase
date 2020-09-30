import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
//import { first } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private user$: Observable<firebase.User>;
  private user: firebase.User = null;

  constructor(public afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
    this.user$.subscribe((usuario) => {
        if (usuario) {
          this.user = usuario;
        }
        else {
          this.user = null;
        }
      }
    );
  }

  async getCurrentUser() {
    return await this.afAuth.currentUser;
  }

  async isVerify() {
    return (await this.afAuth.currentUser).emailVerified;
  }

  async signUpWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
    //await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }

  async signInWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
    //await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    return this.afAuth.signInWithEmailAndPassword(email, pass);
  }

  authWithFacebook(): Promise<firebase.auth.UserCredential> {
    const provider: firebase.auth.FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  authWithGoogle(): Promise<firebase.auth.UserCredential> {
    const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  resetPassword(email): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  async verifyEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async ReauthenticateWithFacebook() {
    let token = await (await this.afAuth.currentUser).getIdToken();
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    return (await this.afAuth.currentUser).reauthenticateWithCredential(credential);
  }

  async ReauthenticateWithGoogle() {
    let token = await (await this.afAuth.currentUser).getIdToken();
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    return (await this.afAuth.currentUser).reauthenticateWithCredential(credential);
  }

  async ReauthenticateWithCredential(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return (await this.afAuth.currentUser).reauthenticateWithCredential(credential);
  }

  async deleteUser() {
    return (await this.afAuth.currentUser).delete();
  }
}
