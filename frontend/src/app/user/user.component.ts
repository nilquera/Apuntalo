import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UnidetailService } from '../unidetail.service';
import { CardetailService } from '../cardetail.service';
import { FormBuilder } from '@angular/forms';

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
  balance;
  addBalance;

  constructor(private formBuilder: FormBuilder, public router: Router, private user: UserService, private uniInfo: UnidetailService, private car: CardetailService) {
    this.addBalance = this.formBuilder.group({
      cantidad: ''
    });

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
        this.user.getBalance(localStorage.getItem('mytoken')).subscribe(data => {
          this.balance = data.balance
        });
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

  showForm(event){
    let myelement = document.getElementsByClassName('addBalance') as HTMLCollectionOf<HTMLElement>;;

    if(myelement[0].style.display == "block"){
      myelement[0].style.display = "none";
    }
    else{
      myelement[0].style.display = "block";
    }
  }

  onSubmbit(value){
    this.user.addBalance(value.cantidad,localStorage.getItem('mytoken')).subscribe(data => {
      if(data.ok){
        location.reload();
      }
      else{
        window.alert('ID invalido!');
      }
    });
  }

}
