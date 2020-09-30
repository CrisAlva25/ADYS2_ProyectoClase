import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { RestService } from 'src/app/servicios/rest.service';
import { Notify, getNotify } from "../../interface/Notify";

const REQUEST_ADDRESS = 'sign-up';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public notify: Notify = {};
  public usuario =  {
    name: '',
    email: '',
    password: '',
    phone: '',
    photo: '',
    provider: ''
  };

  @ViewChild('infoClose', { static: false }) infoClose: ElementRef;

  constructor(public auth: AuthService,
              public router: Router,
              public rest: RestService)
  { }

  ngOnInit(): void {
  }

  getUsuario (name, email, password, phone, photo, provider) {
    return {
      name: name,
      email: email,
      password: password,
      phone: phone,
      photo: photo,
      provider: provider
    };
  }

  async onSignUpFacebook() {
    try {
      const { user } = await this.auth.authWithFacebook();
      let usr = this.getUsuario(user.displayName, user.email, user.uid, user.phoneNumber, user.photoURL, 'facebook');
      this.signUp(usr);
    } catch (error) {
      this.notify = getNotify(true, 'error', '', error.message);
    }
  }

  async onSigUpGoogle() {
    try {
      const { user } = await this.auth.authWithGoogle();
      let usr = this.getUsuario(user.displayName, user.email, user.uid, user.phoneNumber, user.photoURL, 'google');
      this.signUp(usr);
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

  async onSignUp() {
    if(!this.checkFields()) return;
    this.signUp(this.usuario);
  }

  async signUp(user) {
    try {
      let usr = await this.rest.PostRequest(REQUEST_ADDRESS, user).toPromise();
      sessionStorage.setItem('user', JSON.stringify(usr));
      sessionStorage.setItem('navegacion', 'signup');
      
      this.router.navigate(['/chooserol']);
    } catch (error) {
      this.notify = getNotify(true, 'error', '', (error.error)? error.error: error.message);
    }
  }
}
