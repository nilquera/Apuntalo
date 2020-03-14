import { Component, OnInit } from '@angular/core';

import { Universitat } from '../universitat';
import { UNIVERSITATS } from '../universitats_list';

@Component({
  selector: 'app-universitats',
  templateUrl: './universitats.component.html',
  styleUrls: ['./universitats.component.css']
})
export class UniversitatsComponent implements OnInit {

  universitats = UNIVERSITATS;
  selectedUniversitat: Universitat;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(universitat: Universitat): void {
  this.selectedUniversitat = universitat;
}

}
