import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  // info del usuario
  public usuario = {
    photo: "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg",
    username: "username",
    name: "name",
    email: "email",
    password: "password"
  };

  oldPassword = "";
  newPassword = "";
  conPassword = "";

  constructor() {
  }

  ngOnInit() {
  }
}
