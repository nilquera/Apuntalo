import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UnidetailService } from '../unidetail.service';
import { CardetailService } from '../cardetail.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  tabs;
  info;
  uni;
  carrera;

  constructor(public router: Router, private user: UserService, private uniInfo: UnidetailService, private car: CardetailService) {
    if(localStorage.getItem('mytoken') == null || localStorage.getItem('myid') == null){
      window.alert("Acceso no autorizado");
      this.router.navigate(['/']);
    }
    else{
      this.user.getUser(localStorage.getItem('myid'),localStorage.getItem('mytoken')).subscribe(data => {
        this.info = data.userDB;
        console.log(this.info);

        this.uniInfo.getUniDetail(this.info.university).subscribe(data => this.uni = data.universityDB.name);
        this.car.getCarDetail(this.info.degree).subscribe(data => this.carrera = data.degreeDB.index.name);
      });
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
