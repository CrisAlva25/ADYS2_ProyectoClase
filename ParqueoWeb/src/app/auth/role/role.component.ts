import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public user: any;

  constructor(public auth: AuthService,
    public router: Router)
  { }

  async ngOnInit() {
  }

  ngOnDestroy() {
    this.auth.logout();
  }

  onParkingUser() {
    // peticion de modificar role
    this.router.navigate(['/verification-email']);
  }

  onRegularUser() {
    // peticion de modificar role
    this.router.navigate(['/verification-email']);
  }
}
