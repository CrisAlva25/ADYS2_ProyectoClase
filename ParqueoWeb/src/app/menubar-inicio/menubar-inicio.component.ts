import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menubar-inicio',
  templateUrl: './menubar-inicio.component.html',
  styleUrls: ['./menubar-inicio.component.css']
})
export class MenubarInicioComponent implements OnInit {

  public user$: Observable<firebase.User> = this.auth.afAuth.user;
  public user: any;

  constructor(public auth: AuthService,
    public router: Router)
  { }

  async ngOnInit() {
    this.user$.subscribe(
      (fuser) => {
        if (fuser) {
          this.user = fuser;
          console.log(this.user);
          console.log("verify-email");
        }
        else {
          this.user = null;
        }
      }
    );
  }

  async onSignOut() {
    await this.auth.signOut();
    //ir a home
    this.router.navigate(['/signin']);
  }
}
