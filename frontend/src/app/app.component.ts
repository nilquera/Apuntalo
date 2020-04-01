import { Component } from '@angular/core';
import { MenuItem } from './menu_items';
import { Router } from '@angular/router';

import { ITEMINIT } from './menu_items.list';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Apúntalo';
  public items: MenuItem[] = ITEMINIT;
}
