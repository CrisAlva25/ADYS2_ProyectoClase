import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { RestService } from 'src/app/servicios/rest.service';
import { getNotify, Notify } from "../../interface/Notify";

const REQUEST_LOGIN = 'login';
const REQUEST_PARK = 'get-parking';

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

  getUsuario(email, password, provider) {
    return {
      email: email,
      password: password,
      provider: provider
    };
  }

  async onLoginFacebook() {
    try {
      const { password } = this.usuario;
      const { user } = await this.auth.authWithFacebook();
      this.usuario = this.getUsuario(user.email, password, 'facebook');
      this.login();
    } catch (error) {
      console.log(error);
      this.notify = getNotify(true, 'error', '', error.message);
    }
  }

  async onLoginGoogle() {
    try {
      const { password } = this.usuario;
      const { user } = await this.auth.authWithGoogle();
      this.usuario = this.getUsuario(user.email, password, 'google');
      this.login();
    } catch (error) {
      console.log(error);
      this.notify = getNotify(true, 'error', '', error.message);
    }
  }

  checkFields(): boolean {
    if(!this.checkEmail) {
      return false;
    }
    if(!this.checkEmailFormato()) {
      return false;
    }
    if(!this.checkPassword()) {
      return false;
    }
    return true;
  }

  checkEmail() {
    const { email } = this.usuario;
    if(email === '') {
      this.notify = getNotify(true, 'error', '', 'Correo requerido');
      return false;
    }
    return true;
  }

  checkEmailFormato() {
    const { email } = this.usuario;
    if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
      this.notify = getNotify(true, 'error', '', 'Formato incorrecto en su direccion de correo electronico');
      return false;
    }
    return true;
  }

  checkPassword() {
    const { password } = this.usuario;
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
      let usr = await this.rest.PostRequest(REQUEST_LOGIN, this.usuario).toPromise();
      sessionStorage.setItem('user', JSON.stringify(usr));
      sessionStorage.setItem('navegacion', 'login');
      
      if(usr.rol === null) {
        this.router.navigate(['/chooserol']);

      } else if (usr.rol === 'admin'){
        this.router.navigate(['/admin']);

      } else if (usr.rol === 'owner') {
        let park = await this.rest.PostRequest(REQUEST_PARK, usr).toPromise();
        if(park.authorized) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/followup']);
        }
        
      } else {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.log(error);
      this.notify = getNotify(true, 'error', '',  (error.error)? error.error: error.message);
    }
  }
}
