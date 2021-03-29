import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Conocimiento } from 'src/app/models/conocimiento.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ConocimientoService } from 'src/app/services/conocimiento.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styles: [
  ]
})
export class ConocimientosComponent implements OnInit,OnDestroy {

  public conocimientos:Conocimiento[] = [];
  public cargando: boolean = true;
  private _imgSubs: Subscription;

  public conocimientoSeleccionado: Conocimiento;
  public conocimientoForm: FormGroup;

  constructor(private conocimientoService: ConocimientoService,
    private modalImagenService:ModalImagenService,
    private  busquedasService: BusquedasService,
    private fb: FormBuilder) { }

  ngOnDestroy(): void {
    this._imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.conocimientoForm = this.fb.group({
      nombre: ['',Validators.required],
      tipo : ['',Validators.required],
    })
    this.cargarConocimiento();
    this._imgSubs=this._imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img=>this.cargarConocimiento());
  }
  cargarConocimiento(){

    this.conocimientoService.cargaConocimientos()
    .subscribe(conocimientos=>{
      this.cargando=false;
      this.conocimientos = conocimientos;
    })

  }

  guardarCambios(conocimiento:Conocimiento){
  
    this.conocimientoService.actualizarConocimiento(conocimiento.nombre,conocimiento.tipo,conocimiento._id).subscribe(resp=>{
      
      Swal.fire('Actualizado',conocimiento.nombre,'success');
    });

  }

  eliminarCambios(conocimiento:Conocimiento){

    this.conocimientoService.borrarConocimiento(conocimiento._id).subscribe(resp=>{
     
      this.cargarConocimiento();
      Swal.fire('Borrado',conocimiento.nombre,'success');
    });

  }


  abrirModal(conocimiento:Conocimiento){
     this.modalImagenService.abrirModal('conocimientos',conocimiento._id,conocimiento.foto);
  }

  buscar(termino:string){

    if (termino.length === 0){

      return  this.cargarConocimiento();

    }
    this.busquedasService.buscar('conocimientos',termino).subscribe(
      //CASTEO
      (resultados:Conocimiento[])=>{

        this.conocimientos = resultados;

      }
    );
   }

   guardarConocimiento(){
    
    const {nombre} = this.conocimientoForm.value; 
    if(this.conocimientoSeleccionado){
        const data = {
          ...this.conocimientoForm.value,
          _id: this.conocimientoSeleccionado._id
        }
  
    }else{

      const {nombre} = this.conocimientoForm.value;
      this.conocimientoService.crearConocimiento(this.conocimientoForm.value).subscribe((resp:any)=>{

       Swal.fire('Creado',`${nombre} creado correctamente`,'success');
   
      },//err opcional para capturas errores e imprimirlos 
      (err) =>{
        Swal.fire('Error',err.error.msg, 'error');
      }
      )

    }
  
  }




}
