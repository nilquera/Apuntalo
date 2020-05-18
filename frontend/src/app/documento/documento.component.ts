import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../documents.service';
import { UserService } from '../user.service';
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
  esEditor: boolean;
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

      for(let editor of data.postDB.editors){
        if(editor == localStorage.myid){
          this.esEditor = true;
        }
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
    console.log(localStorage.getItem('mytoken'));
    this.documentS.addParticipant(this.id,value.name,localStorage.getItem('mytoken')).subscribe(data => {
      if(data.ok){
        let myelement = document.getElementsByClassName('newParticipant') as HTMLCollectionOf<HTMLElement>;
        myelement[0].style.display = "none";  
        this.router.navigate(['/documento/'+this.id]);
      }
      else{
        window.alert('ID invalido!');
      }
    });
  }

  comprar(){
    this.documentS.comprarDocument(this.id, localStorage.getItem('mytoken')).subscribe(data => {
      if(data.ok == 'true'){
        console.log('xd has comprat')
      }
      else{
        console.log('no tens diners');
      }
    });
  }
}
