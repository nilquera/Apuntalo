import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class UnidetailService {
  constructor(private http: HttpClient) { }

  getUniDetail(name: string){
      return this.http.get<any>('api/universities/'+name);
    }
}
