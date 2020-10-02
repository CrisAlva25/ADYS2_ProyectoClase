import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-bienvenida',
  templateUrl: './pantalla-bienvenida.component.html',
  styleUrls: ['./pantalla-bienvenida.component.css']
})
export class PantallaBienvenidaComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
      console.log("hola")
      window.setTimeout(function(){window.location.href = "/admin"},5000);    
  }
}
