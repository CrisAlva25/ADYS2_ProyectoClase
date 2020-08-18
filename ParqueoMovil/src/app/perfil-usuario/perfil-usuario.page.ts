import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  // deshabilitar inputs
  private deshabilitado: boolean;

  // info del usuario
  private usuario;

  constructor() {
    this.deshabilitado = true;
    this.usuario = {
      photo: "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg",
      username: "username",
      name: "name",
      email: "email"
    }
  }

  ngOnInit() {
  }

}
