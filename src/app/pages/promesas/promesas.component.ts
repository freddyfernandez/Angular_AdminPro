import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }
 
  ngOnInit(): void {
    //SIN LA PROMESA NO PUEDO MANIPULAR UN JSON SOLO MOSTRARLO POR DEFECTO
    //this.getUsuarios();

    //COM PROMESAS
    this.getUsuarios().then(
      usuarios =>{
        console.log(usuarios);
      }
    )
  }

  getUsuarios(){
     //PETICION HTTP CON PROMESA PARA SOLO EXTRAER EL BODY DEL RESPONSE 
    return new Promise (resolve=>{
      fetch('https://reqres.in/api/users?page=2').then(
        resp =>resp.json()).then(
        body=> resolve(body.data));
    });
  }

}
