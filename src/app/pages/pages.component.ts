import { Component, OnInit } from '@angular/core';

//declara la funcion para manipular lanzamiento de javascript
declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]

})
export class PagesComponent implements OnInit {
  //ALMACENA LA ETIQUETA LINK POR SU ID 
  public linkTheme =document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
    //funcion de custom.js que inicializa cada ves que se requiera, despues de ingresar al dashboard
    customInitFunction();
    const url= localStorage.getItem('theme') ||`./assets/css/colors/purple-dark.css`;
    this.linkTheme.setAttribute('href',url);
    
  }

}



