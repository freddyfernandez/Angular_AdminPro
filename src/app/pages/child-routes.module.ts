import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PromesasComponent } from "./promesas/promesas.component";
import { UsuariosComponent } from "./mantenimiento/usuarios/usuarios.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { MedicosComponent } from "./mantenimiento/medicos/medicos.component";
import { HospitalesComponent } from "./mantenimiento/hospitales/hospitales.component";
import { MedicoComponent } from "./mantenimiento/medicos/medico.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";
import { AdminGuard } from "../guards/admin.guard";


const childRoutes: Routes = [

  {path: 'dashboard',component: DashboardComponent,data: { titulo: 'Dashboard' }},
  {path: 'progress',component: ProgressComponent,data: { titulo: 'Progress' }},
  {path: 'grafica1',component: Grafica1Component,data: { titulo: 'Grafica' }},
  {path: 'account-settings',component: AccountSettingsComponent,data: { titulo: 'Account-Settings' }},
  {path: 'buscar/:termino',component: BusquedaComponent,data: { titulo: 'Busquedas' }},
  {path: 'promesas',component: PromesasComponent,data: { titulo: 'Promesas' }},
  {path: 'rxjs',component: RxjsComponent,data: { titulo: 'Rxjs' }},
  {path: 'perfil',component: PerfilComponent,data: { titulo: 'Perfil' }},
  
 

  //Mantenimiento

  {path: 'hospitales',component: HospitalesComponent,data:{titulo:'Mantenimiento de Hospitales'}},
  {path: 'medicos',component: MedicosComponent,data:{titulo:'Mantenimiento de Medicos'}},
  //componentes especializado
  {path: 'medico/:id',component: MedicoComponent,data:{titulo:'Mantenimiento de Medicos'}},

  //Rutas Admin
  {path: 'usuarios',canActivate: [AdminGuard],component: UsuariosComponent,data:{titulo:'Mantenimiento de Usuarios'}},
]


@NgModule({
  
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule,]
})
export class ChildRoutesModule { }
