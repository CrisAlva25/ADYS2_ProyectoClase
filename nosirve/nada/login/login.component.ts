import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { Notify } from '../../interface/Notify';
import { RestService } from 'src/app/servicios/rest.service';

const REQUEST_GET = 'get-user-email';
const REQUEST_DELETE = 'delete-user-email';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public notify: Notify = {};
  public usuario = { email: "", password: "" };

  constructor(public auth: AuthService,
              public router: Router,
              public rest: RestService)
  { }

  ngOnInit(): void {
  }

  async onSignInFacebook() {
    try {
      const { user } = await this.auth.authWithFacebook();
      this.checkUser(user);
    } catch (error) {
      this.notify = { active: true, type: 'error', message: error.message };
    }
  }

  async onSignInGoogle() {
    try {
      const { user } = await this.auth.authWithGoogle();
      this.checkUser(user);
    } catch (error) {
      this.notify = { active: true, type: 'error', message: error.message };
    }
  }

  checkFields(): boolean {
    if(this.usuario.email === '') {
      this.notify = { active: true, type: 'error', message: 'Email required' };
      return false;
    }
    const { email } = this.usuario;
    let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    ///^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    ///^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
    if(!regex.test(email)) {
      this.notify = { active: true, type: 'error', message: 'The email address is badly formatted' };
      return false;
    }
    if(this.usuario.password === '') {
      this.notify = { active: true, type: 'error', message: 'Password required' };
      return false;
    }
    if(this.usuario.password.length < 6) {
      this.notify = { active: true, type: 'error', message: 'Characters must be greater than or equal to 6' };
      return false;
    }
    return true;
  }

  async onSignIn() {
    if(!this.checkFields())
      return;
    const { email, password } = this.usuario;
    try {
      const { user } = await this.auth.signInWithEmail(email, password);
      this.checkUser(user);
    } catch (error) {
      this.notify = { active: true, type: 'error', message: error.message };
    }
  }

  async checkUser(user: any) {
    if(!user) {
      this.notify = { active: true, type: 'error',  message: "The user doesn't exist" };
      await this.destroy();
      return;
    }
    this.usuario.email = user.email;
    if (!user.emailVerified) {
      this.notify = { active: true, type: 'error',  message: "Your account has not been verified. Re-register your account." };
      await this.destroy();
      return;
    }
    const usr = await this.getUser();
    if (usr == null) return;
    
    // suponer lo siguiente
    // user = { rol, aceptado }
    // si no hay rol direccionar a la pagina de eleccion de rol de usuario
    // si hay rol pero es de parqueo verificar si fue aceptado
    //  -> si no es aceptado direccionar a la paginaa de llenar los datos obligatorios
    // si todo esta correcto seguir con el dashboard

    this.router.navigate(['/admin']);
  }

  async getUser() {
    try {
      return await this.rest.PostRequest(REQUEST_GET, this.usuario).toPromise();
    } catch (error) {
      this.notify = { active: true, type: 'error',  message: (error.error)? error.error: error.message };
    }
    return null;
  }

  async destroy() {
    try {
      await this.auth.deleteUser();
      await this.rest.PostRequest(REQUEST_DELETE, this.usuario).toPromise();
    } catch (error) { }
  }
}
