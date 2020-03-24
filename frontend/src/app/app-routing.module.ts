import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversitatsComponent } from './universitats/universitats.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { UnidetailComponent } from './unidetail/unidetail.component';
import { UserComponent } from './user/user.component';
import { CarreradetailComponent} from './carreradetail/carreradetail.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentoComponent } from './documento/documento.component';
import { DesconectarComponent } from './desconectar/desconectar.component';

const routes: Routes = [
  {path: '', component: UniversitatsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'universitat/:name', component: UnidetailComponent},
  {path: 'user', component: UserComponent},
  {path: 'asignaturas/:name', component: CarreradetailComponent},
  {path: 'documentos/:name', component: DocumentsComponent},
  {path: 'documento/:name', component: DocumentoComponent},
  {path: 'desconectar', component: DesconectarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
