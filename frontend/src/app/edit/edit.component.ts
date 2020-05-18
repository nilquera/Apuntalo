import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  padURL;
  padID;
  postID;


  constructor(private documentS: DocumentsService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router) {
    this.postID = this.route.snapshot.paramMap.get("name");

    this.documentS.getDocDetail(this.postID).subscribe(data => {
      var esEditor: boolean;
      for(let editor of data.postDB.editors){
        if(editor == localStorage.myid){
          esEditor = true;
        }
      }
      if(data.postDB.creator._id != localStorage.myid && !esEditor){
        this.router.navigate(['']);
      }
      this.padID = data.postDB.padID;
      this.padURL = 'https://nidorino.fib.upc.edu:9002/p/'+ this.padID;
    });
  }

  ngOnInit(): void {
  }

  transform(url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
