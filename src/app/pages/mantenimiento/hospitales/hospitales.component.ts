import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy {

  public hospitales:Hospital[] = [];
  public cargando: boolean = true;

  private _imgSubs: Subscription;

  constructor(private hospitalService: HospitalService,
     private modalImagenService:ModalImagenService,
     private  busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this._imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarHospital();
    this._imgSubs=this._imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img=>this.cargarHospital());
  }
  cargarHospital(){

    this.hospitalService.cargaHospitales()
    .subscribe(hospitales=>{
      this.cargando=false;
      this.hospitales = hospitales;
    })

  }

  guardarCambios(hospital:Hospital){
  
    this.hospitalService.actualizarHospital(hospital._id,hospital.nombre).subscribe(resp=>{
      
      Swal.fire('Actualizado',hospital.nombre,'success');
    });

  }

  eliminarCambios(hospital:Hospital){

    this.hospitalService.borrarHospital(hospital._id).subscribe(resp=>{
     
      this.cargarHospital();
      Swal.fire('Borrado',hospital.nombre,'success');
    });

  }

  async abrirSweetAlert(){
    //fire.string: es un requisito para reconocer a la funcion de tipo async
    const {value=''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el Nombre del Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    })

    if(value.trim().length>0){

      this.hospitalService.crearHospital(value).subscribe((resp:any)=>{
        this.hospitales.push(resp.hospital)
      })

    }
  }

  abrirModal(hospital:Hospital){
     this.modalImagenService.abrirModal('hospitales',hospital._id,hospital.img);
  }

  buscar(termino:string){

    if (termino.length === 0){

      return  this.cargarHospital();

    }
    this.busquedasService.buscar('hospitales',termino).subscribe(
      resultados=>{

        this.hospitales = resultados;

      }
    );
   }

}
