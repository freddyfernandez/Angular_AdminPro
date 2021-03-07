import { HttpClient } from '@angular/common/http';
import { catchError, map, tap }  from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interfaces';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { cargaUsuarios } from '../interfaces/cargar-usuarios.interfaces';
import { Usuario } from '../models/usuario.model';


const base_url= environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;
  public usuario: Usuario;

  //NGZONE SIRVE PARA CONTROLAR FUNCIONES FUERA DE ANGULAR COMO LAS DE GOOGLE: ASI EVITAR ADVERTENCIAS EN EL CONSOLE
  constructor(private http: HttpClient,private router: Router,private ngZone: NgZone) { 

    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string{

    return this.usuario.uid || '';
  }
  
  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    };
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
        //COMO SE INSTANCIA UN METODO DE UNA CLASE A PARTIR  DE UN CONSTRUCTOR
        const {email,google,nombre,role,img='',uid} = resp.usuario;
        this.usuario = new Usuario(nombre,email,'',img,google,role,uid);
        //  
        localStorage.setItem('token',resp.token);
        return true
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

  //SIN INTERFAZ DEFRENTE
  actualizarPerfil(data: {email:string, nombre:string,role:string}  ){
    
    data = {
      ...data,
      role: this.usuario.role
    };
    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers:{
        'x-token':this.token
      }
    });

  }

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

  cargaUsuarios(desde: number=0){
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<cargaUsuarios>(url,this.headers)
          .pipe(
            map( resp => {
           //EXTRAE LA TODOS LOS USUARIOS DEL MODEL
           const usuarios = resp.usuarios.map( 
            user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )  
           );
           return {
             total: resp.total,
             usuarios
           };
         })
        )
    
  }
}
