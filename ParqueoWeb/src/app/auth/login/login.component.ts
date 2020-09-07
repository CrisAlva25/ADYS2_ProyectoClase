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

  constructor(public auth: AuthService,
    public router: Router)
  { }

  ngOnInit(): void {
    localStorage.clear();
  }

  async onSignInFacebook() {
    try {
      const user = await this.auth.loginFacebook();

      if(user) {
        this.checkSignIn(user);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  async onSignInGoogle() {
    try {
      const user = await this.auth.loginGoogle();

      if(user) {
        this.checkSignIn(user);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  async onSignIn() {
    const { email, password } = this.usuario;

    try {
      const user = await this.auth.login(email, password);
      
      if(user) {
        this.checkSignIn(user);
      }

    } catch (error) {
      console.log("login");
      console.log(error);
    }
  }

  checkSignIn(user: any) {
    console.log(user);

    if (user && user.emailVerified) {
      this.router.navigate(['/admin']);
    } else if (user) {
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/signup']);
    }
  }
}