import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

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

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    //funcion de custom.js que inicializa cada ves que se requiera, despues de ingresar al dashboard
    customInitFunction();
    const url= localStorage.getItem('theme') ||`./assets/css/colors/purple-dark.css`;
    this.linkTheme.setAttribute('href',url);

    this.sidebarService.cargarMenu();
    
  }

}



