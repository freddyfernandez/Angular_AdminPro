import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Conocimiento } from '../models/conocimiento.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

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
  private transformarUsuarios(resultados: any[]): Usuario[]{
     return resultados.map(
       user => new  Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
     )
  }
  private transformarHospitales(resultados: any[]): Hospital[]{
    return resultados;
 }

 busquedaGlobal(termino:string){
   const url = `${base_url}/todo/${termino}`;
   return this.http.get(url,this.headers);
 }
 
 private transformarMedicos(resultados: any[]): Medico[]{
    return resultados;
 }

 private transformarConocimientos(resultados: any[]): Conocimiento[]{
  return resultados.map(con => new Conocimiento(con.nombre,con.tipo,con.id,con.img));
 }

  buscar(tipo: 'usuarios'|'medicos'|'hospitales'|'conocimientos',
         termino: string){
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url,this.headers).pipe(
      map((resp:any)=> {
        switch (tipo){
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados);
          case 'hospitales':
            return this.transformarHospitales(resp.resultados);
          case 'medicos':
            return this.transformarMedicos(resp.resultados);
          case 'conocimientos':
            return this.transformarConocimientos(resp.resultados);
          
            
          default:
            return [];  
        }
      })
    )
  }
}
