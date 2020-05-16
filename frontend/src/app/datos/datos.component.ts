import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../documents.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  id;
  editForm;
  document;

  constructor(private formBuilder: FormBuilder, private documentS: DocumentsService, private route: ActivatedRoute, public router: Router) {
    this.editForm = this.formBuilder.group({
      titulo: '',
      number: ''
    });
      this.id = this.route.snapshot.paramMap.get("name");
      this.documentS.getDocDetail(this.id).subscribe(data => {
        this.document = data.postDB;
        if(data.postDB.creator._id != localStorage.myid){
          this.router.navigate(['']);
        }
      });
  }

  ngOnInit(): void {
  }

  onSubmit(value){
    this.documentS.editDocument(this.id, value.titulo, value.number, localStorage.getItem('mytoken')).subscribe(data =>{
      this.router.navigate(['documento/'+ this.id]);
    });
  }

}
