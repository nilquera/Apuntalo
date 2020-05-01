import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  tabs;
  info;

  constructor(private router: Router, private user: UserService) {
    if(localStorage.getItem('mytoken') == null || localStorage.getItem('myid') == null){
      window.alert("Acceso no autorizado");
      this.router.navigate(['/']);
    }
    else{
      this.user.getUser(localStorage.getItem('myid'),localStorage.getItem('mytoken')).subscribe(data => data = this.info);
    }
  }

  ngOnInit(): void {
  }

  changeTab(event, tabName){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
  }

}
