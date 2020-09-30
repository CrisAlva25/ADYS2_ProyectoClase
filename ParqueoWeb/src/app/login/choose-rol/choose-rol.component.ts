import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';
import { Notify, getNotify } from "../../interface/Notify";

const REQUEST_ADDRESS = 'update-rol';

@Component({
  selector: 'app-choose-rol',
  templateUrl: './choose-rol.component.html',
  styleUrls: ['./choose-rol.component.css']
})
export class ChooseRolComponent implements OnInit {
  public user: any;
  public notify: Notify = {};
  public rol = null;
  public navegacion = null;

  @ViewChild('confirmClose', { static: false }) confirmClose: ElementRef;

  constructor(public router: Router,
              public rest: RestService)
  { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.navegacion = sessionStorage.getItem('navegacion');
    //console.log(this.user)
  }

  onOwner() {
    this.notify = getNotify(true, 'success', 'Owner user',
    'The owner user can publish news, promotions, update information related to a parking lot, such as rate, status, available places, capacity, etc. Also, you can report users for misuse.');
    this.rol = 'owner';
  }

  onRegular() {
    this.notify = getNotify(true, 'success', 'Regular user', 
    'Regular user can post news, mark parking, search parking by address, etc. Also, you can report users for misuse.');
    this.rol = 'regular';
  }

  async onConfirm() {
    try {
      await this.rest.PostRequest(REQUEST_ADDRESS, { id: this.user.id, rol: this.rol }).toPromise();
      this.confirmClose.nativeElement.click();

      if(this.navegacion === 'signup') {
        sessionStorage.clear();
        this.router.navigate(['/signin']);
      } else if (this.rol === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        //this.router.navigate(['/dashboard']);
        console.log('dashboard');
      }
    } catch (error) { }
  }
}
