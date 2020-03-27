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
import { UnidetailService } from './unidetail.service';
import { UnidetailComponent } from './unidetail/unidetail.component';
import { UserComponent } from './user/user.component';
import { CarreradetailComponent } from './carreradetail/carreradetail.component';
import { CardetailService } from './cardetail.service';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsService } from './documents.service';
import { DesconectarComponent } from './desconectar/desconectar.component';
import { DocumentoComponent } from './documento/documento.component';
import { NewPostComponent } from './new-post/new-post.component';

@NgModule({
  declarations: [
    AppComponent,
    UniversitatsComponent,
    LoginComponent,
    NosotrosComponent,
    RegistroComponent,
    UnidetailComponent,
    UserComponent,
    CarreradetailComponent,
    DocumentsComponent,
    DesconectarComponent,
    DocumentoComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService, HttpClientModule, UniversitatService, UnidetailService, CardetailService, DocumentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
