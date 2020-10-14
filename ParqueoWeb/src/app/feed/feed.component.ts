import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { RestService } from '../servicios/rest.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  private readonly notifier: NotifierService;
  currentNew = { address: 'Lote 10',
                 username: "Brandon",
                 user: "",
                 photos: [/*"../assets/img1.jpg", "../assets/img2.jpg"*/],
                 text: "El texto que el usuario quiera incluir",
                 parkingLot: "",
                 _id: ""
               }

  noticias = [];

  currentPhoto = 0;

  //esta variable sirve para controlar el modal
  @ViewChild('infoClose', { static: false }) infoClose: ElementRef;

  constructor(private rest: RestService, notifierService: NotifierService)
  {
    this.notifier = notifierService;
    this.getListNotices();
  }

  ngOnInit() {
    /*this.noticias.push(this.currentNew);
    this.noticias.push(this.currentNew);
    this.noticias.push(this.currentNew);*/
  }

  //NO BORRAR
  next(): void {
    if (this.currentPhoto < this.currentNew.photos.length - 1)
      this.currentPhoto++;
  }

  //NO BORRAR
  previous(): void {
    if (this.currentPhoto > 0)
      this.currentPhoto--;
  }

  closeModal(): void {
    this.currentPhoto = 0;
    this.infoClose.nativeElement.click();
  }

  changeCurrentNew(noticia){
    console.log('en el metodo changeCurrentNew');
    console.log(noticia);
    alert(noticia._id);
    this.currentNew._id = noticia._id;
    this.currentNew.address = "";
    this.currentNew.parkingLot = "";
    this.currentNew.photos = noticia.photos;
    this.currentNew.text = noticia.text;
    this.currentNew.user = noticia.user;
    this.currentNew.username = "";

  }
  getListNotices() {
    // esta direccion es temporal
    // los del backend lo van hacer yo solo lo conecto
    //const LIST_NOTICE_ADDRESS = "http://localhost:3000/get-listNotice";
    const LIST_NOTICE_ADDRESS = "get-listNotice";

    //obtener una lista de noticias de backend
    let observer = this.rest.GetRequest(LIST_NOTICE_ADDRESS).subscribe(res => {
      //ahora cargar toda la lista en noticias
      this.noticias = res;
      console.log('respuesta noticias');
      console.log(this.noticias)
    });

  }

}

