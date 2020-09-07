import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { auth } from "firebase/app";
import { User } from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public user :User;

  constructor(public afAuth: AngularFireAuth) { }

  async loginGoogle() {
    try {
      const { user } = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async loginFacebook() {
    try {
      const { user } = await this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
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
      console.log("service");
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log("service");
      console.log(error);
    }
  }
}
