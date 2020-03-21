import { Component, OnInit, Input } from '@angular/core';
import { UnidetailService } from '../unidetail.service';
import { Carrera } from '../carrera';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-unidetail',
  templateUrl: './unidetail.component.html',
  styleUrls: ['./unidetail.component.css']
})
export class UnidetailComponent implements OnInit {

  id: string;
  carreres;

  constructor(private unidetailS: UnidetailService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("name");
    this.unidetailS.getUniDetail(this.id).subscribe(data => this.carreres = data.universityDB.degrees);
  }

  ngOnInit(): void {

  }

}
