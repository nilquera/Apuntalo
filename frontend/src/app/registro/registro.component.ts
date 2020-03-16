import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm;

  constructor(private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      user: '',
      email: '',
      pwd: '',
      repwd: ''
    });
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
