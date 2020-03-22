import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CardetailService } from '../cardetail.service';

@Component({
  selector: 'app-carreradetail',
  templateUrl: './carreradetail.component.html',
  styleUrls: ['./carreradetail.component.css']
})
export class CarreradetailComponent implements OnInit {

  id: string;
  assignatures;

  constructor(private cardetailS: CardetailService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("name");
    this.cardetailS.getCarDetail(this.id).subscribe(data => this.assignatures = data.degreeDB.subjects);
  }

  ngOnInit(): void {

  }

}
