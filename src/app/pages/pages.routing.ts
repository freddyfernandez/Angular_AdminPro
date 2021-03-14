import { Routes,RouterModule } from "@angular/router"
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from "../guards/auth.guard";



const routes: Routes = [
 //ruta con rutas secundarias hijas
 //inclusion de paths: '/dashboard/progress'
 {
   path: 'dashboard',
   component: PagesComponent,
   canActivate:[AuthGuard],
   //LAZY LOAD : CARGA PERESOZA 
   canLoad: [AuthGuard,],
   loadChildren: () => import('./child-routes.module').then(m=>m.ChildRoutesModule)
  },

];


@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,]
})
export class PagesRoutingModule { }
