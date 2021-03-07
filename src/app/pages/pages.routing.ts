import { Routes,RouterModule } from "@angular/router"
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AuthGuard } from "../guards/auth.guard";
import { PromesasComponent } from "./promesas/promesas.component";
import { UsuariosComponent } from "./mantenimiento/usuarios/usuarios.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PerfilComponent } from "./perfil/perfil.component";


const routes: Routes = [
 //ruta con rutas secundarias hijas
 //inclusion de paths: '/dashboard/progress'
 {
   path: 'dashboard',
   component: PagesComponent,
   canActivate:[AuthGuard],
   children: [
      {path: '',component: DashboardComponent,data: { titulo: 'Dashboard' }},
      {path: 'progress',component: ProgressComponent,data: { titulo: 'Progress' }},
      {path: 'grafica1',component: Grafica1Component,data: { titulo: 'Grafica' }},
      {path: 'account-settings',component: AccountSettingsComponent,data: { titulo: 'Account-Settings' }},
      {path: 'promesas',component: PromesasComponent,data: { titulo: 'Promesas' }},
      {path: 'rxjs',component: RxjsComponent,data: { titulo: 'Rxjs' }},
      {path: 'perfil',component: PerfilComponent,data: { titulo: 'Perfil' }},
      
     

      //Mantenimiento
      {path: 'usuarios',component: UsuariosComponent,data:{titulo:'Usuario de aplicacion'}},

     ]
  },

];


@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
