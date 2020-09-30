import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RestService } from '../servicios/rest.service';

const REQUEST_ADDRESS = 'all-parking-accepted';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentLot = {
    idUser: 'lasdkfnasd',
    idParking: 'asa',
    photo: 'https://cdn.ticbeat.com/src/uploads/2018/02/vender-fotos-por-internet-810x540.jpeg',
    name: '',
    email: '',
    phone: '',
    location: 'zona 1',
    status: 'Cerrado',
    tariff: '',
    numberAvailable: 100,
    numberCapacity: 100,
    photos: [ 'https://cdn.ticbeat.com/src/uploads/2018/02/vender-fotos-por-internet-810x540.jpeg', 'https://cdn.ticbeat.com/src/uploads/2018/02/vender-fotos-por-internet-810x540.jpeg']
  };

  parqueos = [];
  //[this.currentLot, this.currentLot, this.currentLot, this.currentLot, this.currentLot, this.currentLot, this.currentLot];

  currentPhoto = 0;

  //esta variable sirve para controlar el modal
  @ViewChild('infoClose', { static: false }) infoClose: ElementRef;
  @ViewChild('newsClose', { static: false }) newsClose: ElementRef;

  constructor(public rest: RestService)
  { }

  ngOnInit(): void {
    this.getParqueos();
  }

  async getParqueos() {
    try {
      this.parqueos = await this.rest.GetRequest(REQUEST_ADDRESS).toPromise();
    } catch (error) { }
  }

  next(): void {
    if (this.currentPhoto < this.currentLot.photos.length - 1)
      this.currentPhoto++;
  }

  previous(): void {
    if (this.currentPhoto > 0)
      this.currentPhoto--;
  }

  closeModal(): void {
    this.currentPhoto = 0;
    this.infoClose.nativeElement.click();
  }

  closeNewsModal(): void {
    this.newsClose.nativeElement.click();
  }

  changeCurrentLot(parqueo) {
    this.currentLot = parqueo;
  }
}
