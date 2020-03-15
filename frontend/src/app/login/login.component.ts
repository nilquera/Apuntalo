import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: '',
      pwd: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(loginData){
      //this.LoginService.doLogin();
      console.warn('Prova login: ', loginData);
  }

}
