import { Injectable ,EventEmitter} from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean=true;
  public tipo:'usuarios'|'medicos'|'hospitales'|'conocimientos';
  public id: string;
  public img: string;
  
  //OBSERVADOR de angular core
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios'|'medicos'|'hospitales'|'conocimientos',
             id:string,img:string='no-img')
  {
    this._ocultarModal=false;
    this.tipo=tipo;
    this.id=id;
    this.img =img;

    if(img.includes('https')){
      this.img = img;
    }else{
      this.img = `${base_url}/uploads/${tipo}/${img}`;
    }

    console.log(this.img);

  }

  cerrarModal(){
    this._ocultarModal=true;
  }

  constructor() { }
}
