import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniversitatsComponent } from './universitats/universitats.component';
import { LoginComponent } from './login/login.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { RegistroComponent } from './registro/registro.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';

@NgModule({
  declarations: [
    AppComponent,
    UniversitatsComponent,
    LoginComponent,
    NosotrosComponent,
    RegistroComponent,
    CarrerasComponent,
    AsignaturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }