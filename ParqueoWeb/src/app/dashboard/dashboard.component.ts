import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RestService } from '../servicios/rest.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { NotifierService } from 'angular-notifier';
import { finalize } from "rxjs/operators"

const REQUEST_ADDRESS = 'all-parking';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private readonly notifier: NotifierService;

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
  textoNoticia='';
  //[this.currentLot, this.currentLot, this.currentLot, this.currentLot, this.currentLot, this.currentLot, this.currentLot];

  currentPhoto = 0;
  noticia = {
    photos: [], // Las fotos que suba el usuario van aqui
    text: '', // el texto que agregue el usuario
    user: '', // aqui se guarda el usuario que publico la noticia
    parkingLot: '' // aqui se guarda el codigo del parqueo sobre el cual es la noticia 
  } 

  newsPhotos = [];



  //esta variable sirve para controlar el modal
  @ViewChild('infoClose', { static: false }) infoClose: ElementRef;
  @ViewChild('newsClose', { static: false }) newsClose: ElementRef;

  constructor(notifierService: NotifierService,
    private rest: RestService,
    private storage: AngularFireStorage) {
    let observer = this.rest.GetRequest(REQUEST_ADDRESS).subscribe( res => {
      res.forEach(user => {
        if (user.block === false) {
          this.parqueos.push(user);
        }
        //console.log(user);
      });
      console.log(sessionStorage.getItem('user'));
      //console.log(this.parqueos);
    });

    this.notifier = notifierService;
  }

 

  ngOnInit(): void {
    //this.getParqueos();
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


  changeCurrentLot(parqueo) {
    this.currentLot = parqueo;
  }

  closeNewsModal(): void {
    this.noticia.text = '';
    this.noticia.photos = [];
    this.newsPhotos = [];
    this.newsClose.nativeElement.click();
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

  loadNewsImages(event: any) {
    if (!event.target.files || event.target.files.length < 1) {
      return;
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      this.newsPhotos.push(event.target.files[i]);
      reader.onload = (event) => {};
    }

    const user = JSON.parse(sessionStorage.getItem('user'));
    
    /* subir las imagenes a firebase */
    this.uploadPhotoNotice(user.id);
  }

  async publish() {
    this.noticia.parkingLot = this.currentLot.id;
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.noticia.user = user.id;

    //ESTA VARIABLE ES TEMPORAL Y DEBE SER BORRADA CUANDO YA TODO ESTE CONECTADO
    // LAS DOS LINEAS DE ARRIBA DEBEN SER DESCOMENTADAS
    
    //const user = { id: 1}
    
    let noticiaNueva = {
      photos: this.noticia.photos,
      text: this.noticia.text,
      user: this.noticia.user,
      parkingLot: this.noticia.parkingLot
    };

    /* this.noticia es lo que se manda a la base de datos para que se guarde*/
    /*  AQUI VA EL METODO PUT O POST QUE LO VA A GUARDAR EN LA BASE DE DATOS*/

    const NOTICE_ADD_ADDRESS = "post-addParkingNoticia";
    let observer = await this.rest.PostRequest(NOTICE_ADD_ADDRESS, noticiaNueva).subscribe(res => {

      console.log(noticiaNueva);

      if(res.bandera === true) {
        this.notifier.notify('success', 'noticia agregada');
      }
      else {
        this.notifier.notify('error', 'la noticia no se puede agregar');
      }
      
    });

    this.closeNewsModal();
  }

  uploadPhotoNotice(id: any) {
    let i = 1;
    this.newsPhotos.forEach(photo => {
      console.log("estoy entrando");
      let filePath = `noticia/${i}_${id}_${new Date().getTime()}`;
      console.log("2");
      const fileRef = this.storage.ref(filePath);
      console.log("3");
      try {
        this.downloadPhotoNotice(fileRef, filePath, photo);
      }
      catch(e){
        console.log(e);
      }
      i++;
    });
    console.log("estoy saliendo");
  }

  downloadPhotoNotice(fileRef: any, filePath: any, photo: any): void {
    this.storage.upload(filePath, photo).snapshotChanges().pipe(
      finalize(() => {
        console.log("4");
        fileRef.getDownloadURL().subscribe((url) => {
          this.pushPhotoNotice(url);
        })
      })
    ).subscribe();
  }

  pushPhotoNotice(url: string): void {
    this.noticia.photos.push(url);
  }



}
