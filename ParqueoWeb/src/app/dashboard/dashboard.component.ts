import { Component, OnInit, ViewChild, ElementRef, ɵConsole } from '@angular/core';
import { RestService } from '../servicios/rest.service';
import { AngularFireStorage } from '@angular/fire/storage';
//import { NotifierService } from 'angular-notifier';
import { finalize } from "rxjs/operators"

const REQUEST_ADDRESS = 'all-parking-accepted';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // alertas
  //private readonly notifier: NotifierService;

  noticia = {
    photos: [], // Las fotos que suba el usuario van aqui
    text: '', // el texto que agregue el usuario
    user: '', // aqui se guarda el usuario que publico la noticia
    parkingLot: '' // aqui se guarda el codigo del parqueo sobre el cual es la noticia 
  };

  newsPhotos = [];

  currentLot = {
    idUser: '1',
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
  //parqueos = [this.currentLot, this.currentLot];//, this.currentLot, this.currentLot, this.currentLot, this.currentLot, this.currentLot];
  
  //esta es una auxiliar para las busquedas
  auxParqueos = []
  filter = '';

  //esta variable nos sirve para ir cambiando de foto en foto
  currentPhoto = 0;

  


  //esta variable sirve para controlar el modal
  @ViewChild('infoClose', { static: false }) infoClose: ElementRef;
  @ViewChild('newsClose', { static: false }) newsClose: ElementRef;

  constructor(//notifierService: NotifierService,
    public rest: RestService,
    private storage: AngularFireStorage)
  { 
    this.storage = storage;
    //this.notifier = notifierService;

  }

  ngOnInit(): void {
    
    //this.getParqueos();
    for (let x = 0; x < 10; x++) {
      this.currentLot.location = "Zona "+x;
      this.parqueos.push(this.currentLot)
    }
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
    this.noticia.text = '';
    this.noticia.photos = [];
    this.newsPhotos = [];
    this.newsClose.nativeElement.click();
  }

  changeCurrentLot(parqueo) {
    this.currentLot = parqueo;
  }

  //Agregando imagnes
  
  async publish() {
    this.noticia.parkingLot = this.currentLot.location;
    //const user = JSON.parse(sessionStorage.getItem('user'));
    //this.noticia.user = user.id;

    //ESTA VARIABLE ES TEMPORAL Y DEBE SER BORRADA CUANDO YA TODO ESTE CONECTADO
    // LAS DOS LINEAS DE ARRIBA DEBEN SER DESCOMENTADAS
        this.noticia.user = this.currentLot.idUser;
        
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

      //console.log(noticiaNueva);
      if(res.bandera === true) {
        alert("La noticia fue agregada");
        //this.notifier.notify('success', 'noticia agregada');
      }
      else {
        //this.notifier.notify('error', 'la noticia no se puede agregar');
        alert("La noticia no se puede agregar");
      }
      
    });
    this.closeNewsModal();
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

    //const user = JSON.parse(sessionStorage.getItem('user'));
    
    /* subir las imagenes a firebase */
    const user = { id: 1} //BORRAR DESPUES DE QUE YA ESTE TODO
    this.uploadPhotoNotice(user.id);
  }
  
  uploadPhotoNotice(id: any) {
    let i = 1;
    this.newsPhotos.forEach(photo => {
      //console.log("estoy entrando");
      let filePath = `noticia/${i}_${id}_${new Date().getTime()}`;
      //console.log("2");
      const fileRef = this.storage.ref(filePath);
      //console.log("3");
      try {
        this.downloadPhotoNotice(fileRef, filePath, photo);
      }
      catch(e){
        console.log(e);
      }
      i++;
    });
    //console.log("estoy saliendo");
  }
  downloadPhotoNotice(fileRef: any, filePath: any, photo: any): void {
    this.storage.upload(filePath, photo).snapshotChanges().pipe(
      finalize(() => {
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
