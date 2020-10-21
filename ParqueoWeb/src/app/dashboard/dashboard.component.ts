import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RestService } from '../servicios/rest.service';
import { AngularFireStorage } from '@angular/fire/storage';
const REQUEST_ADDRESS = 'all-parking';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentLot = {
    id: 'lasdkfnasd',
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
    block: false,
    authorized: true,
    photos: [ 'https://cdn.ticbeat.com/src/uploads/2018/02/vender-fotos-por-internet-810x540.jpeg', 'https://cdn.ticbeat.com/src/uploads/2018/02/vender-fotos-por-internet-810x540.jpeg']
  };

  parqueos = [];
  //[this.currentLot, this.currentLot, this.currentLot, this.currentLot, this.currentLot, this.currentLot, this.currentLot];

  currentPhoto = 0;

  //esta variable sirve para controlar el modal
  @ViewChild('infoClose', { static: false }) infoClose: ElementRef;
  @ViewChild('newsClose', { static: false }) newsClose: ElementRef;

  constructor(private rest: RestService,
    private storage: AngularFireStorage) {
    /*let observer = this.rest.GetRequest(REQUEST_ADDRESS).subscribe( res => {
      res.forEach(user => {
        if (user.block === false) {
          this.parqueos.push(user);
        }
        //console.log(user);
      });
      console.log(sessionStorage.getItem('user'));
      //console.log(this.parqueos);
    });*/
  }

  ngOnInit(): void {
    this.getParqueos();
  }

  async getParqueos() {
    try {
      this.parqueos = await this.rest.GetRequest(REQUEST_ADDRESS).toPromise();
      this.parqueos = this.parqueos.filter(parqueo => !parqueo.block && parqueo.authorized);
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

  reportParking(): void {
    console.log(this.currentLot);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const json = {
      idRegular: user.id,
      //emailRegular: user.em,
      idParking: this.currentLot.id
    }
    console.log('id de  parq '+ this.currentLot.idParking);
    console.log('id de _id '+ this.currentLot.id);
    console.log(json);
    let observer = this.rest.PostRequest('post-reportParking',json).subscribe( res => {
      console.log(res);
      if(res.success===false){
        alert('error: '+ 'usted ya reporto este parqueo');
      }else{
        alert('success: '+'parqueo reportado');
      }
      //console.log(sessionStorage.getItem('user'));
      //console.log(this.parqueos);
    });

  }

}
