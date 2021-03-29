import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Conocimiento } from '../models/conocimiento.model';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ConocimientoService {

  constructor(private http:HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  
  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    };
  }

  cargaConocimientos(){
    const url = `${base_url}/conocimientos`;
    return this.http.get(url,this.headers)
    .pipe(
      //TRUCO DEL ANY FORTE
      map((resp:{ok:boolean,conocimientos:Conocimiento[]}) => resp.conocimientos)
    )
       
    
  }

  crearConocimiento(conocimiento:{nombre:string,tipo:string}){
    const url = `${base_url}/conocimientos`;
    return this.http.post(url,conocimiento,this.headers)
  }

  actualizarConocimiento(nombre:string,tipo:string,_id:string){
    const url = `${base_url}/conocimientos/${_id}`;
    return this.http.put(url,{nombre,tipo},this.headers)
  }


  borrarConocimiento(_id:string){
    const url = `${base_url}/conocimientos/${_id}`;
    return this.http.delete(url,this.headers)
  }

  
}
