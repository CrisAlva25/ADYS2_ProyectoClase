import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public usuario = {
    email: "",
    password: ""
  };

  public error = null;

  constructor(public auth: AuthService,
    public router: Router)
  { }

  ngOnInit(): void {
  }

  async onSignInFacebook() {
    try {
      const { user } = await this.auth.authWithFacebook();
      if(user) {
        this.checkUser(user);
      }
    } catch (error) {
      this.error = error;
    }
  }

  async onSignInGoogle() {
    try {
      const { user } = await this.auth.authWithGoogle();
      if(user) {
        this.checkUser(user);
      }
    } catch (error) {
      this.error = error;
    }
  }

  async onSignIn() {
    const { email, password } = this.usuario;
    try {
      const { user } = await this.auth.signInWithEmail(email, password);
      if(user) {
        this.checkUser(user);
      }
    } catch (error) {
      this.error = error;
    }
  }

  checkUser(user: any) {
    console.log(user);
    if (user) {
      if (user.emailVerified) {
        // realizar peticion de recuperacion de usuario para verificar si existe
      
        // suponer lo siguiente
        // user = { rol, aceptado }
        // si no hay rol direccionar a la pagina de eleccion de rol de usuario
        // si hay rol pero es de parqueo verificar si fue aceptado
        //  -> si no es aceptado direccionar a la paginaa de llenar los datos obligatorios
        // si todo esta correcto seguir con el dashboard

        this.router.navigate(['/admin']);
      }
      else {
        this.router.navigate(['/verify-email']);
      }
    } else {
      this.router.navigate(['/signup']);
    }
  }
}
