import { Component, OnInit } from '@angular/core';

import { Universitat } from '../universitat';

@Component({
  selector: 'app-universitats',
  templateUrl: './universitats.component.html',
  styleUrls: ['./universitats.component.css']
})
export class UniversitatsComponent implements OnInit {

  universitat: Universitat = {
    id: 1,
    name: 'Universitat Politècnica de Catalunya'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
