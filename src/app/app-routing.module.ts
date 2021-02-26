import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

//modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

//componentes

import { NopagefoundComponent } from './nopagefound/nopagefound.component';




const routes: Routes = [

  //RECORDATORIO: RUTAS FIJAS POR MODULO//
  //path:--> '/dashboard' enlaza en PagesRouting
  //path:--> '/auth' enlaza en AuthRounting

  {path: '', redirectTo:'dashboard', pathMatch: 'full' },
  {path: '**', component: NopagefoundComponent },

];




@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) , PagesRoutingModule,AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
