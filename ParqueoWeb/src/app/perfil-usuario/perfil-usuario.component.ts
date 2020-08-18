import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor() { }

  usuario = {
    photo: "https://www.adslzone.net/app/uploads/2019/04/borrar-fondo-imagen.jpg",
    username: "username",
    name: "name",
    email: "email"
  }

  ngOnInit(): void {
  }
}
