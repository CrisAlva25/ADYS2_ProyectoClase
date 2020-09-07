import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificar-usuario',
  templateUrl: './verificar-usuario.component.html',
  styleUrls: ['./verificar-usuario.component.css']
})
export class VerificarUsuarioComponent implements OnInit {

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

  onLogin() {
    // ir a home o pantalla de bienvenida
    this.router.navigate(['/login-parking']);
  }
}
