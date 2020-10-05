import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { RestService } from 'src/app/servicios/rest.service';
import { Notify, getNotify } from "../../interface/Notify";

const REQUEST_ADDRESS = 'register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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

  async onRegisterFacebook() {
    try {
      const { user } = await this.auth.authWithFacebook();
      let usr = this.getUsuario(user.displayName, user.email, user.uid, user.phoneNumber, user.photoURL, 'facebook');
      this.register(usr);
    } catch (error) {
      this.notify = getNotify(true, 'error', '', error.message);
    }
  }

  async onRegisterGoogle() {
    try {
      const { user } = await this.auth.authWithGoogle();
      let usr = this.getUsuario(user.displayName, user.email, user.uid, user.phoneNumber, user.photoURL, 'google');
      this.register(usr);
    } catch (error) {
      this.notify = getNotify(true, 'error', '', error.message);
    }
  }
  
  checkFields(): boolean {
    const { email, password } = this.usuario;

    if(email === '') {
      this.notify = getNotify(true, 'error', '', 'Correo requerido');
      return false;
    }
    if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
      this.notify = getNotify(true, 'error', '', 'Formato incorrecto en su direccion de correo electronico');
      return false;
    }
    if(password === '') {
      this.notify = getNotify(true, 'error', '', 'Contraseña requerido');
      return false;
    }
    return true;
  }

  async onRegister() {
    if(!this.checkFields()) return;
    this.register(this.usuario);
  }

  async register(user) {
    try {
      let usr = await this.rest.PostRequest(REQUEST_ADDRESS, user).toPromise();
      sessionStorage.setItem('user', JSON.stringify(usr));
      sessionStorage.setItem('navegacion', 'register');
      
      this.router.navigate(['/chooserol']);
    } catch (error) {
      this.notify = getNotify(true, 'error', '', (error.error)? error.error: error.message);
    }
  }
}
