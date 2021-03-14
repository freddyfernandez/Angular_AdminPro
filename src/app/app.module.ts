import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
/*se importo el app routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule

  ],

  bootstrap: [AppComponent] 
  
})
export class AppModule { }
