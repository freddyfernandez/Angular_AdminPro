//Librerias
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { ChartsModule} from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';


//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PromesasComponent } from './promesas/promesas.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ConocimientosComponent } from './mantenimiento/conocimientos/conocimientos.component';
import { VotacionComponent } from './votacion/votacion.component';

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
    PerfilComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,
    ConocimientosComponent,
    VotacionComponent,
  ],
  exports:[

    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    DashboardComponent

  ],

  imports: [
    
    FormsModule,
    ChartsModule,
    RouterModule,
    CommonModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
    NgxChartsModule,
    BrowserAnimationsModule
  
  ]
})
export class PagesModule { }
