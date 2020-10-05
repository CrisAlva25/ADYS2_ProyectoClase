import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/servicios/rest.service';
import { getNotify, Notify } from "../../interface/Notify";

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {
  public notify: Notify = {};
  public path: string;
  public dpiPath: string;
  public policePath: string;

  public datos = [
    {selected: null, src: '', url: null, loaded: false}, //perfil
    {selected: null, src: '', url: null, loaded: false},   //dpi
    {selected: null, src: '', url: null, loaded: false},//antecede
  ]

  acceptTerms: boolean = false;
  public isChecked: boolean;

  constructor(public router: Router,
              public rest: RestService)
  { }

  @ViewChild('profileClose', {static: false}) profileClose: ElementRef;
  @ViewChild('dpiClose', {static: false}) dpiClose: ElementRef;
  @ViewChild('policeClose', {static: false}) policeClose: ElementRef;
  @ViewChild('termsClose', {static: false}) termsClose: ElementRef;
  
  ngOnInit(): void {
  }

  showPreview(event: any, option: number) {
  }

  uploadPhoto(option: number): void {
  }

  agreeToTermsAndConditions() {
    this.closeModal(this.termsClose);
  }

  private closeModal(modal: ElementRef):void {
    modal.nativeElement.click();
  }

}
