import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent {

  //DECLARACION DE OBJETOS
  public perfilForm: FormGroup;
  public usuario: Usuario;
  //
  public imagenASubir: File;
  //
  public imgTemp: any;

  constructor(private fb: FormBuilder,private usuarioService : UsuarioService,private fileUploadService: FileUploadService) { 

    this.usuario = usuarioService.usuario; 

  }


  ngOnInit(): void {
    // SE CARGA AL DARLE CLICK EN MY PROFILE
    this.perfilForm = this.fb.group({
      nombre:[this.usuario.nombre,Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]],
    });


  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(()=>{
      const {nombre,email} = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado','Cambios guardados','success');
     
    },
    //err opcional para capturas errores e imprimirlos 
    (err) =>{
      Swal.fire('Error',err.error.msg, 'error');
    }
    )};

  cambiarImagen(file:File){

    this.imagenASubir = file;
    if(!file){
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      this.imgTemp = reader.result;
      
    }
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenASubir,'usuarios',this.usuario.uid)
    .then(img=>{
      this.usuario.img=img;
      Swal.fire('Guardado','Imagen guardada','success');
    }).catch(err=>{
      Swal.fire('Error','No se pudo subir la imagen', 'error');
    })
    
  } 


}
