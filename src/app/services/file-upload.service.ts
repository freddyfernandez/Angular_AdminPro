import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  //FECH API ES DE PETICION HTTP CON JAVASCRIPT
  //SIEMPRE QUE SE USE UN ASYNC USAR UN TRY CATH
  async actualizarFoto(  archivo: File,tipo: 'usuarios'|'medicos'|'hospitales'|'conocimientos',id:string){

    try {

      const url= `${base_url}/uploads/${tipo}/${id}`;
      const formData= new FormData();
      formData.append('imagen',archivo);

      const resp = await fetch(url,{
        method: 'PUT',
        headers : {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      
      const data = await resp.json();
      if(data.ok){
        return data.nombreArchivo;
      }else{
        console.log(data.msg);
        return false;
      }
      
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
