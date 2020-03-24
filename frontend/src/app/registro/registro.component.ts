import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm;

  constructor(private formBuilder: FormBuilder, private router: Router, private appcomponent: AppComponent) {
    this.registroForm = this.formBuilder.group({
      user: '',
      email: '',
      pwd: '',
      repwd: ''
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
   }

  ngOnInit(): void {
  }

  onSubmit(registroData){
      //this.RegistroService.doRegistro(...);
      console.warn('Prova registre: ', registroData);

      if(registroData.pwd != registroData.repwd){
        console.warn('Contrasenyes diferents!!');
      }
  }

}
