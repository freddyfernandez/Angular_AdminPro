import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number=0;
  public usuarios: Usuario[]=[];
  public listaUsuarios:Usuario[]=[];
  public desde: number=0;
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
               private busquedaService: BusquedasService,
               private modalImagenService: ModalImagenService) {}
  
  /*ngOnDestroy():void{
    this.imgSubs.unsubscribe();
  } */            

  ngOnInit(): void {

    this.cargarUsuarios();
    this.imgSubs=this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe(img=>this.cargarUsuarios());
  
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargaUsuarios(this.desde)
    .subscribe(({total,usuarios})=>{
        this.totalUsuarios=total;
        this.usuarios=usuarios;
        this.listaUsuarios=usuarios;
        this.cargando = false;
      })
  }

  cambiarPagina(valor: number){
    this.desde+=valor;
    if(this.desde<0){
      this.desde=0;
    }
    else if(this.desde>=this.totalUsuarios){

      this.desde-=valor; 
    }
    this.cargarUsuarios();
  }

   buscar(termino:string){

    if (termino.length === 0){

      return  this.usuarios = this.listaUsuarios;

    }
    this.busquedaService.buscar('usuarios',termino).subscribe(
      (resultados:Usuario[])=>{

        this.usuarios = resultados;

      }
    );
   }

   abrirModal(usuario:Usuario){
     console.log(usuario);
     this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
   }

   eliminarUsuario(usuario:Usuario){
     if(usuario.uid === this.usuarioService.uid){
       return Swal.fire('Error','No se puede eliminar a si mismo','error');
     }

     Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( resp => {
            
            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })
   }

}
