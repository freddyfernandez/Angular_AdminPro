import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy   {

  public  cargando: boolean = true;
  public medicos: Medico[]=[];
  private _imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
     private modalImagenService: ModalImagenService,
     private busquedasService: BusquedasService ) { }
  ngOnDestroy(): void {
    this._imgSubs.unsubscribe()
  }

  ngOnInit(): void {

    this.cargarMedicos();
    this._imgSubs=this._imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img=>this.cargarMedicos());

  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargaMedicos().subscribe(medicos=>{
      this.cargando = false;
      this.medicos= medicos;
    })
  }

  buscar(termino:string){

    if (termino.length === 0){

      return  this.cargarMedicos();

    }
    this.busquedasService.buscar('medicos',termino).subscribe(
      resultados=>{

        this.medicos = resultados;

      }
    );
   }

  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos',medico._id,medico.img);
  }

 eliminarCambios(medico: Medico){
  Swal.fire({
    title: '¿Borrar medico?',
    text: `Esta a punto de borrar a ${ medico.nombre }`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, borrarlo'
  }).then((result) => {
    if (result.value) {
      
      this.medicoService.borrarMedico( medico._id )
        .subscribe( resp => {
          
          this.cargarMedicos();
          Swal.fire(
            'Medico borrado',
            `${ medico.nombre } fue eliminado correctamente`,
            'success'
          );
          
        });

    }
  })
 }

}
