import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./Register.component.css'
  ]
})
export class RegisterComponent  {
  public formSubmitted = false;
  //DEFINICION DE CAMPOS 
  public registerForm = this.fb.group({
    //VALIDACION DE CAMPOS TIPO BOOSTRAP
    nombre:['Freddy',[Validators.required, Validators.minLength(3)]],
    email: ['test1@gmail.com',[Validators.required, Validators.email]],
    password: ['123',[Validators.required]],
    password2: ['123',[Validators.required]],
    terminos: [true,[Validators.required]],

  },{
    validators: this.passwordsIguales('password','password2')

  });

  constructor(private fb: FormBuilder,private usuarioService: UsuarioService,private router:Router) { }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm);

    if (this.registerForm.invalid){
      return;
    }
    //REALIZAR POSTEO
    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe( resp =>{

      //INGRESAR AL DASHBOARD
      this.router.navigateByUrl('/');

    },(err) => {
      Swal.fire('Error',err.error.msg,'error');
    });    
  }
  //SI CUALQUIER CAMPO DE REGISTER FORM ES INVALIDO Y FORMSUBMITED ES TRUE => RETORNA TRUE
  campoNoValido(campo: string ): boolean {
    if(this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    }
    else{
      return false;
    }
  } 

  //GET TERMINOS ES FALSE Y SUBMITED TRUE => FALSE
  //! RETORNARA TRUE
  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contrasenasNoValidas(){
    const pass1=this.registerForm.get('password').value;
    const pass2=this.registerForm.get('password2').value;

    if(pass1==pass2){
      return false;
    }
    else{
      return true;
    }


  }

  passwordsIguales(pass1Name: string , pass2Name: string){
    return (formGroup: FormGroup)=>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if( pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }
      else{
        pass2Control.setErrors({noEsIgual:true})
      }
    }
  }


}
