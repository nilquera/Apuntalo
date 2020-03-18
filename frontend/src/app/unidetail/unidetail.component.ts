import { Component, OnInit, Input } from '@angular/core';
import { UnidetailService } from '../unidetail.service';
import { Carrera } from '../carrera';

@Component({
  selector: 'app-unidetail',
  templateUrl: './unidetail.component.html',
  styleUrls: ['./unidetail.component.css']
})
export class UnidetailComponent implements OnInit {

  @Input() name: string;
  carrera: Carrera;

  constructor(private unidetailS: UnidetailService) {
    this.unidetailS.getUniDetail(name).subscribe(data => this.carrera = data.universities.degrees);
  }

  ngOnInit(): void {
  }

}
