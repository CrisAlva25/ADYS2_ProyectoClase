import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  
  public user$: Observable<firebase.User> = this.auth.afAuth.user;
  public user: any;

  constructor(public auth: AuthService,
    public router: Router)
  { }

  ngOnInit() {
    this.user$.subscribe(
      (fuser) => {
        if (fuser) {
          this.user = fuser;
          console.log(this.user);
          console.log("role");
        }
        else {
          this.user = null;
        }
      }
    );
  }

  ngOnDestroy() {
  }

  async onParkingUser() {
    console.log("parking")
    
    if(!(await this.auth.getCurrentUser()).emailVerified){
      this.router.navigate(['/verify-email']);
    }
  }

  async onRegularUser() {
    console.log("regular")
    
    if(!(await this.auth.getCurrentUser()).emailVerified){
      this.router.navigate(['/verify-email']);
    }
  }
}
