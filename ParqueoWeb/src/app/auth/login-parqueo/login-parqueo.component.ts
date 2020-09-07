import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-parqueo',
  templateUrl: './login-parqueo.component.html',
  styleUrls: ['./login-parqueo.component.css']
})
export class LoginParqueoComponent implements OnInit {
  
  public usuario = {
    email: "",
    password: ""
  };

  constructor(public auth: AuthService,
    public router: Router)
  { }

  ngOnInit(): void {
  }

  async onLogin() {
    const { email, password } = this.usuario;
    try {
      const user = await this.auth.login(email, password);
      
      if (user && user.user.emailVerified) {
        this.router.navigate(['/admin']);
      } else if (user) {
        this.router.navigate(['/verify-user']);
      } else {
        this.router.navigate(['/register-parking']);
      }

    } catch (error) {
      console.log("login")
      console.log(error);
    }
  }
}
