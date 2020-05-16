import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class DocumentsService {
  constructor(private http: HttpClient) { }

  getAssigDetail(name: string){
      return this.http.get<any>('api/subjects/'+name);
    }

  getDocDetail(name: String){
    return this.http.get<any>('api/posts/'+name);
  }

  createDoc(title, body, token, subjectId){
    var headers = { 'Authorization': token};
    return this.http.post<any>('api/posts', {title, body, subjectId},{ headers });
  }

  addParticipant(post, user, token){
    var headers = { 'Authorization': token};
    return this.http.put<any>('api/posts/'+post+'/'+user, {post}, {headers});
  }

  editDocument(post, title, price, token){
    var headers = { 'Authorization': token};
    return this.http.put<any>('api/posts/'+post, {title,price}, {headers});
  }

  comprarDocument(postid, token){
    var headers = { 'Authorization': token};
    return this.http.post<any>('api/bc/purchase', {postid}, {headers});
  }
}
