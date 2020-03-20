import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversitatsComponent } from './universitats/universitats.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { UnidetailComponent } from './unidetail/unidetail.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: UniversitatsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'universitat/:name', component: UnidetailComponent},
  {path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
