import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { RestService } from 'src/app/servicios/rest.service';
import { getNotify, Notify } from "../../interface/Notify";

const REQUEST_ADDRESS = 'login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  async onLoginFacebook() {
    try {
      const { user } = await this.auth.authWithFacebook();
      this.usuario.email = user.email;
      this.usuario.provider = 'facebook';
      this.login();
    } catch (error) {
      console.log(error);
      this.notify = getNotify(true, 'error', '', error.message);
    }
  }

  async onLoginGoogle() {
    try {
      const { user } = await this.auth.authWithGoogle();
      this.usuario.email = user.email;
      this.usuario.provider = 'facebook';
      this.login();
    } catch (error) {
      console.log(error);
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

  onLoginEmail() {
    if (!this.checkFields()) return;
    this.usuario.provider = 'email';
    this.login();
  }

  async login() {
    try {
      let usr = await this.rest.PostRequest(REQUEST_ADDRESS, this.usuario).toPromise();
      sessionStorage.setItem('user', JSON.stringify(usr));
      sessionStorage.setItem('navegacion', 'login');
      
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
      console.log(error);
      this.notify = getNotify(true, 'error', '',  (error.error)? error.error: error.message);
    }
  }
}
