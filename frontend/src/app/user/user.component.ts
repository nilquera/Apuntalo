import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private router: Router) {
    if(localStorage.getItem('mytoken') == null || localStorage.getItem('myid') == null){
      window.alert("Acceso no autorizado");
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

}
