import { Component,NgZone,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./Login.component.css']
})

export class LoginComponent  implements OnInit{
  public formSubmitted = false;
  public auth2: any;
  //DEFINICION DE CAMPOS 
  public loginForm = this.fb.group({
    //VALIDACION DE CAMPOS TIPO BOOSTRAP
    email: [localStorage.getItem('email') || '',[Validators.required, Validators.email]],
    password: ['',[Validators.required]],
    remember: [false]

  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }
              //NGZONE SIRVE PARA CONTROLAR FUNCIONES FUERA DE ANGULAR COMO LAS DE GOOGLE: ASI EVITAR ADVERTENCIAS EN EL CONSOLE
  ngOnInit(): void {
    this.renderButton();
  }

  login(){

    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp=>{
      //SI EL CHECK DEL REMEMBER ESTA HABILITADO ENTONCES GUARDAR EN LOCAL STORAGE EL DATO DEL EMAIL 
      if(this.loginForm.get('remember').value){
        localStorage.setItem('email',this.loginForm.get('email').value);
      }else{
        localStorage.removeItem('email');
      }
      //INGRESAR AL DASHBOARD
      this.router.navigateByUrl('/');

    },(err)=>{
      //Si suscede un error
      Swal.fire('Error',err.error.msg,'error');
      
    });
  }
 
  /*
  onSuccess(googleUser) {
    //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)
  }
  onFailure(error) {
    console.log(error);
  }*/
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  };
  startApp() {
    gapi.load('auth2', ()=>{
     
      this.auth2 = gapi.auth2.init({
        client_id: '988333701701-1ohpn6msr7hsaesifjergcfe9ge3ul9a.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  
  };
  attachSignin(element) {
 
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token=googleUser.getAuthResponse().id_token;
          //this.usuarioService.loginGoogle(id_token).subscribe();
          //console.log(id_token);
          this.usuarioService.loginGoogle( id_token).subscribe
          ( resp=>{
             
              this.ngZone.run(()=>{
                 //INGRESAR AL DASHBOARD
                  this.router.navigateByUrl('/');
              })
          });

        },(error) => { 
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}