import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder, private login: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: '',
      pwd: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(loginData){
    console.warn('Prova login: ', loginData);
    this.login.doLogin(loginData.email, loginData.pwd).subscribe(data => {
        if(data.ok) {
          this.router.navigate([''])
        }else{
          window.alert("Fail")
        }
      }
    );
  }

}
