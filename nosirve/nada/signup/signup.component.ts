import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';
import { Notify } from "../../interface/Notify";

const REQUEST_ADDRESS = 'add-user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  public notify: Notify = {};
  public usuario = { email: "", password: "" };

  constructor(public auth: AuthService,
              public router: Router,
              public rest: RestService)
  { }

  ngOnInit() {
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

  async onSignUp() {
    if(!this.checkFields())
      return;
    
    try {
      const { email, password } = this.usuario;
      const user = await this.auth
                              .signUpWithEmail(email, password);
      if(user){
        // agregar usuario
        let usr = await this.addUser();
        if (usr == null)
          return;
        console.log(usr)
        sessionStorage.setItem('user', JSON.stringify(usr));
        //await this.auth.verifyEmail();
        this.router.navigate(['/role']);
      } else {
        //this.router.navigate(['/signup']);
      }
    } catch (error) {
      this.notify = { active: true, type: 'error', message: error.message };
    }
  }

  async addUser() {
    try {
      return await this.rest.PostRequest(REQUEST_ADDRESS, this.usuario).toPromise();
    } catch (error) {
      this.notify = { active: true, type: 'error', message: (error.error)? error.error: error.message };
    }
    return null;
  }
}
