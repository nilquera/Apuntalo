import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private appcomponent: AppComponent) {
    console.log(appcomponent.items);
    appcomponent.items.splice(1,1);
    appcomponent.items.splice(1,1);
  }

  ngOnInit(): void {
  }

}
