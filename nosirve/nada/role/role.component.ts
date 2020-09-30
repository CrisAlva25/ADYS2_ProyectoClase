import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';
import { Notify } from "../../interface/Notify";

const REQUEST_UPDATE = 'update-rol';
const REQUEST_DELETE = 'delete-user-email';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, OnDestroy {
  public user: any;
  public notify: Notify = {};
  public role = null;

  constructor(public auth: AuthService,
              public router: Router,
              public rest: RestService)
  { }

  @HostListener('window:beforeunload')
  doSomething() {
    //this.destroy()
    //console.log('beforeunload');
  }

  ngOnInit() {
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

  onParkingUser() {
    this.notify = {
      active: true,
      type: 'success',
      title: 'Owner user',
      message: 'You must confirm the role for your user account.'
    };
    this.role = 'owner';
  }

  onRegularUser() {
    this.notify = {
      active: true,
      type: 'success',
      title: 'Regular user',
      message: 'You must confirm the role for your user account.'
    };
    this.role = 'regular';
  }

  checkData(): boolean {
    if(this.user == null)
      return false;
    if(this.role == null) {
      this.notify = { active: true, type: 'error', title: '', message: 'Choose role' };
      return false;
    }
    return true;
  }

  async onConfirm() {
    if (!this.checkData())
      return;

    try {
      await this.rest
              .PostRequest(REQUEST_UPDATE, { id: this.user.id, rol: this.role })
              .toPromise();
      
      if(!(await this.auth.getCurrentUser()).emailVerified){
        this.router.navigate(['/verify-email']);
      }
      /*else {

      }*/
    } catch (error) {
      this.notify = {
        active: true,
        type: 'error',
        title: '',
        message: (error.error)? error.error: error.message
      };
    }
  }
}
