import { Routes,RouterModule } from "@angular/router"
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AuthGuard } from "../guards/auth.guard";


const routes: Routes = [
 //ruta con rutas secundarias hijas
 //inclusion de paths: '/dashboard/progress'

 {path: 'dashboard',component: PagesComponent,canActivate:[AuthGuard],
    children:
     [
      {path: '',component: DashboardComponent},
      {path: 'progress',component: ProgressComponent},
      {path: 'grafica1',component: Grafica1Component},
      {path: '',redirectTo:'/dashboard',pathMatch: 'full'},

     ]
  },

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }