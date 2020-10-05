import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';
import { getNotify, Notify } from "../../interface/Notify";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

const REQUEST_FOTO = 'update-photo';
const REQUEST_DPI = 'update-dpi';
const REQUEST_ANTECEDENTES = 'update-criminalRecords';
const REQUEST_PARK = 'get-parking';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {
  public notify: Notify = {};
  public user: any;

  public datos = [
    {selected: null, src: '', url: null, loaded: false, type: 'foto', request: REQUEST_FOTO}, //perfil
    {selected: null, src: '', url: null, loaded: false, type: 'dpi', request: REQUEST_DPI},   //dpi
    {selected: null, src: '', url: null, loaded: false, type: 'antecedentes', request: REQUEST_ANTECEDENTES},//antecede
  ]

  acceptTerms: boolean = false;
  public isChecked: boolean;

  constructor(public router: Router,
              public rest: RestService,
              private storage: AngularFireStorage)
  { }

  @ViewChild('profileClose', {static: false}) profileClose: ElementRef;
  @ViewChild('dpiClose', {static: false}) dpiClose: ElementRef;
  @ViewChild('policeClose', {static: false}) policeClose: ElementRef;
  @ViewChild('termsClose', {static: false}) termsClose: ElementRef;
  
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getParqueo();
  }

  async getParqueo() {
    try {
      let park = await this.rest.PostRequest(REQUEST_PARK, this.user).toPromise();
      this.acceptTerms = park.acceptTerm;

      if (this.user.photo != null && this.user.photo != '')
        this.datos[0].loaded = true;

      if (park.dpi != null && park.dpi != '')
        this.datos[1].loaded = true;

      if (park.criminalRecords != null && park.criminalRecords != '')
        this.datos[2].loaded = true;

    } catch (error) {
      
    }
  }

  showPreview(event: any, option: number) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => this.datos[option-1].src = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.datos[option-1].selected = event.target.files[0];
    }
  }

  uploadPhoto(option: number): void {
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    let imgToSend = null;
    let resource;

    if (this.datos[option-1].selected == null) {
      this.notify = getNotify(true, 'error', '', 'Debe seleccionar una fotografia para poder enviarla');
      //console.log(this.datos[option-1].selected);
      return;
    }

    imgToSend = this.datos[option-1].selected.name.split('.').slice(0, -1).join('.');
    resource = this.datos[option-1].selected;

    let filePath = `${ this.datos[option-1].type}/${user.id}_${imgToSend}_${new Date().getTime()}`;
    console.log(filePath);
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, resource).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          let observer = this.rest.PostRequest(this.datos[option-1].request, { id: (option != 1)? user.idParking: user.id, url: url}).subscribe(res => {
            this.notify = getNotify(true, 'success', '', 'Gracias por actualizar su informacion');
            setTimeout(() => {
              this.notify.active = false;
            }, 4000);
            observer.unsubscribe();
          });
        })
      })
    ).subscribe();
    this.datos[option-1].loaded = true;
    this.closeModal(this.profileClose);
  }

  agreeToTermsAndConditions() {
    if (!this.isChecked) {
      this.notify = getNotify(true, 'error', '', 'Debe llenar el cuadro para aceptar las condiciones');
      this.closeModal(this.termsClose);
      setTimeout(() => {
        this.notify.active = false;
      }, 3500);
      return;
    }

    this.closeModal(this.termsClose);
  }

  private closeModal(modal: ElementRef):void {
    modal.nativeElement.click();
  }

}
