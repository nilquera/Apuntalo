import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {
  id: string;
  document;
  esAutor: boolean;

  constructor(private documentS: DocumentsService, private route: ActivatedRoute, public router: Router) {
    this.id = this.route.snapshot.paramMap.get("name");
    this.documentS.getDocDetail(this.id).subscribe(data => {
      this.document = data.postDB;
      if(data.postDB.creator._id == localStorage.myid){
        this.esAutor = true;
      }
    });
  }
  ngOnInit(): void {
  }

}
