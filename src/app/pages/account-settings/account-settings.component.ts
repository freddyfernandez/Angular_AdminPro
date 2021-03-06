import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  
  //ALMACENA LA ETIQUETA LINK POR SU ID 
  public linkTheme =document.querySelector('#theme');

  public links;

  constructor() { }
  //EL ONINITI SE INICIA DESPUES DE CARGAR EL COMPONENTE
  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(theme:string)
  {

  const url= `./assets/css/colors/${theme}.css`;
  
  this.linkTheme.setAttribute('href',url);
  localStorage.setItem('theme',url);

  this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    this.links.forEach(element => {
       element.classList.remove('working');
       const btnTheme = element.getAttribute('data-theme');
       const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;   
       const currentTheme = this.linkTheme.getAttribute('href');
       
       if(btnThemeUrl === currentTheme){
         element.classList.add('working');
       }
    });
  }

}


