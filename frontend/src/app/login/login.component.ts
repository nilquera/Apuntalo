import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder, private login: LoginService, private router: Router, private appcomponent: AppComponent) {
    this.loginForm = this.formBuilder.group({
      email: '',
      pwd: ''
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

  onSubmit(loginData){
    console.warn('Prova login: ', loginData);
    this.login.doLogin(loginData.email, loginData.pwd).subscribe(data => {
        if(data.ok) {
          localStorage.setItem('mytoken', data.token);
          localStorage.setItem('myid', data.user._id);

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
        }else{
          window.alert("Fail");
        }
      }
    );
  }

}
