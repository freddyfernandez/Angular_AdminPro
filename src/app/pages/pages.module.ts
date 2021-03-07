import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PromesasComponent } from './promesas/promesas.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';






//AQUI SE ACTUALIZA LOS NUEVOS COMPONENTES CREADOS 
@NgModule({
  declarations: [   
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    PromesasComponent,
    UsuariosComponent,
    AccountSettingsComponent,
    RxjsComponent,
    PerfilComponent
  ],
  exports:[

    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],

  imports: [
    
    FormsModule,
    RouterModule,
    CommonModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule
  
  ]
})
export class PagesModule { }
