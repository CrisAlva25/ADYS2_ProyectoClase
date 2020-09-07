import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit {

  public user: any;

  constructor(public auth: AuthService,
    public router: Router)
  { }

  async ngOnInit() {
    this.user = await this.auth.getCurrentUser();
  }

  ngOnDestroy() {
    this.auth.logout();
  }

  async sendVerification() {
    await this.auth.sendVerificationEmail();
  }
}
