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
}
