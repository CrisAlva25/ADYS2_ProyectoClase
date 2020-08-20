import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  // info del usuario
  public usuario = {
    photo: "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg",
    username: "username",
    name: "name",
    email: "email",
    password: "password"
  };

  // confirmar password
  oldPassword = "";
  newPassword = "";
  conPassword = "";
  
  @ViewChild('closePerfil', {static: false}) closePerfil: ElementRef;
  @ViewChild('closePassword', {static: false}) closePassword: ElementRef;
  
  constructor() {
  }

  ngOnInit(): void {
  }

  guardarPerfil() {
    // validar atributos

    console.log(this.usuario);
  }

  uploadPhoto(target) { 
    // guardar photo

    // modificar estado
    console.log(target.files);
  }

  guardarPassword() {
    //validar el password old

    //validar el password new

    //validar el password new y con
    this.usuario.password = this.newPassword;

    this.oldPassword = "";
    this.newPassword = "";
    this.conPassword = "";
  }

  closeEditarPerfil() {
    this.closePerfil.nativeElement.click();
  }

  closeEditarPassword() {
    this.closePassword.nativeElement.click();
  }
}
