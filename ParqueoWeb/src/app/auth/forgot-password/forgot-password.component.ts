import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email: any;

  constructor(public auth: AuthService,
    public router: Router)
  { }

  ngOnInit(): void {
  }

  async onReset() {
    try {
      const email = this.email;
      await this.auth.resetPassword(email);
      window.alert('Email sent, check your inbox!');
      this.router.navigate(['/login-parking']);
    } catch (error) {
      console.log(error);
    }
  }

}
