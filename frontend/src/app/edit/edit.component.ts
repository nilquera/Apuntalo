import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  padURL;
  constructor(private sanitizer: DomSanitizer) {
    this.padURL = 'http://localhost:9001/p/testpad';
  }

  ngOnInit(): void {
  }

  transform(url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
