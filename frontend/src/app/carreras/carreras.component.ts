import { Component, OnInit, Input } from '@angular/core';

import { Universitat } from '../universitat';


@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  @Input() universitat: Universitat;
  carreraslist = this.universitat.carreras;
  constructor() {

  }

  ngOnInit(): void {
  }

}
