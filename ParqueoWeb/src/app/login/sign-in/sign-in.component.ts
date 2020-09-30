import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { RestService } from 'src/app/servicios/rest.service';
import { getNotify, Notify } from "../../interface/Notify";

const REQUEST_ADDRESS = 'sign-in';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public notify: Notify = {};
  public usuario = {
    email: "",
    password: "",
    provider: ""
  };

  constructor(public auth: AuthService,
              public router: Router,
              public rest: RestService)
  { }

  ngOnInit(): void {
  }

  async onSignInFacebook() {
    try {
      const { user } = await this.auth.authWithFacebook();
      this.usuario.email = user.email;
      this.usuario.provider = 'facebook';
      this.signIn();
    } catch (error) {
      this.notify = getNotify(true, 'error', '', error.message);
    }
  }

  async onSignInGoogle() {
    try {
      const { user } = await this.auth.authWithGoogle();
      this.usuario.email = user.email;
      this.usuario.provider = 'facebook';
      this.signIn();
    } catch (error) {
      this.notify = getNotify(true, 'error', '', error.message);
    }
  }

  checkFields(): boolean {
    const { email, password } = this.usuario;

    if(email === '') {
      this.notify = getNotify(true, 'error', '', 'Email required');
      return false;
    }
    if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
      this.notify = getNotify(true, 'error', '', 'The email address is badly formatted');
      return false;
    }
    if(password === '') {
      this.notify = getNotify(true, 'error', '', 'Password required');
      return false;
    }
    return true;
  }

  onSignInEmail() {
    if (!this.checkFields()) return;
    this.usuario.provider = 'email';
    this.signIn();
  }

  async signIn() {
    try {
      let usr = await this.rest.PostRequest(REQUEST_ADDRESS, this.usuario).toPromise();
      sessionStorage.setItem('user', JSON.stringify(usr));
      sessionStorage.setItem('navegacion', 'signin');
      
      if(usr.rol === '') {
        this.router.navigate(['/chooserol']);
      } else if (usr.rol === 'admin'){
        this.router.navigate(['/admin']);
      } else if (usr.rol === 'owner') {
        //this.router.navigate(['/dashboard']);
        console.log('dashboard owner');
      } else {
        //this.router.navigate(['/dashboard']);
        console.log('dashboard regular');
      }
    } catch (error) {
      this.notify = getNotify(true, 'error', '',  (error.error)? error.error: error.message);
    }
  }
}
