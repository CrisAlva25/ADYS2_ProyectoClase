import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';

const REQUEST_DELETE = 'delete-user-email';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.css']
})
export class VerificarEmailComponent implements OnInit, OnDestroy {
  public user: any;

  constructor(public auth: AuthService,
              public router: Router,
              public rest: RestService)
  { }

  @HostListener('window:beforeunload')
  doSomething() {
    //this.destroy()
    //console.log('beforeunload');
  }

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    //console.log(this.user)
  }

  ngOnDestroy() {
    this.destroy();
  }

  async destroy() {
    try {
      let { user } = await this.auth.ReauthenticateWithCredential(this.user.email, this.user.password);
      if (!user.emailVerified) {
        //console.log("no");
        await this.auth.deleteUser();
        await this.rest.PostRequest(REQUEST_DELETE, user).toPromise();
      }
    } catch (error) { }
  }

  async sendVerification() {
    await this.auth.verifyEmail();
  }

  async onVerify() {
    try {
      let { user } = await this.auth.ReauthenticateWithCredential(this.user.email, this.user.password);
      if (user.emailVerified) {
        //console.log("yes");
        await this.auth.signOut();
        this.router.navigate(['/signin']);
      }
    } catch (error) { }
  }
}
