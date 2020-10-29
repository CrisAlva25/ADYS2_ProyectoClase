import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';

const REQUEST_LOCK = 'update-lock';
const REQUEST_UNLOCK = 'update-unlock';

@Component({
  selector: 'app-bloqueos',
  templateUrl: './bloqueos.component.html',
  styleUrls: ['./bloqueos.component.css']
})
export class BloqueosComponent implements OnInit {

  constructor(public router: Router,public rest: RestService) { }

  @ViewChild('openModal', {static: false}) openModal: ElementRef;

  bloquear:string="";
  idParqueo:string="";

  ngOnInit(): void {
  }

  async ejecutarBloqueo() {
    console.log(this.bloquear);
    try {
      await this.rest.PostRequest(REQUEST_LOCK, {id: this.idParqueo, block: true}).toPromise();
    } catch (error) {
      console.log(error);
    }
    alert(this.idParqueo + " bloqueado");
  }
  async ejecutarDesBloqueo() {
    console.log(this.bloquear);
    try {
      await this.rest.PostRequest(REQUEST_UNLOCK, {id: this.idParqueo, block: false}).toPromise();
    } catch (error) {
      console.log(error);
    }
    alert(this.idParqueo + " Desbloqueado");
  }
  lock():void{
    alert(this.idParqueo + "bloqueado");
  }

  unlock():void{
    alert(this.idParqueo + "Desbloqueado");
  }
}
