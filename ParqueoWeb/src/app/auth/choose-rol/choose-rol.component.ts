import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';
import { Notify, getNotify } from "../../interface/Notify";

const REQUEST_ROL = 'update-rol';
const REQUEST_PARK = 'get-parking';

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
    this.notify = getNotify(true, 'success', 'Dueño de parqueo',
    'El usuario propietario puede publicar noticias, promociones, actualizar información relacionada con un parqueo, como tarifa, estado, lugares disponibles, capacidad, etc. Además, puede denunciar a los usuarios por mal uso.');
    this.rol = 'owner';
  }

  onRegular() {
    this.notify = getNotify(true, 'success', 'Usuario regular', 
    'El usuario habitual puede publicar noticias, marcar parqueo, buscar parqueo por dirección, etc. Además, puede denunciar a los usuarios por mal uso.');
    this.rol = 'regular';
  }

  async onConfirm() {
    try {
      this.user = await this.rest.PostRequest(REQUEST_ROL, { id: this.user.id, rol: this.rol }).toPromise();
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.confirmClose.nativeElement.click();

      
      if(this.navegacion === 'register') {
        sessionStorage.clear();
        this.router.navigate(['/login']);

      } else if (this.rol === 'owner') {
        let park = await this.rest.PostRequest(REQUEST_PARK, this.user).toPromise();
        if(park.authorized) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/followup']);
        }
        
      } else {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) { }
  }
}
