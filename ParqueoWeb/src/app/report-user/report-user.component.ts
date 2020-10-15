import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RestService } from '../servicios/rest.service';
import { NotifierService } from 'angular-notifier';
import { AngularFireStorage } from '@angular/fire/storage';

const REQUEST_ADDRESS = 'all-users';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent implements OnInit {
  private readonly notifier: NotifierService;
  currentLot = {
    _id:"",
    idUsuario:"el que sea",
    email:"",
    nombreUser:"el que seax2"
  };

  listaUsuarios = [];

  @ViewChild('infoClose', { static: false }) infoClose: ElementRef;
  @ViewChild('newsClose', { static: false }) newsClose: ElementRef;

  constructor(notifierService: NotifierService,
    private rest: RestService,
    private storage: AngularFireStorage) {
    let observer = this.rest.GetRequest(REQUEST_ADDRESS).subscribe( res => {
      res.forEach(user => {
        if (user.block === false) {
          this.listaUsuarios.push(user);
        }
        //console.log(user);
      });
      console.log(sessionStorage.getItem('user'));
      console.log(this.listaUsuarios);
    });

    this.notifier = notifierService;
  }

  ngOnInit(): void {
  }

  closeModal(): void {
   // this.currentPhoto = 0;
    this.infoClose.nativeElement.click();
  }

  closeNewsModal(): void {
    this.newsClose.nativeElement.click();
  }

  changeCurrentLot(usuario) {
    this.currentLot = usuario;
  }
  reportUser(): void {
    console.log(this.currentLot);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const json = {
      idRegular: user.id,
      //emailRegular: user.em,
      idReported: this.currentLot._id
    }
    console.log('id de user reportador '+ this.currentLot.idUsuario);
    console.log('id de  user reportado '+ this.currentLot._id);
    console.log(json);
    let observer = this.rest.PostRequest('post-reportRegular',json).subscribe( res => {
      console.log(res);
      if(res.success===false){
        alert('error: '+ 'usted ya reporto este usuario');
      }else{
        alert('success: '+'parqueo reportado');
      }
      //console.log(sessionStorage.getItem('user'));
      //console.log(this.parqueos);
    });

  }



}
