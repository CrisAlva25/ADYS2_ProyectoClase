import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-parqueo',
  templateUrl: './register-parqueo.component.html',
  styleUrls: ['./register-parqueo.component.css']
})
export class RegisterParqueoComponent implements OnInit {
  
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
  }

  async onRegister() {
    const { email, password } = this.usuario;
    try {
      const user = await this.auth.register(email, password);
      
      if(user) {
        this.router.navigate(['/verify-user']);
      }

    } catch (error) {
      console.log("register");
      console.log(error);
    }
  }
}
