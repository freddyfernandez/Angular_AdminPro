import { HttpClient } from '@angular/common/http';
import { catchError, map, tap }  from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { LoginForm } from '../interfaces/login-form.interfaces';


const base_url= environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;

  //NGZONE SIRVE PARA CONTROLAR FUNCIONES FUERA DE ANGULAR COMO LAS DE GOOGLE: ASI EVITAR ADVERTENCIAS EN EL CONSOLE
  constructor(private http: HttpClient,private router: Router,private ngZone: NgZone) { 
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', ()=>{
     
      this.auth2 = gapi.auth2.init({
        client_id: '988333701701-1ohpn6msr7hsaesifjergcfe9ge3ul9a.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      
      });
     
    });
  
  };

  logout(){
    //BORRA EL DATO DEL TOKEN
    localStorage.removeItem('token');
    //REGRESA AL LOGIN PAGE
    //LA FUNCION SIGNOUT ESTA FUERA DE ANGULAR PARA CONTROLAR WARNINGS ENCAPSULARLO EN UN NGZONE
    this.auth2.signOut().then(()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    });
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token')||'';
    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':token
      }
    //RENUEVA TOKEN DEL STORAGE APLICATION
    }).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token',resp.token)
      }),
      map(resp=>true),
      //ATRAPA POSIBLES ERRORES DE AUTENTICACION
      catchError(error=>of(false))
    )
  }

  crearUsuario(formData:RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData)
    .pipe(
      tap((resp:any) =>{
        localStorage.setItem('token',resp.token)
      })
    )
  };
  login(formData:LoginForm){
    return this.http.post(`${base_url}/login`,formData)
    .pipe(
      tap((resp:any) =>{
        localStorage.setItem('token',resp.token)
      })
    )
  
  };

  loginGoogle(token){
    return this.http.post(`${base_url}/login/google`,{token})//token entre corchetes por ser un objeto
    .pipe(
      tap((resp:any) =>{
        localStorage.setItem('token',resp.token)
      })
    );
  
  }
}
