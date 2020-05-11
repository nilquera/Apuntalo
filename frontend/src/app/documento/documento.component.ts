import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {
  id: string;
  document;
  esAutor: boolean;
  addParticipant;

  constructor(private formBuilder: FormBuilder, private documentS: DocumentsService, private route: ActivatedRoute, public router: Router) {
    this.addParticipant = this.formBuilder.group({
      name: ''
    });

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

  showForm(event){
    let myelement = document.getElementsByClassName('newParticipant') as HTMLCollectionOf<HTMLElement>;;

    if(myelement[0].style.display == "block"){
      myelement[0].style.display = "none";
    }
    else{
      myelement[0].style.display = "block";
    }
  }

  onSubmit(value){

  }

}
