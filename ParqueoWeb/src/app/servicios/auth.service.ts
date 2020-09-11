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

    this.user$.subscribe(
      (fuser) => {
        if (fuser) {
          this.user = fuser;
          console.log(this.user);
          console.log("service")
        }
        else {
          this.user = null;
        }
      }
    );
  }

  /*getAuthenticated(): boolean {
    return this.user != null;
  }*/

  getCurrentUser() {
    //return this.user;
    return this.afAuth.currentUser;
  }

  async isVerify() {
    return (await this.afAuth.currentUser).emailVerified;
  }

  /*getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }*/

  /*async delete() {
    this.getCurrentUser().delete();
    
    await firebase.auth().currentUser.delete().then(function() {
      // User deleted. Redirect to login page...
    }).catch(function(error) {
      // An error happened.
    });

    this.user$.subscribe(
      (user) => {
        if (user) {
          user.delete();
        }
        else {
          this.user = null;
        }
      }
    );
  }*/

  async signUpWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }

  async signInWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
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

  /*updateProfile(name?,photo?):Promise<void> {
    return firebase.auth().currentUser.updateProfile({
      displayName: (name) ? name : firebase.auth().currentUser.displayName,
      photoURL: (photo) ? photo : firebase.auth().currentUser.photoURL,
    });
  }

  async loginGoogle() {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async loginFacebook() {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  login(email:string, password:string) {
    try {
      const user = this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    } catch (error) {
      //return error;
      console.log("service");
      console.log(error);
    }
  }

  async register(email:string, password:string) {
    try {
      const user = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log("service");
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }*/

  /*async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log("service");
      console.log(error);
    }
  }*/

  /*getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }*/
}
