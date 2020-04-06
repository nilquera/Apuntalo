import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

import { LoginService } from '../login.service';
import { UniversitatService } from '../universitat.service';
import { UnidetailService } from '../unidetail.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm;
  universitats;
  carreras;

  constructor(private unidetailS: UnidetailService, private universitatS: UniversitatService, private formBuilder: FormBuilder, private router: Router, private appcomponent: AppComponent, private register: LoginService) {
    this.registroForm = this.formBuilder.group({
      user: '',
      email: '',
      pwd: '',
      repwd: '',
      name: '',
      unis: '',
      carreras: ''
    });

    if(localStorage.getItem('mytoken') !== null){

      var index = this.appcomponent.items.findIndex(x => x.url === "login");
      if (index > -1){
        this.appcomponent.items.splice(index,1);
      }

      var index = this.appcomponent.items.findIndex(x => x.url === "registro");
      this.appcomponent.items[index] = {
        name: 'Mi usuario',
        url: 'user',
        ico: 'fas fa-user'
      };
      this.appcomponent.items.push({
        name: 'Desconectar',
        url: 'desconectar',
        ico: 'fas fa-power-off'
      });
      this.router.navigate(['user']);
    }

    this.universitatS.getUnis().subscribe(data => this.universitats = data.universities);
    this.registroForm.get('carreras').disable();
   }

  ngOnInit(): void {
  }

  onSubmit(registroData){
      if(registroData.pwd != registroData.repwd){
        console.warn('Contrasenyes diferents!!');
        this.router.navigate(['registro']);
      }
      else{
        //this.register.doRegister(registroData);
      }
  }

  getAssigs(universitat){
    console.log(universitat);
    this.unidetailS.getUniDetail(universitat).subscribe(data => this.carreras = data.universityDB.degrees);
    this.registroForm.get('carreras').enable();
  }

}
