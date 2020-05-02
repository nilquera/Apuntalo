import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DocumentsService } from '../documents.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  id: string;
  newpostForm;

  constructor(private formBuilder: FormBuilder, private router: Router, private activated: ActivatedRoute ,private location: Location, private creador: DocumentsService) {
    if(localStorage.getItem('mytoken') !== null){
      this.id = this.activated.snapshot.paramMap.get("name");
      this.newpostForm = this.formBuilder.group({
        titulo: '',
        desc: ''
      });
    }
    else{
      this.location.back();
    }

  }

  ngOnInit(): void {
  }

  onSubmit(newpostData){
    console.log(this.id);
    this.creador.createDoc(newpostData.titulo, newpostData.desc, localStorage.getItem('mytoken'), this.id).subscribe(data => this.router.navigate(['documento/'+ data.post._id]));
  }
}
