import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  public usuario = {
    username: "",
    name: "",
    phone: "",
    email: "",
    password: ""
  };

  constructor(public auth: AuthService,
              public router: Router)
  { }

  ngOnInit(): void {
    localStorage.clear();
  }

  async onSignUpFacebook() {
    try {

      const user = await this.auth.loginFacebook();

      this.chechSignUp(user);
      
    } catch (error) {
      console.log(error);
    }
  }

  async onSignUpGoogle() {
    try {

      const user = await this.auth.loginGoogle();

      this.chechSignUp(user);

    } catch (error) {
      console.log(error);
    }
  }

  async onSignUp() {
    const { email, password } = this.usuario;
    try {
      
      const user = await this.auth.register(email, password);

      this.chechSignUp(user);

    } catch (error) {
      console.log(error);
    }
  }

  chechSignUp(user: any) {
    console.log(user);

    if(user){
      // peticion de guardar usuario
      
      if (user.emailVerified) {
        this.auth.logout();
        this.router.navigate(['/signin']);
      } else {
        this.router.navigate(['/role']);
      }
    } else {
      this.router.navigate(['/signup']);
    }
  }
}
