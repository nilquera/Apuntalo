import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class UniversitatService {
  constructor(private http: HttpClient) { }

  getUnis(){
      return this.http.get<any>('api/universities');
    }
}
