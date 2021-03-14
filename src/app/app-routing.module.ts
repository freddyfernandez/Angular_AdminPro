import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

//modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

//componentes

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HomeComponent } from './pages/home/home.component';




const routes: Routes = [

  //RECORDATORIO: RUTAS FIJAS POR MODULO//
  //path:--> '/dashboard' enlaza en PagesRouting
  //path:--> '/auth' enlaza en AuthRounting
  {path: '',redirectTo:'', pathMatch: 'full',component: HomeComponent,data: { titulo: 'Home' }},
  {path: '**', component: NopagefoundComponent },

];




@NgModule({

  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
