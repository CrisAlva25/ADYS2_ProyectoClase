import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentLot = {
    _id: 'lasdkfnasd',
    photo: '../assets/user.png',
    name: '',
    email: '',
    phone: '',
    location: 'donde el diablo dejo el caite',
    password: '',
    status: 'Cerrado',
    tariff: '',
    numberAvailable: 100,
    services: [],
    photos: [ '../assets/user.png', '../assets/img1.jpg', '../assets/img2.jpg', '../assets/img3.jpg']
  };

  parqueos = [this.currentLot];

  currentPhoto = 0;

  //esta variable sirve para controlar el modal
  @ViewChild('infoClose', { static: false }) infoClose: ElementRef;
  @ViewChild('newsClose', { static: false }) newsClose: ElementRef;

  constructor() { }

  ngOnInit(): void {
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
}
