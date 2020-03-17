import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniversitatsComponent } from './universitats/universitats.component';
import { LoginComponent } from './login/login.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { RegistroComponent } from './registro/registro.component';

import { LoginService } from './login.service';
import { UniversitatService } from './universitat.service';

@NgModule({
  declarations: [
    AppComponent,
    UniversitatsComponent,
    LoginComponent,
    NosotrosComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService, HttpClientModule, UniversitatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
