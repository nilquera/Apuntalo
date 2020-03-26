import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DocumentsService } from '../documents.service';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  id: string;
  documents;
  estaLogin: boolean;
  constructor(private documentsS: DocumentsService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("name");
    this.documentsS.getAssigDetail(this.id).subscribe(data => this.documents = data.subjectDB.posts);

    if(localStorage.getItem('mytoken') !== null){
      this.estaLogin = true;
    }
    else{
      this.estaLogin = false;
    }
  }
  ngOnInit(): void {
  }

}
