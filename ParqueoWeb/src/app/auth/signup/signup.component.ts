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
    email: "",
    password: ""
  };

  public error = null;

  constructor(public auth: AuthService,
              public router: Router)
  { }

  ngOnInit() {
  }

  async onSignUp() {
    const { email, password } = this.usuario;
    try {
      const user = await this.auth.signUpWithEmail(email, password);
      if(user){
        await this.auth.verifyEmail();
        this.router.navigate(['/role']);
      } else {
        this.router.navigate(['/signup']);
      }
    } catch (error) {
      //console.log(error);
      this.error = error;
    }
  }
}
