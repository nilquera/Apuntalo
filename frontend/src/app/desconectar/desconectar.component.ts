import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ITEMINIT } from '../menu_items.list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desconectar',
  templateUrl: './desconectar.component.html',
  styleUrls: ['./desconectar.component.css']
})
export class DesconectarComponent implements OnInit {

  constructor(private appcomponent: AppComponent, private router: Router) {
    if(localStorage.getItem('mytoken') == null && localStorage.getItem('myid')){
      this.router.navigate(['/']);
    }
    else{
      localStorage.removeItem('mytoken');
      localStorage.removeItem('myid');

      var index = this.appcomponent.items.findIndex(x => x.url === "desconectar");
      if (index > -1){
        this.appcomponent.items.splice(index,1);
      }

      var index = this.appcomponent.items.findIndex(x => x.url === "user");
      this.appcomponent.items[index] = {
        name: 'Login',
        url: 'login',
        ico: 'fas fa-key'
      };
      if (index > -1){
        this.appcomponent.items.splice(index+1,0,{
          name: 'Registro',
          url: 'registro',
          ico: 'far fa-address-card'
        });
      }

      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

}
