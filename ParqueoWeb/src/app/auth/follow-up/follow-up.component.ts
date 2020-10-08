import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';
import { getNotify, Notify } from "../../interface/Notify";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';

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
  public uploadPercentage: Observable<number>;

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
    if (event == null) return;
    
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.datos[option-1].src = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.datos[option-1].selected = event.target.files[0];
    }
  }

  async uploadPhoto(option: number) {
    this.clearNotify();
    // definiendo datos
    let path = `${this.datos[option-1].type}/${this.user.id}_${new Date().getTime()}`;
    let file = this.datos[option-1].selected;

    // ref upload
    const ref = this.storage.ref(path);
    const task= ref.put(file);
    this.uploadPercentage = task.percentageChanges();

    // process upload
    task.then(() => {
      // finish upload
      this.uploadPercentage = null;
      this.notify = getNotify(true, 'success', '', 'Gracias por actualizar su informacion');
      ref.getDownloadURL().subscribe(url => {
        this.rest.PostRequest(this.datos[option-1].request, { id: (option != 1)? this.user.idParking: this.user.id, url: url}).toPromise();
      });
    });

    this.closeOptionModal(option);
  }

  private closeOptionModal(option: number) {
    if(option == 1) {
      this.closeModal(this.profileClose);
    } else if (option == 2) {
      this.closeModal(this.dpiClose);
    } else {
      this.closeModal(this.policeClose);
    }
  }

  agreeToTermsAndConditions() {
    this.clearNotify();
    if (!this.isChecked) {
      this.notify = getNotify(true, 'error', '', 'Debe llenar el cuadro para aceptar las condiciones');
      this.closeModal(this.termsClose);
      return;
    }
    this.closeModal(this.termsClose);
  }

  clearNotify() {
    this.notify.active = false;
  }

  private closeModal(modal: ElementRef):void {
    modal.nativeElement.click();
  }
}
