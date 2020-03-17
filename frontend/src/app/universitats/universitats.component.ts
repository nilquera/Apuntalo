import { Component, OnInit } from '@angular/core';

import { Universitat } from '../universitat';
import {UniversitatService} from '../universitat.service';
import { UNIVERSITATS } from '../universitats_list';

@Component({
  selector: 'app-universitats',
  templateUrl: './universitats.component.html',
  styleUrls: ['./universitats.component.css']
})
export class UniversitatsComponent implements OnInit {

  universitats;
  selectedUniversitat: Universitat;
  constructor(private universitatS: UniversitatService) {
    this.universitatS.getUnis().subscribe(data => this.universitats = data.universities);
  }

  ngOnInit(): void {
  }

  onSelect(universitat: Universitat): void {
  this.selectedUniversitat = universitat;
}

}
